// the filesystem consists of a collection of JSON fileObjects 

import { DirectiveArgumentNode } from "@vue/compiler-core"
import { LZString } from "lzstring.ts"
import { basename, dirname, format, parse, normalize } from "path-browserify"


// the key/name of fileObjects in localstore is 'FileSystem_${fileNumber}'.
//   representing the file ./     there is also a ../
// the ROOT key of the filesystem is 'FileSystem_0'

// There is a special case: the root is always 'FileSystem_0'
// its fileNumber is the largest filenumber used in the system (a 'bakery ticket')

// https://stackoverflow.com/questions/12100299/whats-a-canonical-path


enum FileType {
    FILE = 1,
    DIR = 2,
    ROOT = 3,
}

export type fileObject = {
    fileType: FileType,         // should always be FileType.FILE
    fileNumber: number,         // should match the keyname of this record
    dir: string,                 //  dir-base-name-ext from node.Path    
    base: string,
    name: string,
    ext: string,
    dateUpdate: number,        // readable with Date(n)
    length: number,            // uncompressed length, always 0 for directories
    payload: string,
}


// i would rather not use FileNumber: number and files: number[] 
// since TypeScript can't help me.  But I don't want to JSON.decode() 
// everything in a big directory every time i touch a file.

export type directoryObject = {
    fileType: FileType,         // should always be FileType.DIR
    fileNumber: number,         // (dot) the fileNumber of this record
    dirName: string,             // the name of this segment
    dotdot: number,             // filenumber of parent directory
    files: number[],
    subdirs: number[],
}

export type rootObject = {
    fileType: FileType,         // should always be FileType.DIR
    fileNumber: number,         // (dot) the fileNumber of this record
}



// directory operations:
//  dir.path()      // read-only
//  dir.readSync()  // returns array of numbers (dirs and files)
//  dir.isDirectory() // about the entry in dir.readSync()
//  dir.isFile()   // about the entry in dir.readSync()
//  dir.mkdir(n,name)
//  dir.search()   //

// file operations:  
//  fs.read(file)
//  fs.writeFile(dNum: number, fileString: string, payload: string): fileObject {
//  fs.append(file,data)
//  fs.delete(file)
//  fs.exists(file)
//  fs.rename(file, tofile)


export class tsFS {
    cwd: string = ''
    fs: Object = {}
    FSName: string = 'FileSystem'

    // can't use a constructor for testing
    crud() {
        localStorage.clear()  // start from nothing

        this.writeFile(1, 'books.xlsx', 'The Big Lebowski')

        console.log('localstorage 0', JSON.parse(localStorage.getItem('FileSystem_0')))
        console.log('localstorage 1', JSON.parse(localStorage.getItem('FileSystem_1')))
        console.log('localstorage 2', JSON.parse(localStorage.getItem('FileSystem_2')))
        console.log('localstorage 3', JSON.parse(localStorage.getItem('FileSystem_3')))

        this.writeFile(1, 'books.xlsx', 'The Big Second Lebowski')

        console.log('localstorage 0', JSON.parse(localStorage.getItem('FileSystem_0')))
        console.log('localstorage 1', JSON.parse(localStorage.getItem('FileSystem_1')))
        console.log('localstorage 2', JSON.parse(localStorage.getItem('FileSystem_2')))
        console.log('localstorage 3', JSON.parse(localStorage.getItem('FileSystem_3')))

        this.writeFile(1, 'book2.xlsx', 'The Big Second Lebowski')

        console.log('localstorage 0', JSON.parse(localStorage.getItem('FileSystem_0')))
        console.log('localstorage 1', JSON.parse(localStorage.getItem('FileSystem_1')))
        console.log('localstorage 2', JSON.parse(localStorage.getItem('FileSystem_2')))
        console.log('localstorage 3', JSON.parse(localStorage.getItem('FileSystem_3')))



    }


    // docs for lzcompress:  https://pieroxy.net/blog/pages/lz-string/guide.html
    compress(plain: string): string {
        return LZString.compressToUTF16(plain)
    }
    decompress(zipped: string): string {
        return LZString.decompressFromUTF16(zipped)
    }

