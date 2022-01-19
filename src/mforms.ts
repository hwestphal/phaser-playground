import { DOM, DOMAttribute } from "./DOM";
import { parse, join } from "path-browserify"


export class MForms {

    /** note: this returns the HTMLElement of the COLUMN */
    static rowOpen(parent: string | HTMLElement, cols: number, id: string = ''): HTMLElement {
        let thisID = id ? `id='${id}'` : ``;
        let row = DOM.node('div', '', '', `row`)    // first create the child
        DOM.appendChild(parent, row)
        return row
    }

    // // // here's a sample of setting up four columns
    // let row = MForms.rowOpen('App', 3)

    // let col1 = MForms.rowNextCol(row, 3)
    // DOM.paragraph(col1, 'first')
    // let col2 = MForms.rowNextCol(row, 3)
    // DOM.paragraph(col2, 'second')
    // let col3 = MForms.rowNextCol(row, 3)
    // DOM.paragraph(col3, 'third')
    // let col4 = MForms.rowNextCol(row, 3)
    // DOM.paragraph(col4, 'fourth')


    static rowNextCol(parent: string | HTMLElement, cols: number): HTMLElement {
        let col = DOM.appendChild(parent, DOM.node('div', '', '', `col-${cols}`))
        return col
    }


    // these are bootstraph glyphs in the form

    // //<p><span class="glyphicon glyphicon-envelope">Envelope icon</span></p>
    // static glyphIcon(parent:string|HTMLElement,glyph:string,attributes:DOMAttribute[]=[]):HTMLElement{
    //     // add a style attribute
    //     attributes = DOM.defaultAttribute(attributes,{key:'style',value:'font-size:large;'})
    //     let p = DOM.paragraph(parent,glyph,attributes)
    //     return p
    // }

    static glyphIcon(name: string, size: number = 32, aria: string = '', backcolor: string = '') {
        let p = parse(name)   // path.parse()

        // let p = parse('/home/user/dir/file.txt');
        // expect(p.root).toEqual('/')
        // expect(p.dir).toEqual('/home/user/dir')
        // expect(p.ext).toEqual('.txt')
        // expect(p.name).toEqual('file')


        let bcolor = (backcolor) ? `style="background-color:${backcolor};"` : ``
        let ariaMsg = (aria) ? `aria-label="${aria}" ` : `aria-label="${name}" `
        let path = join('pix', p.dir)
        let ext = (p.ext) ? '' : '.svg'

        return `<img src="${path}/${name}${ext}"
                     alt="${name}"
                     ${ariaMsg}
                     ${bcolor}
                     width="${size}" height="${size}" />`
    }