    // we create both the the special directory object and the root
    createRootDirectory(): rootObject {
        let rootObj: rootObject = {   // don't use the factory!!
            fileType: FileType.ROOT,
            fileNumber: 1,  // we know we have another (just below)
        }
        localStorage.setItem(`${this.FSName}_0`, JSON.stringify(rootObj))

        let dObj: directoryObject = {
            fileType: FileType.DIR,
            fileNumber: 1,
            dirName: '/',
            dotdot: 0,
            files: [],
            subdirs: [],
        }
        localStorage.setItem(`${this.FSName}_1`, JSON.stringify(dObj))
        return (rootObj)
    }

    getNewFileNumber(): number {
        // the filenumber in the root is a bakery ticket.  this also CREATES
        // the root if it does not already exist
        let rootObj: rootObject
        let newF: number

        let rootStr = localStorage.getItem(`${this.FSName}_0`)
        if (rootStr) {  // did we find it?
            rootObj = JSON.parse(rootStr) as directoryObject
        } else {  // root doesn't exist, this should only happen once
            rootObj = this.createRootDirectory()
        }
        // get the bakery number plus one
        console.log(`before increment ${rootObj.fileNumber}`)
        rootObj.fileNumber += 1  // increment the root
        localStorage.setItem(`${this.FSName}_0`, JSON.stringify(rootObj))
        console.log(`getNewFileNumber rturns ${rootObj.fileNumber}`)
        return rootObj.fileNumber
    }



    directoryObjectFactory(parentDir: number, dirName: string): directoryObject {
        let newObj: directoryObject = {
            fileType: FileType.DIR,
            fileNumber: this.getNewFileNumber(),
            dirName: dirName,
            dotdot: parentDir,
            files: [],
            subdirs: [],
        }
        return newObj
    }


    writeFile(dNum: number, fileString: string, payload: string): number {
        let dObj = this.getDirectoryObject(dNum)

        let p = parse(fileString)  // break up the fileString
        console.log('directoryparse', fileString,p.root,p.dir) 
        let xplodP = p.dir.split('/')
        console.log('xplode',xplodP) 


        // if this base (name+ext) is already in this directory
        // then reuse it, otherwise create a new one.  To do 
        // that, we have to read every file in this directory

        let newObj: fileObject

        let matchNum = dObj.files.find(fNum =>
            this.getFileObject(fNum).base == p.base)

        // if we found an localStore entry, reuse it     
        if (matchNum !== undefined) {  // found one
            newObj = this.getFileObject(matchNum);
            if (newObj.fileType !== FileType.FILE)  // sanity check
                throw ('not a File')

            newObj.dateUpdate = Date.now()
            newObj.length = payload.length
            newObj.payload = this.compress(payload)

        } else {
            console.log('adding a new file')
            newObj = {
                fileType: FileType.FILE,
                fileNumber: this.getNewFileNumber(),
                dir: p.dir,
                base: p.base,
                name: p.name,
                ext: p.ext,
                dateUpdate: Date.now(),
                length: payload.length,
                payload: this.compress(payload),
            }

            // new file, so changes the directory object
            dObj.files.push(newObj.fileNumber) // add it to the directory
            console.log('updated directory obj', dObj)
            this.setDirectoryObject(dObj)   // write out the new directory
        }

        this.setFileObject(newObj)

        return newObj.fileNumber
    }


    // mkdir makes any subdirectories required on the path
    mkdir(dNum: number, dirName: string): number {

        return 1
    }


    // this group of functions manages reading and writing
    // to localstore.  If you want to use another storage,
    // only need to change these.


    storageName(sN: number): string {
        return `${this.FSName}_${sN}`
    }

    getFileObject(n: number): fileObject {
        let fObj: fileObject = JSON.parse(localStorage.getItem(this.storageName(n)))
        console.assert(fObj.fileType == FileType.FILE, `expected a file at string #${n} `)
        return fObj
    }

    getDirectoryObject(n: number): directoryObject {
        console.log(`getDirectoryObject(${n})`)

        let dString = localStorage.getItem(this.storageName(n))
        if (!dString) { // doesn't exist (system not initialized?)
            this.createRootDirectory() // only happens once
            dString = localStorage.getItem(this.storageName(n))
        }
        let dObj: directoryObject = JSON.parse(dString)
        if (dObj.fileType !== FileType.DIR)
            throw ('not a Directory')
        return dObj
    }


    setFileObject(fObj: fileObject) {
        fObj.dateUpdate = Date.now()
        localStorage.setItem(this.storageName(fObj.fileNumber), JSON.stringify(fObj))
    }

    setDirectoryObject(dObj: directoryObject) {
        localStorage.setItem(this.storageName(dObj.fileNumber), JSON.stringify(dObj))
    }




    /*
        readFile = function(farray: fileObject) {
            let result = localStorage.getItem(this.fileName(farray.fileNumber))
            if (farray.payload) {
                if (typeof LZString === "undefined" || LZString === null) {
                    throw Error('Cannot decompress file LZString undefined')
                }
                result = LZString.decompress(result)
            }
            return JSON.parse(result)
        }
    
    
        removeFile = function(farray: fileObject) {
            return localStorage.removeItem(this._fileName(farray.fileNumber))
        }
    
        // tom... i think this is how coffeescript declares properties...
    
        // function _Class(name) {
        //     this.rm = __bind(this.rm, this)
        //     this.type = __bind(this.type, this)
        //     this.walkPathAndFile = __bind(this.walkPathAndFile, this)
        //     this.separateWithFilename = __bind(this.separateWithFilename, this)
        //     this._name = ("" + name) || 'undefined'
        //     this._getFilesystemObject()
        //     this._cwd = FileSystem.prototype.pathSeparator
        //     this.compressionDefault = false
        // }
    
        getName() {
            return this.name
        }
    
        getCwd() {
            return this.cwd
        }
    
        // _ref = (simultaneousReplace(pathString, esc + sep, sep, esc + esc, esc, sep, '\n')).split('\n')
        //  _results.push(simultaneousReplace(p, sep, esc + sep, esc, esc + esc))
    
    
        simultaneousReplace() {
            var found, i, result, string, swaps, _i, _ref
            string = arguments[0], swaps = 2 <= arguments.length ? string.slice.call(arguments, 1) : []
            result = ''
            while (string.length > 0) {
                found = false
    
                // 
                for (i = _i = 0, _ref = swaps.length - 1 _i < _ref i = _i += 2) {
                    if (string.slice(0, swaps[i].length) === swaps[i]) {
                        result += swaps[i + 1]
                        string = string.slice(swaps[i].length)
                        found = true
                        break
                    }
                }
                if (!found) {
                    result += string[0]
                    string = string.slice(1)
                }
            }
            return result
        }
    
    
    
    
    
    
    
        splitPath(pathString: string) {
            var bit, esc, pos, sep, _i, _len, _ref, _results
            sep = this.pathSeparator
            esc = this.escapeCharacter
            pos = pathString.indexOf(sep + sep)
            while (pos > -1) {
                pathString = pathString.slice(0, pos) + pathString.slice(pos + sep.length)
                pos = pathString.indexOf(sep + sep)
            }
            if (pathString.slice(0, sep.length) === sep) {
                pathString = pathString.slice(sep.length)
            }
            if (pathString.slice(-sep.length) === sep) {
                pathString = pathString.slice(0, -sep.length)
            }
            _ref = (this.simultaneousReplace(pathString, esc + sep, sep, esc + esc, esc, sep, '\n')).split('\n')
            _results = []
            for (_i = 0, _len = _ref.length _i < _len _i++) {
                bit = _ref[_i]
                if (bit !== '') {
                    _results.push(bit)
                }
            }
            return _results
        }
    
        joinPath = function(pathArray: string[]) {
            var esc, p, sep
            sep = this.pathSeparator
            esc = this.escapeCharacter
            return ((function() {
                var _i, _len, results
                results = []
                for (_i = 0, _len = pathArray.length _i < _len _i++) {
                    p = pathArray[_i]
                    results.push(simultaneousReplace(p, sep, esc + sep, esc, esc + esc))
                }
                return results
            })()).join(sep)
        }
    
        toAbsolutePath = function(cwdPath: string, relativePath: string) {
            var result, sep
            if (relativePath == null) {
                return cwdPath
            }
            sep = FileSystem.pathSeparator
            if (relativePath.slice(0, sep.length) === sep) {
                return relativePath
            }
            result = this.joinPath((this.splitPath(cwdPath)).concat(this.splitPath(relativePath)))
            if (result.slice(0, sep.length) !== sep) {
                result = sep + result
            }
            return result
        }
    
        toCanonicalPath = function(absolutePath: string): string {
            var result, sep, step, _i, _len, _ref
            result = []
            _ref = this.splitPath(absolutePath)
            for (_i = 0, _len = _ref.length _i < _len _i++) {
                step = _ref[_i]
                if (step === '.') {
                    continue
                }
                if (step === '..') {
                    if (result.length > 0) {
                        result.pop()
                    }
                } else {
                    result.push(step)
                }
            }
            result = FileSystem.prototype._joinPath(result)
            sep = FileSystem.prototype.pathSeparator
            if (result.slice(0, sep.length) !== sep) {
                result = sep + result
            }
            return result
        }
    
        isValidCanonicalPath(absolutePath: string): boolean {
            var path, step, walk, _i, _len
            path = this.splitPath(absolutePath)
            walk = this.getFilesystemObject()
            for (_i = 0, _len = path.length _i < _len _i++) {
                step = path[_i]
                walk = walk[step]
                if (!walk || walk instanceof Array) {
                    return false
                }
            }
            return true
        }
    
        separate(path: string): string[] {
            return this.splitPath(this.toCanonicalPath(this.toAbsolutePath(this.cwd, path)))
        }
    
    
        separateWithFilename(path: string) {
            let fullPath = this.separate(path)
            return {
                path: fullPath.slice(0, -1),
                name: fullPath[fullPath.length - 1]
            }
        }
    
        walkPath(start, pathArray) {
            var step, _i, _len
            for (_i = 0, _len = pathArray.length _i < _len _i++) {
                step = pathArray[_i]
                if (!start.hasOwnProperty(step) || start[step] instanceof Array) {
                    return null
                }
                start = start[step]
            }
            return start
        }
    
        walkPathAndFile(start, pathArray) {
            if (pathArray.length === 0) {
                return start
            }
            start = this.walkPath(start, pathArray.slice(0, -1))
            if (!start) {
                return null
            }
            return start[pathArray[pathArray.length - 1]] || null
        }
    
        type(pathToEntry: string): 'file' | 'folder' | null {
            var entry, fullpath
            fullpath = this.separate(pathToEntry)
            entry = this.walkPathAndFile(this.getFilesystemObject(), fullpath)
            if (!entry) {
                return null
            }
            if (entry instanceof Array) {
                return 'file'
            } else {
                return 'folder'
            }
        }
    
        cd(path: string) {
            if (path == null) {
                path = this.pathSeparator
            }
            let newcwd = this.toCanonicalPath(this.toAbsolutePath(this.cwd, path))
            if (this.isValidCanonicalPath(newcwd)) {
                return this.cwd = newcwd
            }
        }
    
        mkdir(path: string) {
            var addedSomething, fs, step, walk, _i, _len, _ref
            if (path == null) {
                path = '.'
            }
            walk = fs = this.getFilesystemObject()
            addedSomething = false
            _ref = this.separate(path)
            for (_i = 0, _len = _ref.length _i < _len _i++) {
                step = _ref[_i]
                if (!walk.hasOwnProperty(step)) {
                    walk[step] = {}
                    addedSomething = true
                }
                walk = walk[step]
            }
            return addedSomething && this.setFilesystemObject(fs)
        }
    
        ls(folder, type) {
            var entry, files, folders, fullpath
            if (folder == null) {
                folder = '.'
            }
            if (type == null) {
                type = 'all'
            }
            fullpath = this.separate(folder)
            folder = this.walkPath(this._getFilesystemObject(), fullpath)
            if (!folder) {
                throw Error('Invalid folder')
            }
            if (type === 'all' || type === 'files') {
                files = (function() {
                    var _results
                    _results = []
                    for (entry in folder) {
                        if (!__hasProp.call(folder, entry)) continue
                        if (folder[entry] instanceof Array) {
                            _results.push(entry)
                        }
                    }
                    return _results
                })()
                files.sort()
                if (type === 'files') {
                    return files
                }
            }
            folders = (function() {
                var _results
                _results = []
                for (entry in folder) {
                    if (!__hasProp.call(folder, entry)) continue
                    if (!(folder[entry] instanceof Array)) {
                        _results.push(entry)
                    }
                }
                return _results
            })()
            folders.sort()
            if (type === 'all') {
                return folders.concat(files)
            } else {
                return folders
            }
        }
    
        nextAvailableFileNumber() {
            var i, keys, result, used, usedNumbers, _i, _j, _ref, _ref1
            keys = []
            for (i = _i = 0, _ref = localStorage.length 0 <= _ref ? _i < _ref : _i > _ref i = 0 <= _ref ? ++_i : --_i) {
                keys.push(localStorage.key(i))
            }
            result = []
            usedNumbers = (function(_this) {
                return function(fs) {
                    var key, value
                    if (fs == null) {
                        fs = _this._getFilesystemObject()
                    }
                    for (key in fs) {
                        if (!__hasProp.call(fs, key)) continue
                        value = fs[key]
                        if (value instanceof Array) {
                            result.push(value[0])
                        } else {
                            result = result.concat(usedNumbers(value))
                        }
                    }
                    return result
                }
            })(this)
            used = usedNumbers().sort(function(a, b) {
                return a - b
            })
            if (used.length === 0) {
                return 0
            }
            for (i = _j = 0, _ref1 = used[used.length - 1] + 1 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1 i = 0 <= _ref1 ? ++_j : --_j) {
                if (__indexOf.call(used, i) < 0) {
                    return i
                }
            }
        }
    
        write(filename, content, compress) {
            var file, folder, former, fs, name, path, wasCompressed, _ref
            if (compress == null) {
                compress = this.compressionDefault
            }
            _ref = this.separateWithFilename(filename), path = _ref.path, name = _ref.name
            fs = this._getFilesystemObject()
            folder = this.walkPath(fs, path)
            if (!folder) {
                throw Error('Invalid folder path')
            }
            if (folder.hasOwnProperty(name)) {
                if (!(folder[name] instanceof Array)) {
                    throw Error('Cannot write to a folder')
                }
                file = folder[name]
                former = this._readFile(file)
            } else {
                file = [this._nextAvailableFileNumber(), 0]
                former = null
            }
            wasCompressed = file[2]
            file[2] = compress
            this._writeFile(file, content)
            folder[name] = file
            if (!this._setFilesystemObject(fs)) {
                file[2] = wasCompressed
                if (former) {
                    this._writeFile(file, former)
                } else {
                    this._removeFile(file)
                }
                return false
            }
            return file[1]
        }
    
        read(filename) {
            let file = this.walkPathAndFile(this.getFilesystemObject(), this.separate(filename))
            if (!file) {
                throw Error('No such file')
            }
            return this.readFile(file)
        }
    
        size(filename) {
            let file = this.walkPathAndFile(this._getFilesystemObject(), this.separate(filename))
            return (file != null ? file[1] : void 0) || -1
        }
    
        append(filename, content, compress) {
            var file, folder, former, fs, name, path, wasCompressed, _ref
            if (compress == null) {
                compress = this.compressionDefault
            }
            if (typeof content !== 'string') {
                throw Error('Can only append strings to a file')
            }
            _ref = this.separateWithFilename(filename), path = _ref.path, name = _ref.name
            fs = this._getFilesystemObject()
            folder = this.walkPath(fs, path)
            if (!folder) {
                throw Error('Invalid folder path')
            }
            if (folder.hasOwnProperty(name)) {
                if (!(folder[name] instanceof Array)) {
                    throw Error('Cannot append to a folder')
                }
                file = folder[name]
                former = this._readFile(file)
                if (typeof former !== 'string') {
                    throw Error('Cannot append to a file unless it contains a string')
                }
                content = former + content
            } else {
                file = [this._nextAvailableFileNumber(), 0]
                former = null
            }
            wasCompressed = file[2]
            file[2] = compress
            this._writeFile(file, content)
            folder[name] = file
            if (!this._setFilesystemObject(fs)) {
                file[2] = wasCompressed
                if (former) {
                    this._writeFile(file, former)
                } else {
                    this._removeFile(file)
                }
                return false
            }
            return file[1]
        }
    
        rm(path) {
            var file, filesBeneath, folder, fs, name, _i, _len, _ref, _ref1
            _ref = this.separateWithFilename(path), path = _ref.path, name = _ref.name
            if (!name) {
                return false
            }
            fs = this._getFilesystemObject()
            folder = this.walkPath(fs, path)
            if (!folder) {
                return false
            }
            if (!folder.hasOwnProperty(name)) {
                return false
            }
            filesBeneath = function(entry) {
                var child, result
                if (entry instanceof Array) {
                    return [entry]
                }
                result = []
                for (child in entry) {
                    if (!__hasProp.call(entry, child)) continue
                    result = result.concat(filesBeneath(entry[child]))
                }
                return result
            }
            _ref1 = filesBeneath(folder[name])
            for (_i = 0, _len = _ref1.length _i < _len _i++) {
                file = _ref1[_i]
                this._removeFile(file)
            }
            delete folder[name]
            this._setFilesystemObject(fs)
            return true
        }
    
        cp(source, dest) {
            var data, destFolder, destName, e, file, fs, name, newfile, path, sourcePath, _ref
            fs = this._getFilesystemObject()
            sourcePath = this.separate(source)
            file = this.walkPathAndFile(fs, sourcePath)
            if (!file || !(file instanceof Array)) {
                return false
            }
            _ref = this.separateWithFilename(dest), path = _ref.path, name = _ref.name
            destFolder = this.walkPath(fs, path)
            if (!destFolder) {
                return
            }
            if (!name) {
                destName = sourceName
            } else if (destFolder.hasOwnProperty(name)) {
                if (destFolder[name] instanceof Array) {
                    return
                }
                destFolder = destFolder[name]
                name = sourcePath[sourcePath.length - 1]
                if (destFolder.hasOwnProperty(name)) {
                    return
                }
            }
            data = this._readFile(file)
            newfile = [this._nextAvailableFileNumber(), 0]
            try {
                this._writeFile(newfile, data)
            } catch (_error) {
                e = _error
                return false
            }
            destFolder[name] = newfile
            if (!this._setFilesystemObject(fs)) {
                this._removeFile(newfile)
                return false
            }
            return true
        }
    
        mv(source, dest) {
            var destFolder, destName, fs, name, path, sourceFolder, sourceName, _ref, _ref1
            fs = this._getFilesystemObject()
            _ref = this.separateWithFilename(source), path = _ref.path, name = _ref.name
            sourceFolder = this.walkPath(fs, path)
            if (!sourceFolder || !sourceFolder.hasOwnProperty(name)) {
                throw Error('No such file or folder')
            }
            sourceName = name
            _ref1 = this.separateWithFilename(dest), path = _ref1.path, name = _ref1.name
            destFolder = this.walkPath(fs, path)
            destName = name
            if (!destFolder) {
                return
            }
            if (!name) {
                destName = sourceName
            } else if (destFolder.hasOwnProperty(name)) {
                if (destFolder[destName] instanceof Array) {
                    return
                }
                destFolder = destFolder[destName]
                destName = sourceName
                if (destFolder.hasOwnProperty(destName)) {
                    return
                }
            }
            destFolder[destName] = sourceFolder[sourceName]
            delete sourceFolder[sourceName]
            return this._setFilesystemObject(fs)
        }
    */
}