    /*
        static function security() {
            $f = '';
            $f.= "<input type='hidden' name='id' value='{$GLOBALS['id']}' />";
            $f.= "<input type='hidden' name='sesskey' value='{$GLOBALS['session']}' />";
            $f.= "<input type='hidden' name='preventresubmit' value='{$_SESSION['preventresubmit']}' />";
            return ($f);
        }

        static function hidden(string $name, string $value, string $id = '') {
            $fid = ($id) ? "id='$id'" : '';
            return ("<input type='hidden' name='$name' value='$value' $fid />");
        }


        static function inputText(string $label, string $name, string $value = '', string $id = '', bool $disabled = false, bool $inline = false) {
            $fid = (!empty($id)) ? "id='$id'" : "id='$name'";
            // readonly instead of disabled
            $fdis = ($disabled) ? "readonly='readonly'" : '';
            $inln = ($inline) ? "class='form-inline'" : "class='form-group'";
            $f = "\n
                < div $inln >
                    <label>$label < /label>
                    < input type = 'text' class='form-control' name = '$name' value = '$value' $fid />
                        </div>";

            return ($f);
        }


        static function inputNumber(string $label, string $name, float $value = 0, string $id = '', bool $disabled = false) {
            $fid = (!empty($id)) ? "id='$id'" : "id='$name'";
            // readonly instead of disabled
            $fdis = ($disabled) ? "readonly='readonly'" : '';

            $f = "\n
                < div class='form-group' >
                    <label>$label < /label>
                    < input type = 'number' class='form-control' name = '$name' value = '$value' $fdis />
                        </div>";

            return ($f);
        }

        static function textarea(string $label, string $name, $value, string $id = '', bool $disabled = false, $rows = 5, $placeholder = '') {
            $fid = (!empty($id)) ? "id='$id'" : "id='$name'";
            $fdis = ($disabled) ? "disabled='disabled'" : '';
            $fplace = ($placeholder) ? "placeholder='$placeholder'" : '';
            $value = strval($value); // might be null

            $f = "\n
                < div class='form-group' >
                    <label>$label < /label>
                    < textarea class='form-control' wrap = 'soft'  name = '$name' rows = '$rows' $fid $fdis $fplace > $value < /textarea>
                        < /div>";

            return ($f);
        }


        // for a disabled button, leave name emoty
        static function submitButton(string $text, string $color, string $name = '', bool $solid = true, string $onClick = '') {
            assertTrue(!empty($text));
            assertTrue(in_array($color, ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']));


            $n = (empty($name)) ? 'disabled="disabled"' : "name='$name'"; // if no name, then disable button
            $bakeryTicket = $_SESSION['bakeryTicket'];  // was 'bakeryticket()'
            $saver = "form=\'$bakeryTicket\'";

            $buttonClass = "btn btn-sm btn-". (($solid) ? '' : 'outline-'). "$color";

            $confirm = '';
            if (!empty($onClick)) {
                $confirm = "onclick=\"return confirm('{$onClick} -Are you sure?')\"";
            }



            $HTML =
                // "<input type='hidden' name='preventresubmit' value='{$_SESSION['preventresubmit']}' />
                "<button type='submit' class='$buttonClass rounded' $n $confirm style='margin:3px'>$text</button>";

            $HTML.= MForms:: security();
            // printNice($HTML,'submitButton');
            return ($HTML);
        }


        // submit buttons that are EXTERNAL to the form
        static function externalSubmitButton(int $formID, string $text, string $color, string $p, string $q, bool $solid = true, string $onClick = '') {

            // $tf = ($solid)?'true':'false';
            // printNice("function externalSubmitButton(formID: $formID, text: $text, color: $color, p: $p, q: $q, solid: $tf, onClick $onClick )");

            assertTrue(!empty($text));
            assertTrue(in_array($color, ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']));

            $n = (empty($p)) ? 'disabled="disabled"' : "name='$p'"; // if no name, then disable button
            // $saver = (empty($name)) ? '' : 'document.getElementById("'.$bakeryTicket.'").value = "'.$name.'" ';
            $saver = "form='$formID'";

            $buttonClass = "btn btn-sm btn-". (($solid) ? '' : 'outline-'). "$color";

            $confirm = '';
            if (!empty($onClick)) {
                $confirm = "onclick=\"$saver;return(confirm('$onClick - Are you sure?'));\"";
            }

            $style = "style='padding:1px 5px;";

            $HTML =
                // "<input type='hidden' name='preventresubmit' value='{$_SESSION['preventresubmit']}' />
                // "<button type='submit' class='' $n $saver style='margin:3px'>$text</button>";
                "<input type='submit' name='$p' value='$text' class='$buttonClass rounded' $style form='stepForm' $confirm />";

            // printNice($HTML,'submitButton');
            return ($HTML);
        }


        static function blockButton(string $text, string $color) {

            return "button type='button' class='btn btn-$color btn-lg btn-block'>$text</button>";
        }


        static function checkbox(string $text, string $id, $value = null, $defaultValue = null) {
            $checked = 'checked';   // naive guess
            if (!is_null($defaultValue)) {
                $checked = $defaultValue ? 'checked' : '';  //
            }
            if (!empty($value)) {
                $checked = $value ? 'checked' : '';  //
            }
            $HTML = "\n";
            $HTML.= "<div class='form-check'>";
            $HTML.= "<input type='checkbox' class='form-check-input' $checked id='$id'>";
            $HTML.= "<label class='form-check-label'>$text</label>";
            $HTML.= "</div>";
            return $HTML;
        }

        static function select(string $text, string $id, string $options) {

            $HTML = "\n";
            // $HTML .= '<div class="form-group">';
            $HTML.= "<label>$text</label>";
            $HTML.= "<select class='form-control' name='$id' id='$id'>";
            $HTML.= $options;
            $HTML.= '</select>';
            //   $HTML .= '</div>';

            return ($HTML);
        }

        static function tinyselect(string $text, string $name, string $id, string $options) {
            $HTML = "\n";
            $HTML.= "<div style='float:left;position:relative;margin-top:-5px'>&nbsp;";
            $HTML.= "<span style='font-size:10px;position:relative;'>$text<br></span>";

            $HTML.= "<select name='$name',id='$id'>
            $options
                < /select>";
            $HTML.= "</div>";
            return ($HTML);
        }

        static function radio(string $text, string $name, $value = '') {
            $HTML = "\n";

            $value = ($value) ? '0' : '1';  // changes empty or null string to definitely 0 or 1
            $HTML.= "<div class='form-check'>";
            $HTML.= "<input class='form-check-input' type='radio' name='$name' id='$name' value='$value'>";
            $HTML.= "<label class='form-check-label'>$text</label>";
            $HTML.= "</div>";
            return ($HTML);
        }
        static function fileForm(string $text, string $action) {
            $HTML = "\n";
            $HTML = "<div style='border:solid blue 1px;margin:1px;'>";
            $HTML.= "<form method='post' enctype='multipart/form-data'>";
            $HTML.= MForms:: security();
            $HTML.= MForms:: hidden('p', $action);
            $HTML.= "<input type='file' name='fileToUpload' id='fileToUpload'>";
            $HTML.= "<input type='submit' value='$text' name='performFileSelect' style='float:right;'>";
            // $HTML .= "<input type='submit' value='&#128194; Open File' name='submit'>";
            $HTML.= "</form>";
            $HTML.= "</div>";
            return ($HTML);
        }
    */
}
