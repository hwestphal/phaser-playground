/**
 * Constant used to convert a value to gamma space
 * @ignorenaming
 */
export declare const ToGammaSpace: number;
/**
 * Constant used to convert a value to linear space
 * @ignorenaming
 */
export declare const ToLinearSpace = 2.2;
/**
 * Constant used to define the minimal number value in Babylon.js
 * @ignorenaming
 */
declare let Epsilon: number;
export { Epsilon };
/**
 * Class representing a vector containing 2 coordinates
 */
export declare class Vector2 {
    /** defines the first coordinate */
    x: number;
    /** defines the second coordinate */
    y: number;
    /**
     * Creates a new Vector2 from the given x and y coordinates
     * @param x defines the first coordinate
     * @param y defines the second coordinate
     */
    constructor(
    /** defines the first coordinate */
    x?: number, 
    /** defines the second coordinate */
    y?: number);
    /**
     * Gets a string with the Vector2 coordinates
     * @returns a string with the Vector2 coordinates
     */
    toString(): string;
    /**
     * Gets class name
     * @returns the string "Vector2"
     */
    getClassName(): string;
    /**
     * Gets current vector hash code
     * @returns the Vector2 hash code as a number
     */
    getHashCode(): number;
    /**
     * Sets the Vector2 coordinates in the given array or Float32Array from the given index.
     * @param array defines the source array
     * @param index defines the offset in source array
     * @returns the current Vector2
     */
    toArray(array: number[], index?: number): Vector2;
    /**
     * Copy the current vector to an array
     * @returns a new array with 2 elements: the Vector2 coordinates.
     */
    asArray(): number[];
    /**
     * Sets the Vector2 coordinates with the given Vector2 coordinates
     * @param source defines the source Vector2
     * @returns the current updated Vector2
     */
    copyFrom(source: Vector2): Vector2;
    /**
     * Sets the Vector2 coordinates with the given floats
     * @param x defines the first coordinate
     * @param y defines the second coordinate
     * @returns the current updated Vector2
     */
    copyFromFloats(x: number, y: number): Vector2;
    /**
     * Sets the Vector2 coordinates with the given floats
     * @param x defines the first coordinate
     * @param y defines the second coordinate
     * @returns the current updated Vector2
     */
    set(x: number, y: number): Vector2;
    /**
     * Add another vector with the current one
     * @param otherVector defines the other vector
     * @returns a new Vector2 set with the addition of the current Vector2 and the given one coordinates
     */
    add(otherVector: Vector2): Vector2;
    /**
     * Sets the "result" coordinates with the addition of the current Vector2 and the given one coordinates
     * @param otherVector defines the other vector
     * @param result defines the target vector
     * @returns the unmodified current Vector2
     */
    addToRef(otherVector: Vector2, result: Vector2): Vector2;
    /**
     * Set the Vector2 coordinates by adding the given Vector2 coordinates
     * @param otherVector defines the other vector
     * @returns the current updated Vector2
     */
    addInPlace(otherVector: Vector2): Vector2;
    /**
     * Gets a new Vector2 by adding the current Vector2 coordinates to the given Vector3 x, y coordinates
     * @param otherVector defines the other vector
     * @returns a new Vector2
     */
    addVector3(otherVector: Vector3): Vector2;
    /**
     * Gets a new Vector2 set with the subtracted coordinates of the given one from the current Vector2
     * @param otherVector defines the other vector
     * @returns a new Vector2
     */
    subtract(otherVector: Vector2): Vector2;
    /**
     * Sets the "result" coordinates with the subtraction of the given one from the current Vector2 coordinates.
     * @param otherVector defines the other vector
     * @param result defines the target vector
     * @returns the unmodified current Vector2
     */
    subtractToRef(otherVector: Vector2, result: Vector2): Vector2;
    /**
     * Sets the current Vector2 coordinates by subtracting from it the given one coordinates
     * @param otherVector defines the other vector
     * @returns the current updated Vector2
     */
    subtractInPlace(otherVector: Vector2): Vector2;
    /**
     * Multiplies in place the current Vector2 coordinates by the given ones
     * @param otherVector defines the other vector
     * @returns the current updated Vector2
     */
    multiplyInPlace(otherVector: Vector2): Vector2;
    /**
     * Returns a new Vector2 set with the multiplication of the current Vector2 and the given one coordinates
     * @param otherVector defines the other vector
     * @returns a new Vector2
     */
    multiply(otherVector: Vector2): Vector2;
    /**
     * Sets "result" coordinates with the multiplication of the current Vector2 and the given one coordinates
     * @param otherVector defines the other vector
     * @param result defines the target vector
     * @returns the unmodified current Vector2
     */
    multiplyToRef(otherVector: Vector2, result: Vector2): Vector2;
    /**
     * Gets a new Vector2 set with the Vector2 coordinates multiplied by the given floats
     * @param x defines the first coordinate
     * @param y defines the second coordinate
     * @returns a new Vector2
     */
    multiplyByFloats(x: number, y: number): Vector2;
    /**
     * Returns a new Vector2 set with the Vector2 coordinates divided by the given one coordinates
     * @param otherVector defines the other vector
     * @returns a new Vector2
     */
    divide(otherVector: Vector2): Vector2;
    /**
     * Sets the "result" coordinates with the Vector2 divided by the given one coordinates
     * @param otherVector defines the other vector
     * @param result defines the target vector
     * @returns the unmodified current Vector2
     */
    divideToRef(otherVector: Vector2, result: Vector2): Vector2;
    /**
     * Divides the current Vector2 coordinates by the given ones
     * @param otherVector defines the other vector
     * @returns the current updated Vector2
     */
    divideInPlace(otherVector: Vector2): Vector2;
    /**
     * Gets a new Vector2 with current Vector2 negated coordinates
     * @returns a new Vector2
     */
    negate(): Vector2;
    /**
     * Negate this vector in place
     * @returns this
     */
    negateInPlace(): Vector2;
    /**
     * Negate the current Vector2 and stores the result in the given vector "result" coordinates
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector2
     */
    negateToRef(result: Vector2): Vector2;
    /**
     * Multiply the Vector2 coordinates by scale
     * @param scale defines the scaling factor
     * @returns the current updated Vector2
     */
    scaleInPlace(scale: number): Vector2;
    /**
     * Returns a new Vector2 scaled by "scale" from the current Vector2
     * @param scale defines the scaling factor
     * @returns a new Vector2
     */
    scale(scale: number): Vector2;
    /**
     * Scale the current Vector2 values by a factor to a given Vector2
     * @param scale defines the scale factor
     * @param result defines the Vector2 object where to store the result
     * @returns the unmodified current Vector2
     */
    scaleToRef(scale: number, result: Vector2): Vector2;
    /**
     * Scale the current Vector2 values by a factor and add the result to a given Vector2
     * @param scale defines the scale factor
     * @param result defines the Vector2 object where to store the result
     * @returns the unmodified current Vector2
     */
    scaleAndAddToRef(scale: number, result: Vector2): Vector2;
    /**
     * Gets a boolean if two vectors are equals
     * @param otherVector defines the other vector
     * @returns true if the given vector coordinates strictly equal the current Vector2 ones
     */
    equals(otherVector: Vector2): boolean;
    /**
     * Gets a boolean if two vectors are equals (using an epsilon value)
     * @param otherVector defines the other vector
     * @param epsilon defines the minimal distance to consider equality
     * @returns true if the given vector coordinates are close to the current ones by a distance of epsilon.
     */
    equalsWithEpsilon(otherVector: Vector2, epsilon?: number): boolean;
    /**
     * Gets a new Vector2 from current Vector2 floored values
     * @returns a new Vector2
     */
    floor(): Vector2;
    /**
     * Gets a new Vector2 from current Vector2 floored values
     * @returns a new Vector2
     */
    fract(): Vector2;
    /**
     * Gets the length of the vector
     * @returns the vector length (float)
     */
    length(): number;
    /**
     * Gets the vector squared length
     * @returns the vector squared length (float)
     */
    lengthSquared(): number;
    /**
     * Normalize the vector
     * @returns the current updated Vector2
     */
    normalize(): Vector2;
    /**
     * Gets a new Vector2 copied from the Vector2
     * @returns a new Vector2
     */
    clone(): Vector2;
    /**
     * Gets a new Vector2(0, 0)
     * @returns a new Vector2
     */
    static Zero(): Vector2;
    /**
     * Gets a new Vector2(1, 1)
     * @returns a new Vector2
     */
    static One(): Vector2;
    /**
     * Gets a new Vector2 located for "amount" (float) on the CatmullRom spline defined by the given four Vector2
     * @param value1 defines 1st point of control
     * @param value2 defines 2nd point of control
     * @param value3 defines 3rd point of control
     * @param value4 defines 4th point of control
     * @param amount defines the interpolation factor
     * @returns a new Vector2
     */
    static CatmullRom(value1: Vector2, value2: Vector2, value3: Vector2, value4: Vector2, amount: number): Vector2;
    /**
     * Returns a new Vector2 set with same the coordinates than "value" ones if the vector "value" is in the square defined by "min" and "max".
     * If a coordinate of "value" is lower than "min" coordinates, the returned Vector2 is given this "min" coordinate.
     * If a coordinate of "value" is greater than "max" coordinates, the returned Vector2 is given this "max" coordinate
     * @param value defines the value to clamp
     * @param min defines the lower limit
     * @param max defines the upper limit
     * @returns a new Vector2
     */
    static Clamp(value: Vector2, min: Vector2, max: Vector2): Vector2;
    /**
     * Returns a new Vector2 located for "amount" (float) on the Hermite spline defined by the vectors "value1", "value3", "tangent1", "tangent2"
     * @param value1 defines the 1st control point
     * @param tangent1 defines the outgoing tangent
     * @param value2 defines the 2nd control point
     * @param tangent2 defines the incoming tangent
     * @param amount defines the interpolation factor
     * @returns a new Vector2
     */
    static Hermite(value1: Vector2, tangent1: Vector2, value2: Vector2, tangent2: Vector2, amount: number): Vector2;
    /**
     * Returns a new Vector2 located for "amount" (float) on the linear interpolation between the vector "start" adn the vector "end".
     * @param start defines the start vector
     * @param end defines the end vector
     * @param amount defines the interpolation factor
     * @returns a new Vector2
     */
    static Lerp(start: Vector2, end: Vector2, amount: number): Vector2;
    /**
     * Gets the dot product of the vector "left" and the vector "right"
     * @param left defines first vector
     * @param right defines second vector
     * @returns the dot product (float)
     */
    static Dot(left: Vector2, right: Vector2): number;
    /**
     * Returns a new Vector2 equal to the normalized given vector
     * @param vector defines the vector to normalize
     * @returns a new Vector2
     */
    static Normalize(vector: Vector2): Vector2;
    /**
     * Gets a new Vector2 set with the minimal coordinate values from the "left" and "right" vectors
     * @param left defines 1st vector
     * @param right defines 2nd vector
     * @returns a new Vector2
     */
    static Minimize(left: Vector2, right: Vector2): Vector2;
    /**
     * Gets a new Vecto2 set with the maximal coordinate values from the "left" and "right" vectors
     * @param left defines 1st vector
     * @param right defines 2nd vector
     * @returns a new Vector2
     */
    static Maximize(left: Vector2, right: Vector2): Vector2;
    /**
     * Gets a new Vector2 set with the transformed coordinates of the given vector by the given transformation matrix
     * @param vector defines the vector to transform
     * @param transformation defines the matrix to apply
     * @returns a new Vector2
     */
    static Transform(vector: Vector2, transformation: Matrix): Vector2;
    /**
     * Transforms the given vector coordinates by the given transformation matrix and stores the result in the vector "result" coordinates
     * @param vector defines the vector to transform
     * @param transformation defines the matrix to apply
     * @param result defines the target vector
     */
    static TransformToRef(vector: Vector2, transformation: Matrix, result: Vector2): void;
    /**
     * Determines if a given vector is included in a triangle
     * @param p defines the vector to test
     * @param p0 defines 1st triangle point
     * @param p1 defines 2nd triangle point
     * @param p2 defines 3rd triangle point
     * @returns true if the point "p" is in the triangle defined by the vertors "p0", "p1", "p2"
     */
    static PointInTriangle(p: Vector2, p0: Vector2, p1: Vector2, p2: Vector2): boolean;
    /**
     * Gets the distance between the vectors "value1" and "value2"
     * @param value1 defines first vector
     * @param value2 defines second vector
     * @returns the distance between vectors
     */
    static Distance(value1: Vector2, value2: Vector2): number;
    /**
     * Returns the squared distance between the vectors "value1" and "value2"
     * @param value1 defines first vector
     * @param value2 defines second vector
     * @returns the squared distance between vectors
     */
    static DistanceSquared(value1: Vector2, value2: Vector2): number;
    /**
     * Gets a new Vector2 located at the center of the vectors "value1" and "value2"
     * @param value1 defines first vector
     * @param value2 defines second vector
     * @returns a new Vector2
     */
    static Center(value1: Vector2, value2: Vector2): Vector2;
    /**
     * Gets the center of the vectors "value1" and "value2" and stores the result in the vector "ref"
     * @param value1 defines first vector
     * @param value2 defines second vector
     * @param ref defines third vector
     * @returns ref
     */
    static CenterToRef(value1: Vector2, value2: Vector2, ref: Vector2): Vector2;
    /**
     * Gets the shortest distance (float) between the point "p" and the segment defined by the two points "segA" and "segB".
     * @param p defines the middle point
     * @param segA defines one point of the segment
     * @param segB defines the other point of the segment
     * @returns the shortest distance
     */
    static DistanceOfPointFromSegment(p: Vector2, segA: Vector2, segB: Vector2): number;
}
/**
 * Class used to store (x,y,z) vector representation
 * A Vector3 is the main object used in 3D geometry
 * It can represent etiher the coordinates of a point the space, either a direction
 * Reminder: js uses a left handed forward facing system
 */
export declare class Vector3 {
    private static _UpReadOnly;
    private static _ZeroReadOnly;
    /** @hidden */
    _x: number;
    /** @hidden */
    _y: number;
    /** @hidden */
    _z: number;
    /** @hidden */
    _isDirty: boolean;
    /** Gets or sets the x coordinate */
    get x(): number;
    set x(value: number);
    /** Gets or sets the y coordinate */
    get y(): number;
    set y(value: number);
    /** Gets or sets the z coordinate */
    get z(): number;
    set z(value: number);
    /**
     * Creates a new Vector3 object from the given x, y, z (floats) coordinates.
     * @param x defines the first coordinates (on X axis)
     * @param y defines the second coordinates (on Y axis)
     * @param z defines the third coordinates (on Z axis)
     */
    constructor(x?: number, y?: number, z?: number);
    /**
     * Creates a string representation of the Vector3
     * @returns a string with the Vector3 coordinates.
     */
    toString(): string;
    /**
     * Gets the class name
     * @returns the string "Vector3"
     */
    getClassName(): string;
    /**
     * Creates the Vector3 hash code
     * @returns a number which tends to be unique between Vector3 instances
     */
    getHashCode(): number;
    /**
     * Creates an array containing three elements : the coordinates of the Vector3
     * @returns a new array of numbers
     */
    asArray(): number[];
    /**
     * Populates the given array or Float32Array from the given index with the successive coordinates of the Vector3
     * @param array defines the destination array
     * @param index defines the offset in the destination array
     * @returns the current Vector3
     */
    toArray(array: number[], index?: number): Vector3;
    /**
     * Update the current vector from an array
     * @param array defines the destination array
     * @param index defines the offset in the destination array
     * @returns the current Vector3
     */
    fromArray(array: number[], index?: number): Vector3;
    /**
     * Converts the current Vector3 into a quaternion (considering that the Vector3 contains Euler angles representation of a rotation)
     * @returns a new Quaternion object, computed from the Vector3 coordinates
     */
    toQuaternion(): Quaternion;
    /**
     * Adds the given vector to the current Vector3
     * @param otherVector defines the second operand
     * @returns the current updated Vector3
     */
    addInPlace(otherVector: Vector3): Vector3;
    /**
     * Adds the given coordinates to the current Vector3
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    addInPlaceFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Gets a new Vector3, result of the addition the current Vector3 and the given vector
     * @param otherVector defines the second operand
     * @returns the resulting Vector3
     */
    add(otherVector: Vector3): Vector3;
    /**
     * Adds the current Vector3 to the given one and stores the result in the vector "result"
     * @param otherVector defines the second operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    addToRef(otherVector: Vector3, result: Vector3): Vector3;
    /**
     * Subtract the given vector from the current Vector3
     * @param otherVector defines the second operand
     * @returns the current updated Vector3
     */
    subtractInPlace(otherVector: Vector3): Vector3;
    /**
     * Returns a new Vector3, result of the subtraction of the given vector from the current Vector3
     * @param otherVector defines the second operand
     * @returns the resulting Vector3
     */
    subtract(otherVector: Vector3): Vector3;
    /**
     * Subtracts the given vector from the current Vector3 and stores the result in the vector "result".
     * @param otherVector defines the second operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    subtractToRef(otherVector: Vector3, result: Vector3): Vector3;
    /**
     * Returns a new Vector3 set with the subtraction of the given floats from the current Vector3 coordinates
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the resulting Vector3
     */
    subtractFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Subtracts the given floats from the current Vector3 coordinates and set the given vector "result" with this result
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    subtractFromFloatsToRef(x: number, y: number, z: number, result: Vector3): Vector3;
    /**
     * Gets a new Vector3 set with the current Vector3 negated coordinates
     * @returns a new Vector3
     */
    negate(): Vector3;
    /**
     * Negate this vector in place
     * @returns this
     */
    negateInPlace(): Vector3;
    /**
     * Negate the current Vector3 and stores the result in the given vector "result" coordinates
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    negateToRef(result: Vector3): Vector3;
    /**
     * Multiplies the Vector3 coordinates by the float "scale"
     * @param scale defines the multiplier factor
     * @returns the current updated Vector3
     */
    scaleInPlace(scale: number): Vector3;
    /**
     * Returns a new Vector3 set with the current Vector3 coordinates multiplied by the float "scale"
     * @param scale defines the multiplier factor
     * @returns a new Vector3
     */
    scale(scale: number): Vector3;
    /**
     * Multiplies the current Vector3 coordinates by the float "scale" and stores the result in the given vector "result" coordinates
     * @param scale defines the multiplier factor
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    scaleToRef(scale: number, result: Vector3): Vector3;
    /**
     * Scale the current Vector3 values by a factor and add the result to a given Vector3
     * @param scale defines the scale factor
     * @param result defines the Vector3 object where to store the result
     * @returns the unmodified current Vector3
     */
    scaleAndAddToRef(scale: number, result: Vector3): Vector3;
    /**
     * Returns true if the current Vector3 and the given vector coordinates are strictly equal
     * @param otherVector defines the second operand
     * @returns true if both vectors are equals
     */
    equals(otherVector: Vector3): boolean;
    /**
     * Returns true if the current Vector3 and the given vector coordinates are distant less than epsilon
     * @param otherVector defines the second operand
     * @param epsilon defines the minimal distance to define values as equals
     * @returns true if both vectors are distant less than epsilon
     */
    equalsWithEpsilon(otherVector: Vector3, epsilon?: number): boolean;
    /**
     * Returns true if the current Vector3 coordinates equals the given floats
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns true if both vectors are equals
     */
    equalsToFloats(x: number, y: number, z: number): boolean;
    /**
     * Multiplies the current Vector3 coordinates by the given ones
     * @param otherVector defines the second operand
     * @returns the current updated Vector3
     */
    multiplyInPlace(otherVector: Vector3): Vector3;
    /**
     * Returns a new Vector3, result of the multiplication of the current Vector3 by the given vector
     * @param otherVector defines the second operand
     * @returns the new Vector3
     */
    multiply(otherVector: Vector3): Vector3;
    /**
     * Multiplies the current Vector3 by the given one and stores the result in the given vector "result"
     * @param otherVector defines the second operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    multiplyToRef(otherVector: Vector3, result: Vector3): Vector3;
    /**
     * Returns a new Vector3 set with the result of the mulliplication of the current Vector3 coordinates by the given floats
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the new Vector3
     */
    multiplyByFloats(x: number, y: number, z: number): Vector3;
    /**
     * Returns a new Vector3 set with the result of the division of the current Vector3 coordinates by the given ones
     * @param otherVector defines the second operand
     * @returns the new Vector3
     */
    divide(otherVector: Vector3): Vector3;
    /**
     * Divides the current Vector3 coordinates by the given ones and stores the result in the given vector "result"
     * @param otherVector defines the second operand
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector3
     */
    divideToRef(otherVector: Vector3, result: Vector3): Vector3;
    /**
     * Divides the current Vector3 coordinates by the given ones.
     * @param otherVector defines the second operand
     * @returns the current updated Vector3
     */
    divideInPlace(otherVector: Vector3): Vector3;
    /**
     * Updates the current Vector3 with the minimal coordinate values between its and the given vector ones
     * @param other defines the second operand
     * @returns the current updated Vector3
     */
    minimizeInPlace(other: Vector3): Vector3;
    /**
     * Updates the current Vector3 with the maximal coordinate values between its and the given vector ones.
     * @param other defines the second operand
     * @returns the current updated Vector3
     */
    maximizeInPlace(other: Vector3): Vector3;
    /**
     * Updates the current Vector3 with the minimal coordinate values between its and the given coordinates
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    minimizeInPlaceFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Updates the current Vector3 with the maximal coordinate values between its and the given coordinates.
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    maximizeInPlaceFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Due to float precision, scale of a mesh could be uniform but float values are off by a small fraction
     * Check if is non uniform within a certain amount of decimal places to account for this
     * @param epsilon the amount the values can differ
     * @returns if the the vector is non uniform to a certain number of decimal places
     */
    isNonUniformWithinEpsilon(epsilon: number): boolean;
    /**
     * Gets a boolean indicating that the vector is non uniform meaning x, y or z are not all the same
     */
    get isNonUniform(): boolean;
    /**
     * Gets a new Vector3 from current Vector3 floored values
     * @returns a new Vector3
     */
    floor(): Vector3;
    /**
     * Gets a new Vector3 from current Vector3 floored values
     * @returns a new Vector3
     */
    fract(): Vector3;
    /**
     * Gets the length of the Vector3
     * @returns the length of the Vector3
     */
    length(): number;
    /**
     * Gets the squared length of the Vector3
     * @returns squared length of the Vector3
     */
    lengthSquared(): number;
    /**
     * Normalize the current Vector3.
     * Please note that this is an in place operation.
     * @returns the current updated Vector3
     */
    normalize(): Vector3;
    /**
     * Reorders the x y z properties of the vector in place
     * @param order new ordering of the properties (eg. for vector 1,2,3 with "ZYX" will produce 3,2,1)
     * @returns the current updated vector
     */
    reorderInPlace(order: string): this;
    /**
     * Rotates the vector around 0,0,0 by a quaternion
     * @param quaternion the rotation quaternion
     * @param result vector to store the result
     * @returns the resulting vector
     */
    rotateByQuaternionToRef(quaternion: Quaternion, result: Vector3): Vector3;
    /**
     * Rotates a vector around a given point
     * @param quaternion the rotation quaternion
     * @param point the point to rotate around
     * @param result vector to store the result
     * @returns the resulting vector
     */
    rotateByQuaternionAroundPointToRef(quaternion: Quaternion, point: Vector3, result: Vector3): Vector3;
    /**
     * Returns a new Vector3 as the cross product of the current vector and the "other" one
     * The cross product is then orthogonal to both current and "other"
     * @param other defines the right operand
     * @returns the cross product
     */
    cross(other: Vector3): Vector3;
    /**
     * Normalize the current Vector3 with the given input length.
     * Please note that this is an in place operation.
     * @param len the length of the vector
     * @returns the current updated Vector3
     */
    normalizeFromLength(len: number): Vector3;
    /**
     * Normalize the current Vector3 to a new vector
     * @returns the new Vector3
     */
    normalizeToNew(): Vector3;
    /**
     * Normalize the current Vector3 to the reference
     * @param reference define the Vector3 to update
     * @returns the updated Vector3
     */
    normalizeToRef(reference: Vector3): Vector3;
    /**
     * Creates a new Vector3 copied from the current Vector3
     * @returns the new Vector3
     */
    clone(): Vector3;
    /**
     * Copies the given vector coordinates to the current Vector3 ones
     * @param source defines the source Vector3
     * @returns the current updated Vector3
     */
    copyFrom(source: Vector3): Vector3;
    /**
     * Copies the given floats to the current Vector3 coordinates
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    copyFromFloats(x: number, y: number, z: number): Vector3;
    /**
     * Copies the given floats to the current Vector3 coordinates
     * @param x defines the x coordinate of the operand
     * @param y defines the y coordinate of the operand
     * @param z defines the z coordinate of the operand
     * @returns the current updated Vector3
     */
    set(x: number, y: number, z: number): Vector3;
    /**
     * Copies the given float to the current Vector3 coordinates
     * @param v defines the x, y and z coordinates of the operand
     * @returns the current updated Vector3
     */
    setAll(v: number): Vector3;
    /**
     * Get the clip factor between two vectors
     * @param vector0 defines the first operand
     * @param vector1 defines the second operand
     * @param axis defines the axis to use
     * @param size defines the size along the axis
     * @returns the clip factor
     */
    static GetClipFactor(vector0: Vector3, vector1: Vector3, axis: Vector3, size: number): number;
    /**
     * Get angle between two vectors
     * @param vector0 angle between vector0 and vector1
     * @param vector1 angle between vector0 and vector1
     * @param normal direction of the normal
     * @return the angle between vector0 and vector1
     */
    static GetAngleBetweenVectors(vector0: Vector3, vector1: Vector3, normal: Vector3): number;
    /**
     * Returns a new Vector3 set from the index "offset" of the given array
     * @param array defines the source array
     * @param offset defines the offset in the source array
     * @returns the new Vector3
     */
    static FromArray(array: number[], offset?: number): Vector3;
    /**
     * Returns a new Vector3 set from the index "offset" of the given Float32Array
     * @param array defines the source array
     * @param offset defines the offset in the source array
     * @returns the new Vector3
     * @deprecated Please use FromArray instead.
     */
    static FromFloatArray(array: number[], offset?: number): Vector3;
    /**
     * Sets the given vector "result" with the element values from the index "offset" of the given array
     * @param array defines the source array
     * @param offset defines the offset in the source array
     * @param result defines the Vector3 where to store the result
     */
    static FromArrayToRef(array: number[], offset: number, result: Vector3): void;
    /**
     * Sets the given vector "result" with the element values from the index "offset" of the given Float32Array
     * @param array defines the source array
     * @param offset defines the offset in the source array
     * @param result defines the Vector3 where to store the result
     * @deprecated Please use FromArrayToRef instead.
     */
    static FromFloatArrayToRef(array: number[], offset: number, result: Vector3): void;
    /**
     * Sets the given vector "result" with the given floats.
     * @param x defines the x coordinate of the source
     * @param y defines the y coordinate of the source
     * @param z defines the z coordinate of the source
     * @param result defines the Vector3 where to store the result
     */
    static FromFloatsToRef(x: number, y: number, z: number, result: Vector3): void;
    /**
     * Returns a new Vector3 set to (0.0, 0.0, 0.0)
     * @returns a new empty Vector3
     */
    static Zero(): Vector3;
    /**
     * Returns a new Vector3 set to (1.0, 1.0, 1.0)
     * @returns a new unit Vector3
     */
    static One(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, 1.0, 0.0)
     * @returns a new up Vector3
     */
    static Up(): Vector3;
    /**
     * Gets a up Vector3 that must not be updated
     */
    static get UpReadOnly(): Vector3;
    /**
     * Gets a zero Vector3 that must not be updated
     */
    static get ZeroReadOnly(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, -1.0, 0.0)
     * @returns a new down Vector3
     */
    static Down(): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, 0.0, 1.0)
     * @param rightHandedSystem is the scene right-handed (negative z)
     * @returns a new forward Vector3
     */
    static Forward(rightHandedSystem?: boolean): Vector3;
    /**
     * Returns a new Vector3 set to (0.0, 0.0, -1.0)
     * @param rightHandedSystem is the scene right-handed (negative-z)
     * @returns a new forward Vector3
     */
    static Backward(rightHandedSystem?: boolean): Vector3;
    /**
     * Returns a new Vector3 set to (1.0, 0.0, 0.0)
     * @returns a new right Vector3
     */
    static Right(): Vector3;
    /**
     * Returns a new Vector3 set to (-1.0, 0.0, 0.0)
     * @returns a new left Vector3
     */
    static Left(): Vector3;
    /**
     * Returns a new Vector3 set with the result of the transformation by the given matrix of the given vector.
     * This method computes tranformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
     * @param vector defines the Vector3 to transform
     * @param transformation defines the transformation matrix
     * @returns the transformed Vector3
     */
    static TransformCoordinates(vector: Vector3, transformation: Matrix): Vector3;
    /**
     * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given vector
     * This method computes tranformed coordinates only, not transformed direction vectors (ie. it takes translation in account)
     * @param vector defines the Vector3 to transform
     * @param transformation defines the transformation matrix
     * @param result defines the Vector3 where to store the result
     */
    static TransformCoordinatesToRef(vector: Vector3, transformation: Matrix, result: Vector3): void;
    /**
     * Sets the given vector "result" coordinates with the result of the transformation by the given matrix of the given floats (x, y, z)
     * This method computes tranformed coordinates only, not transformed direction vectors
     * @param x define the x coordinate of the source vector
     * @param y define the y coordinate of the source vector
     * @param z define the z coordinate of the source vector
     * @param transformation defines the transformation matrix
     * @param result defines the Vector3 where to store the result
     */
    static TransformCoordinatesFromFloatsToRef(x: number, y: number, z: number, transformation: Matrix, result: Vector3): void;
    /**
     * Returns a new Vector3 set with the result of the normal transformation by the given matrix of the given vector
     * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
     * @param vector defines the Vector3 to transform
     * @param transformation defines the transformation matrix
     * @returns the new Vector3
     */
    static TransformNormal(vector: Vector3, transformation: Matrix): Vector3;
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given vector
     * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
     * @param vector defines the Vector3 to transform
     * @param transformation defines the transformation matrix
     * @param result defines the Vector3 where to store the result
     */
    static TransformNormalToRef(vector: Vector3, transformation: Matrix, result: Vector3): void;
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given floats (x, y, z)
     * This methods computes transformed normalized direction vectors only (ie. it does not apply translation)
     * @param x define the x coordinate of the source vector
     * @param y define the y coordinate of the source vector
     * @param z define the z coordinate of the source vector
     * @param transformation defines the transformation matrix
     * @param result defines the Vector3 where to store the result
     */
    static TransformNormalFromFloatsToRef(x: number, y: number, z: number, transformation: Matrix, result: Vector3): void;
    /**
     * Returns a new Vector3 located for "amount" on the CatmullRom interpolation spline defined by the vectors "value1", "value2", "value3", "value4"
     * @param value1 defines the first control point
     * @param value2 defines the second control point
     * @param value3 defines the third control point
     * @param value4 defines the fourth control point
     * @param amount defines the amount on the spline to use
     * @returns the new Vector3
     */
    static CatmullRom(value1: Vector3, value2: Vector3, value3: Vector3, value4: Vector3, amount: number): Vector3;
    /**
     * Returns a new Vector3 set with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
     * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
     * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
     * @param value defines the current value
     * @param min defines the lower range value
     * @param max defines the upper range value
     * @returns the new Vector3
     */
    static Clamp(value: Vector3, min: Vector3, max: Vector3): Vector3;
    /**
     * Sets the given vector "result" with the coordinates of "value", if the vector "value" is in the cube defined by the vectors "min" and "max"
     * If a coordinate value of "value" is lower than one of the "min" coordinate, then this "value" coordinate is set with the "min" one
     * If a coordinate value of "value" is greater than one of the "max" coordinate, then this "value" coordinate is set with the "max" one
     * @param value defines the current value
     * @param min defines the lower range value
     * @param max defines the upper range value
     * @param result defines the Vector3 where to store the result
     */
    static ClampToRef(value: Vector3, min: Vector3, max: Vector3, result: Vector3): void;
    /**
     * Checks if a given vector is inside a specific range
     * @param v defines the vector to test
     * @param min defines the minimum range
     * @param max defines the maximum range
     */
    static CheckExtends(v: Vector3, min: Vector3, max: Vector3): void;
    /**
     * Returns a new Vector3 located for "amount" (float) on the Hermite interpolation spline defined by the vectors "value1", "tangent1", "value2", "tangent2"
     * @param value1 defines the first control point
     * @param tangent1 defines the first tangent vector
     * @param value2 defines the second control point
     * @param tangent2 defines the second tangent vector
     * @param amount defines the amount on the interpolation spline (between 0 and 1)
     * @returns the new Vector3
     */
    static Hermite(value1: Vector3, tangent1: Vector3, value2: Vector3, tangent2: Vector3, amount: number): Vector3;
    /**
     * Returns a new Vector3 located for "amount" (float) on the linear interpolation between the vectors "start" and "end"
     * @param start defines the start value
     * @param end defines the end value
     * @param amount max defines amount between both (between 0 and 1)
     * @returns the new Vector3
     */
    static Lerp(start: Vector3, end: Vector3, amount: number): Vector3;
    /**
     * Sets the given vector "result" with the result of the linear interpolation from the vector "start" for "amount" to the vector "end"
     * @param start defines the start value
     * @param end defines the end value
     * @param amount max defines amount between both (between 0 and 1)
     * @param result defines the Vector3 where to store the result
     */
    static LerpToRef(start: Vector3, end: Vector3, amount: number, result: Vector3): void;
    /**
     * Returns the dot product (float) between the vectors "left" and "right"
     * @param left defines the left operand
     * @param right defines the right operand
     * @returns the dot product
     */
    static Dot(left: Vector3, right: Vector3): number;
    /**
     * Returns a new Vector3 as the cross product of the vectors "left" and "right"
     * The cross product is then orthogonal to both "left" and "right"
     * @param left defines the left operand
     * @param right defines the right operand
     * @returns the cross product
     */
    static Cross(left: Vector3, right: Vector3): Vector3;
    /**
     * Sets the given vector "result" with the cross product of "left" and "right"
     * The cross product is then orthogonal to both "left" and "right"
     * @param left defines the left operand
     * @param right defines the right operand
     * @param result defines the Vector3 where to store the result
     */
    static CrossToRef(left: Vector3, right: Vector3, result: Vector3): void;
    /**
     * Returns a new Vector3 as the normalization of the given vector
     * @param vector defines the Vector3 to normalize
     * @returns the new Vector3
     */
    static Normalize(vector: Vector3): Vector3;
    /**
     * Sets the given vector "result" with the normalization of the given first vector
     * @param vector defines the Vector3 to normalize
     * @param result defines the Vector3 where to store the result
     */
    static NormalizeToRef(vector: Vector3, result: Vector3): void;
    /**
     * Project a Vector3 onto screen space
     * @param vector defines the Vector3 to project
     * @param world defines the world matrix to use
     * @param transform defines the transform (view x projection) matrix to use
     * @param viewport defines the screen viewport to use
     * @returns the new Vector3
     */
    static Project(vector: Vector3, world: Matrix, transform: Matrix, viewport: Viewport): Vector3;
    /**
     * Project a Vector3 onto screen space to reference
     * @param vector defines the Vector3 to project
     * @param world defines the world matrix to use
     * @param transform defines the transform (view x projection) matrix to use
     * @param viewport defines the screen viewport to use
     * @param result the vector in which the screen space will be stored
     * @returns the new Vector3
     */
    static ProjectToRef(vector: Vector3, world: Matrix, transform: Matrix, viewport: Viewport, result: Vector3): Vector3;
    /** @hidden */
    static _UnprojectFromInvertedMatrixToRef(source: Vector3, matrix: Matrix, result: Vector3): void;
    /**
     * Unproject from screen space to object space
     * @param source defines the screen space Vector3 to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param transform defines the transform (view x projection) matrix to use
     * @returns the new Vector3
     */
    static UnprojectFromTransform(source: Vector3, viewportWidth: number, viewportHeight: number, world: Matrix, transform: Matrix): Vector3;
    /**
     * Unproject from screen space to object space
     * @param source defines the screen space Vector3 to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param view defines the view matrix to use
     * @param projection defines the projection matrix to use
     * @returns the new Vector3
     */
    static Unproject(source: Vector3, viewportWidth: number, viewportHeight: number, world: Matrix, view: Matrix, projection: Matrix): Vector3;
    /**
     * Unproject from screen space to object space
     * @param source defines the screen space Vector3 to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param view defines the view matrix to use
     * @param projection defines the projection matrix to use
     * @param result defines the Vector3 where to store the result
     */
    static UnprojectToRef(source: Vector3, viewportWidth: number, viewportHeight: number, world: Matrix, view: Matrix, projection: Matrix, result: Vector3): void;
    /**
     * Unproject from screen space to object space
     * @param sourceX defines the screen space x coordinate to use
     * @param sourceY defines the screen space y coordinate to use
     * @param sourceZ defines the screen space z coordinate to use
     * @param viewportWidth defines the current width of the viewport
     * @param viewportHeight defines the current height of the viewport
     * @param world defines the world matrix to use (can be set to Identity to go to world space)
     * @param view defines the view matrix to use
     * @param projection defines the projection matrix to use
     * @param result defines the Vector3 where to store the result
     */
    static UnprojectFloatsToRef(sourceX: number, sourceY: number, sourceZ: number, viewportWidth: number, viewportHeight: number, world: Matrix, view: Matrix, projection: Matrix, result: Vector3): void;
    /**
     * Gets the minimal coordinate values between two Vector3
     * @param left defines the first operand
     * @param right defines the second operand
     * @returns the new Vector3
     */
    static Minimize(left: Vector3, right: Vector3): Vector3;
    /**
     * Gets the maximal coordinate values between two Vector3
     * @param left defines the first operand
     * @param right defines the second operand
     * @returns the new Vector3
     */
    static Maximize(left: Vector3, right: Vector3): Vector3;
    /**
     * Returns the distance between the vectors "value1" and "value2"
     * @param value1 defines the first operand
     * @param value2 defines the second operand
     * @returns the distance
     */
    static Distance(value1: Vector3, value2: Vector3): number;
    /**
     * Returns the squared distance between the vectors "value1" and "value2"
     * @param value1 defines the first operand
     * @param value2 defines the second operand
     * @returns the squared distance
     */
    static DistanceSquared(value1: Vector3, value2: Vector3): number;
    /**
     * Returns a new Vector3 located at the center between "value1" and "value2"
     * @param value1 defines the first operand
     * @param value2 defines the second operand
     * @returns the new Vector3
     */
    static Center(value1: Vector3, value2: Vector3): Vector3;
    /**
     * Gets the center of the vectors "value1" and "value2" and stores the result in the vector "ref"
     * @param value1 defines first vector
     * @param value2 defines second vector
     * @param ref defines third vector
     * @returns ref
     */
    static CenterToRef(value1: Vector3, value2: Vector3, ref: Vector3): Vector3;
    /**
     * Given three orthogonal normalized left-handed oriented Vector3 axis in space (target system),
     * RotationFromAxis() returns the rotation Euler angles (ex : rotation.x, rotation.y, rotation.z) to apply
     * to something in order to rotate it from its local system to the given target system
     * Note: axis1, axis2 and axis3 are normalized during this operation
     * @param axis1 defines the first axis
     * @param axis2 defines the second axis
     * @param axis3 defines the third axis
     * @returns a new Vector3
     */
    static RotationFromAxis(axis1: Vector3, axis2: Vector3, axis3: Vector3): Vector3;
    /**
     * The same than RotationFromAxis but updates the given ref Vector3 parameter instead of returning a new Vector3
     * @param axis1 defines the first axis
     * @param axis2 defines the second axis
     * @param axis3 defines the third axis
     * @param ref defines the Vector3 where to store the result
     */
    static RotationFromAxisToRef(axis1: Vector3, axis2: Vector3, axis3: Vector3, ref: Vector3): void;
}
/**
 * Vector4 class created for EulerAngle class conversion to Quaternion
 */
export declare class Vector4 {
    /** x value of the vector */
    x: number;
    /** y value of the vector */
    y: number;
    /** z value of the vector */
    z: number;
    /** w value of the vector */
    w: number;
    /**
     * Creates a Vector4 object from the given floats.
     * @param x x value of the vector
     * @param y y value of the vector
     * @param z z value of the vector
     * @param w w value of the vector
     */
    constructor(
    /** x value of the vector */
    x: number, 
    /** y value of the vector */
    y: number, 
    /** z value of the vector */
    z: number, 
    /** w value of the vector */
    w: number);
    /**
     * Returns the string with the Vector4 coordinates.
     * @returns a string containing all the vector values
     */
    toString(): string;
    /**
     * Returns the string "Vector4".
     * @returns "Vector4"
     */
    getClassName(): string;
    /**
     * Returns the Vector4 hash code.
     * @returns a unique hash code
     */
    getHashCode(): number;
    /**
     * Returns a new array populated with 4 elements : the Vector4 coordinates.
     * @returns the resulting array
     */
    asArray(): number[];
    /**
     * Populates the given array from the given index with the Vector4 coordinates.
     * @param array array to populate
     * @param index index of the array to start at (default: 0)
     * @returns the Vector4.
     */
    toArray(array: number[], index?: number): Vector4;
    /**
     * Update the current vector from an array
     * @param array defines the destination array
     * @param index defines the offset in the destination array
     * @returns the current Vector3
     */
    fromArray(array: number[], index?: number): Vector4;
    /**
     * Adds the given vector to the current Vector4.
     * @param otherVector the vector to add
     * @returns the updated Vector4.
     */
    addInPlace(otherVector: Vector4): Vector4;
    /**
     * Returns a new Vector4 as the result of the addition of the current Vector4 and the given one.
     * @param otherVector the vector to add
     * @returns the resulting vector
     */
    add(otherVector: Vector4): Vector4;
    /**
     * Updates the given vector "result" with the result of the addition of the current Vector4 and the given one.
     * @param otherVector the vector to add
     * @param result the vector to store the result
     * @returns the current Vector4.
     */
    addToRef(otherVector: Vector4, result: Vector4): Vector4;
    /**
     * Subtract in place the given vector from the current Vector4.
     * @param otherVector the vector to subtract
     * @returns the updated Vector4.
     */
    subtractInPlace(otherVector: Vector4): Vector4;
    /**
     * Returns a new Vector4 with the result of the subtraction of the given vector from the current Vector4.
     * @param otherVector the vector to add
     * @returns the new vector with the result
     */
    subtract(otherVector: Vector4): Vector4;
    /**
     * Sets the given vector "result" with the result of the subtraction of the given vector from the current Vector4.
     * @param otherVector the vector to subtract
     * @param result the vector to store the result
     * @returns the current Vector4.
     */
    subtractToRef(otherVector: Vector4, result: Vector4): Vector4;
    /**
     * Returns a new Vector4 set with the result of the subtraction of the given floats from the current Vector4 coordinates.
     */
    /**
     * Returns a new Vector4 set with the result of the subtraction of the given floats from the current Vector4 coordinates.
     * @param x value to subtract
     * @param y value to subtract
     * @param z value to subtract
     * @param w value to subtract
     * @returns new vector containing the result
     */
    subtractFromFloats(x: number, y: number, z: number, w: number): Vector4;
    /**
     * Sets the given vector "result" set with the result of the subtraction of the given floats from the current Vector4 coordinates.
     * @param x value to subtract
     * @param y value to subtract
     * @param z value to subtract
     * @param w value to subtract
     * @param result the vector to store the result in
     * @returns the current Vector4.
     */
    subtractFromFloatsToRef(x: number, y: number, z: number, w: number, result: Vector4): Vector4;
    /**
     * Returns a new Vector4 set with the current Vector4 negated coordinates.
     * @returns a new vector with the negated values
     */
    negate(): Vector4;
    /**
     * Negate this vector in place
     * @returns this
     */
    negateInPlace(): Vector4;
    /**
     * Negate the current Vector4 and stores the result in the given vector "result" coordinates
     * @param result defines the Vector3 object where to store the result
     * @returns the current Vector4
     */
    negateToRef(result: Vector4): Vector4;
    /**
     * Multiplies the current Vector4 coordinates by scale (float).
     * @param scale the number to scale with
     * @returns the updated Vector4.
     */
    scaleInPlace(scale: number): Vector4;
    /**
     * Returns a new Vector4 set with the current Vector4 coordinates multiplied by scale (float).
     * @param scale the number to scale with
     * @returns a new vector with the result
     */
    scale(scale: number): Vector4;
    /**
     * Sets the given vector "result" with the current Vector4 coordinates multiplied by scale (float).
     * @param scale the number to scale with
     * @param result a vector to store the result in
     * @returns the current Vector4.
     */
    scaleToRef(scale: number, result: Vector4): Vector4;
    /**
     * Scale the current Vector4 values by a factor and add the result to a given Vector4
     * @param scale defines the scale factor
     * @param result defines the Vector4 object where to store the result
     * @returns the unmodified current Vector4
     */
    scaleAndAddToRef(scale: number, result: Vector4): Vector4;
    /**
     * Boolean : True if the current Vector4 coordinates are stricly equal to the given ones.
     * @param otherVector the vector to compare against
     * @returns true if they are equal
     */
    equals(otherVector: Vector4): boolean;
    /**
     * Boolean : True if the current Vector4 coordinates are each beneath the distance "epsilon" from the given vector ones.
     * @param otherVector vector to compare against
     * @param epsilon (Default: very small number)
     * @returns true if they are equal
     */
    equalsWithEpsilon(otherVector: Vector4, epsilon?: number): boolean;
    /**
     * Boolean : True if the given floats are strictly equal to the current Vector4 coordinates.
     * @param x x value to compare against
     * @param y y value to compare against
     * @param z z value to compare against
     * @param w w value to compare against
     * @returns true if equal
     */
    equalsToFloats(x: number, y: number, z: number, w: number): boolean;
    /**
     * Multiplies in place the current Vector4 by the given one.
     * @param otherVector vector to multiple with
     * @returns the updated Vector4.
     */
    multiplyInPlace(otherVector: Vector4): Vector4;
    /**
     * Returns a new Vector4 set with the multiplication result of the current Vector4 and the given one.
     * @param otherVector vector to multiple with
     * @returns resulting new vector
     */
    multiply(otherVector: Vector4): Vector4;
    /**
     * Updates the given vector "result" with the multiplication result of the current Vector4 and the given one.
     * @param otherVector vector to multiple with
     * @param result vector to store the result
     * @returns the current Vector4.
     */
    multiplyToRef(otherVector: Vector4, result: Vector4): Vector4;
    /**
     * Returns a new Vector4 set with the multiplication result of the given floats and the current Vector4 coordinates.
     * @param x x value multiply with
     * @param y y value multiply with
     * @param z z value multiply with
     * @param w w value multiply with
     * @returns resulting new vector
     */
    multiplyByFloats(x: number, y: number, z: number, w: number): Vector4;
    /**
     * Returns a new Vector4 set with the division result of the current Vector4 by the given one.
     * @param otherVector vector to devide with
     * @returns resulting new vector
     */
    divide(otherVector: Vector4): Vector4;
    /**
     * Updates the given vector "result" with the division result of the current Vector4 by the given one.
     * @param otherVector vector to devide with
     * @param result vector to store the result
     * @returns the current Vector4.
     */
    divideToRef(otherVector: Vector4, result: Vector4): Vector4;
    /**
     * Divides the current Vector3 coordinates by the given ones.
     * @param otherVector vector to devide with
     * @returns the updated Vector3.
     */
    divideInPlace(otherVector: Vector4): Vector4;
    /**
     * Updates the Vector4 coordinates with the minimum values between its own and the given vector ones
     * @param other defines the second operand
     * @returns the current updated Vector4
     */
    minimizeInPlace(other: Vector4): Vector4;
    /**
     * Updates the Vector4 coordinates with the maximum values between its own and the given vector ones
     * @param other defines the second operand
     * @returns the current updated Vector4
     */
    maximizeInPlace(other: Vector4): Vector4;
    /**
     * Gets a new Vector4 from current Vector4 floored values
     * @returns a new Vector4
     */
    floor(): Vector4;
    /**
     * Gets a new Vector4 from current Vector3 floored values
     * @returns a new Vector4
     */
    fract(): Vector4;
    /**
     * Returns the Vector4 length (float).
     * @returns the length
     */
    length(): number;
    /**
     * Returns the Vector4 squared length (float).
     * @returns the length squared
     */
    lengthSquared(): number;
    /**
     * Normalizes in place the Vector4.
     * @returns the updated Vector4.
     */
    normalize(): Vector4;
    /**
     * Returns a new Vector3 from the Vector4 (x, y, z) coordinates.
     * @returns this converted to a new vector3
     */
    toVector3(): Vector3;
    /**
     * Returns a new Vector4 copied from the current one.
     * @returns the new cloned vector
     */
    clone(): Vector4;
    /**
     * Updates the current Vector4 with the given one coordinates.
     * @param source the source vector to copy from
     * @returns the updated Vector4.
     */
    copyFrom(source: Vector4): Vector4;
    /**
     * Updates the current Vector4 coordinates with the given floats.
     * @param x float to copy from
     * @param y float to copy from
     * @param z float to copy from
     * @param w float to copy from
     * @returns the updated Vector4.
     */
    copyFromFloats(x: number, y: number, z: number, w: number): Vector4;
    /**
     * Updates the current Vector4 coordinates with the given floats.
     * @param x float to set from
     * @param y float to set from
     * @param z float to set from
     * @param w float to set from
     * @returns the updated Vector4.
     */
    set(x: number, y: number, z: number, w: number): Vector4;
    /**
     * Copies the given float to the current Vector3 coordinates
     * @param v defines the x, y, z and w coordinates of the operand
     * @returns the current updated Vector3
     */
    setAll(v: number): Vector4;
    /**
     * Returns a new Vector4 set from the starting index of the given array.
     * @param array the array to pull values from
     * @param offset the offset into the array to start at
     * @returns the new vector
     */
    static FromArray(array: number[], offset?: number): Vector4;
    /**
     * Updates the given vector "result" from the starting index of the given array.
     * @param array the array to pull values from
     * @param offset the offset into the array to start at
     * @param result the vector to store the result in
     */
    static FromArrayToRef(array: number[], offset: number, result: Vector4): void;
    /**
     * Updates the given vector "result" from the starting index of the given Float32Array.
     * @param array the array to pull values from
     * @param offset the offset into the array to start at
     * @param result the vector to store the result in
     */
    static FromFloatArrayToRef(array: number[], offset: number, result: Vector4): void;
    /**
     * Updates the given vector "result" coordinates from the given floats.
     * @param x float to set from
     * @param y float to set from
     * @param z float to set from
     * @param w float to set from
     * @param result the vector to the floats in
     */
    static FromFloatsToRef(x: number, y: number, z: number, w: number, result: Vector4): void;
    /**
     * Returns a new Vector4 set to (0.0, 0.0, 0.0, 0.0)
     * @returns the new vector
     */
    static Zero(): Vector4;
    /**
     * Returns a new Vector4 set to (1.0, 1.0, 1.0, 1.0)
     * @returns the new vector
     */
    static One(): Vector4;
    /**
     * Returns a new normalized Vector4 from the given one.
     * @param vector the vector to normalize
     * @returns the vector
     */
    static Normalize(vector: Vector4): Vector4;
    /**
     * Updates the given vector "result" from the normalization of the given one.
     * @param vector the vector to normalize
     * @param result the vector to store the result in
     */
    static NormalizeToRef(vector: Vector4, result: Vector4): void;
    /**
     * Returns a vector with the minimum values from the left and right vectors
     * @param left left vector to minimize
     * @param right right vector to minimize
     * @returns a new vector with the minimum of the left and right vector values
     */
    static Minimize(left: Vector4, right: Vector4): Vector4;
    /**
     * Returns a vector with the maximum values from the left and right vectors
     * @param left left vector to maximize
     * @param right right vector to maximize
     * @returns a new vector with the maximum of the left and right vector values
     */
    static Maximize(left: Vector4, right: Vector4): Vector4;
    /**
     * Returns the distance (float) between the vectors "value1" and "value2".
     * @param value1 value to calulate the distance between
     * @param value2 value to calulate the distance between
     * @return the distance between the two vectors
     */
    static Distance(value1: Vector4, value2: Vector4): number;
    /**
     * Returns the squared distance (float) between the vectors "value1" and "value2".
     * @param value1 value to calulate the distance between
     * @param value2 value to calulate the distance between
     * @return the distance between the two vectors squared
     */
    static DistanceSquared(value1: Vector4, value2: Vector4): number;
    /**
     * Returns a new Vector4 located at the center between the vectors "value1" and "value2".
     * @param value1 value to calulate the center between
     * @param value2 value to calulate the center between
     * @return the center between the two vectors
     */
    static Center(value1: Vector4, value2: Vector4): Vector4;
    /**
     * Gets the center of the vectors "value1" and "value2" and stores the result in the vector "ref"
     * @param value1 defines first vector
     * @param value2 defines second vector
     * @param ref defines third vector
     * @returns ref
     */
    static CenterToRef(value1: Vector4, value2: Vector4, ref: Vector4): Vector4;
    /**
     * Returns a new Vector4 set with the result of the normal transformation by the given matrix of the given vector.
     * This methods computes transformed normalized direction vectors only.
     * @param vector the vector to transform
     * @param transformation the transformation matrix to apply
     * @returns the new vector
     */
    static TransformNormal(vector: Vector4, transformation: Matrix): Vector4;
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given vector.
     * This methods computes transformed normalized direction vectors only.
     * @param vector the vector to transform
     * @param transformation the transformation matrix to apply
     * @param result the vector to store the result in
     */
    static TransformNormalToRef(vector: Vector4, transformation: Matrix, result: Vector4): void;
    /**
     * Sets the given vector "result" with the result of the normal transformation by the given matrix of the given floats (x, y, z, w).
     * This methods computes transformed normalized direction vectors only.
     * @param x value to transform
     * @param y value to transform
     * @param z value to transform
     * @param w value to transform
     * @param transformation the transformation matrix to apply
     * @param result the vector to store the results in
     */
    static TransformNormalFromFloatsToRef(x: number, y: number, z: number, w: number, transformation: Matrix, result: Vector4): void;
    /**
     * Creates a new Vector4 from a Vector3
     * @param source defines the source data
     * @param w defines the 4th component (default is 0)
     * @returns a new Vector4
     */
    static FromVector3(source: Vector3, w?: number): Vector4;
}
/**
 * Class used to store quaternion data
 * @see https://en.wikipedia.org/wiki/Quaternion
 * @see https://doc.babylonjs.com/features/position,_rotation,_scaling
 */
export declare class Quaternion {
    /** @hidden */
    _x: number;
    /** @hidden */
    _y: number;
    /** @hidden */
    _z: number;
    /** @hidden */
    _w: number;
    /** @hidden */
    _isDirty: boolean;
    /** Gets or sets the x coordinate */
    get x(): number;
    set x(value: number);
    /** Gets or sets the y coordinate */
    get y(): number;
    set y(value: number);
    /** Gets or sets the z coordinate */
    get z(): number;
    set z(value: number);
    /** Gets or sets the w coordinate */
    get w(): number;
    set w(value: number);
    /**
     * Creates a new Quaternion from the given floats
     * @param x defines the first component (0 by default)
     * @param y defines the second component (0 by default)
     * @param z defines the third component (0 by default)
     * @param w defines the fourth component (1.0 by default)
     */
    constructor(x?: number, y?: number, z?: number, w?: number);
    /**
     * Gets a string representation for the current quaternion
     * @returns a string with the Quaternion coordinates
     */
    toString(): string;
    /**
     * Gets the class name of the quaternion
     * @returns the string "Quaternion"
     */
    getClassName(): string;
    /**
     * Gets a hash code for this quaternion
     * @returns the quaternion hash code
     */
    getHashCode(): number;
    /**
     * Copy the quaternion to an array
     * @returns a new array populated with 4 elements from the quaternion coordinates
     */
    asArray(): number[];
    /**
     * Check if two quaternions are equals
     * @param otherQuaternion defines the second operand
     * @return true if the current quaternion and the given one coordinates are strictly equals
     */
    equals(otherQuaternion: Quaternion): boolean;
    /**
     * Gets a boolean if two quaternions are equals (using an epsilon value)
     * @param otherQuaternion defines the other quaternion
     * @param epsilon defines the minimal distance to consider equality
     * @returns true if the given quaternion coordinates are close to the current ones by a distance of epsilon.
     */
    equalsWithEpsilon(otherQuaternion: Quaternion, epsilon?: number): boolean;
    /**
     * Clone the current quaternion
     * @returns a new quaternion copied from the current one
     */
    clone(): Quaternion;
    /**
     * Copy a quaternion to the current one
     * @param other defines the other quaternion
     * @returns the updated current quaternion
     */
    copyFrom(other: Quaternion): Quaternion;
    /**
     * Updates the current quaternion with the given float coordinates
     * @param x defines the x coordinate
     * @param y defines the y coordinate
     * @param z defines the z coordinate
     * @param w defines the w coordinate
     * @returns the updated current quaternion
     */
    copyFromFloats(x: number, y: number, z: number, w: number): Quaternion;
    /**
     * Updates the current quaternion from the given float coordinates
     * @param x defines the x coordinate
     * @param y defines the y coordinate
     * @param z defines the z coordinate
     * @param w defines the w coordinate
     * @returns the updated current quaternion
     */
    set(x: number, y: number, z: number, w: number): Quaternion;
    /**
     * Adds two quaternions
     * @param other defines the second operand
     * @returns a new quaternion as the addition result of the given one and the current quaternion
     */
    add(other: Quaternion): Quaternion;
    /**
     * Add a quaternion to the current one
     * @param other defines the quaternion to add
     * @returns the current quaternion
     */
    addInPlace(other: Quaternion): Quaternion;
    /**
     * Subtract two quaternions
     * @param other defines the second operand
     * @returns a new quaternion as the subtraction result of the given one from the current one
     */
    subtract(other: Quaternion): Quaternion;
    /**
     * Multiplies the current quaternion by a scale factor
     * @param value defines the scale factor
     * @returns a new quaternion set by multiplying the current quaternion coordinates by the float "scale"
     */
    scale(value: number): Quaternion;
    /**
     * Scale the current quaternion values by a factor and stores the result to a given quaternion
     * @param scale defines the scale factor
     * @param result defines the Quaternion object where to store the result
     * @returns the unmodified current quaternion
     */
    scaleToRef(scale: number, result: Quaternion): Quaternion;
    /**
     * Multiplies in place the current quaternion by a scale factor
     * @param value defines the scale factor
     * @returns the current modified quaternion
     */
    scaleInPlace(value: number): Quaternion;
    /**
     * Scale the current quaternion values by a factor and add the result to a given quaternion
     * @param scale defines the scale factor
     * @param result defines the Quaternion object where to store the result
     * @returns the unmodified current quaternion
     */
    scaleAndAddToRef(scale: number, result: Quaternion): Quaternion;
    /**
     * Multiplies two quaternions
     * @param q1 defines the second operand
     * @returns a new quaternion set as the multiplication result of the current one with the given one "q1"
     */
    multiply(q1: Quaternion): Quaternion;
    /**
     * Sets the given "result" as the the multiplication result of the current one with the given one "q1"
     * @param q1 defines the second operand
     * @param result defines the target quaternion
     * @returns the current quaternion
     */
    multiplyToRef(q1: Quaternion, result: Quaternion): Quaternion;
    /**
     * Updates the current quaternion with the multiplication of itself with the given one "q1"
     * @param q1 defines the second operand
     * @returns the currentupdated quaternion
     */
    multiplyInPlace(q1: Quaternion): Quaternion;
    /**
     * Conjugates (1-q) the current quaternion and stores the result in the given quaternion
     * @param ref defines the target quaternion
     * @returns the current quaternion
     */
    conjugateToRef(ref: Quaternion): Quaternion;
    /**
     * Conjugates in place (1-q) the current quaternion
     * @returns the current updated quaternion
     */
    conjugateInPlace(): Quaternion;
    /**
     * Conjugates in place (1-q) the current quaternion
     * @returns a new quaternion
     */
    conjugate(): Quaternion;
    /**
     * Gets length of current quaternion
     * @returns the quaternion length (float)
     */
    length(): number;
    /**
     * Normalize in place the current quaternion
     * @returns the current updated quaternion
     */
    normalize(): Quaternion;
    /**
     * Returns a new Vector3 set with the Euler angles translated from the current quaternion
     * @param order is a reserved parameter and is ignored for now
     * @returns a new Vector3 containing the Euler angles
     */
    toEulerAngles(order?: string): Vector3;
    /**
     * Sets the given vector3 "result" with the Euler angles translated from the current quaternion
     * @param result defines the vector which will be filled with the Euler angles
     * @returns the current unchanged quaternion
     */
    toEulerAnglesToRef(result: Vector3): Quaternion;
    /**
     * Updates the given rotation matrix with the current quaternion values
     * @param result defines the target matrix
     * @returns the current unchanged quaternion
     */
    toRotationMatrix(result: Matrix): Quaternion;
    /**
     * Updates the current quaternion from the given rotation matrix values
     * @param matrix defines the source matrix
     * @returns the current updated quaternion
     */
    fromRotationMatrix(matrix: Matrix): Quaternion;
    /**
     * Creates a new quaternion from a rotation matrix
     * @param matrix defines the source matrix
     * @returns a new quaternion created from the given rotation matrix values
     */
    static FromRotationMatrix(matrix: Matrix): Quaternion;
    /**
     * Updates the given quaternion with the given rotation matrix values
     * @param matrix defines the source matrix
     * @param result defines the target quaternion
     */
    static FromRotationMatrixToRef(matrix: Matrix, result: Quaternion): void;
    /**
     * Returns the dot product (float) between the quaternions "left" and "right"
     * @param left defines the left operand
     * @param right defines the right operand
     * @returns the dot product
     */
    static Dot(left: Quaternion, right: Quaternion): number;
    /**
     * Checks if the two quaternions are close to each other
     * @param quat0 defines the first quaternion to check
     * @param quat1 defines the second quaternion to check
     * @returns true if the two quaternions are close to each other
     */
    static AreClose(quat0: Quaternion, quat1: Quaternion): boolean;
    /**
     * Creates an empty quaternion
     * @returns a new quaternion set to (0.0, 0.0, 0.0)
     */
    static Zero(): Quaternion;
    /**
     * Inverse a given quaternion
     * @param q defines the source quaternion
     * @returns a new quaternion as the inverted current quaternion
     */
    static Inverse(q: Quaternion): Quaternion;
    /**
     * Inverse a given quaternion
     * @param q defines the source quaternion
     * @param result the quaternion the result will be stored in
     * @returns the result quaternion
     */
    static InverseToRef(q: Quaternion, result: Quaternion): Quaternion;
    /**
     * Creates an identity quaternion
     * @returns the identity quaternion
     */
    static Identity(): Quaternion;
    /**
     * Gets a boolean indicating if the given quaternion is identity
     * @param quaternion defines the quaternion to check
     * @returns true if the quaternion is identity
     */
    static IsIdentity(quaternion: Quaternion): boolean;
    /**
     * Creates a quaternion from a rotation around an axis
     * @param axis defines the axis to use
     * @param angle defines the angle to use
     * @returns a new quaternion created from the given axis (Vector3) and angle in radians (float)
     */
    static RotationAxis(axis: Vector3, angle: number): Quaternion;
    /**
     * Creates a rotation around an axis and stores it into the given quaternion
     * @param axis defines the axis to use
     * @param angle defines the angle to use
     * @param result defines the target quaternion
     * @returns the target quaternion
     */
    static RotationAxisToRef(axis: Vector3, angle: number, result: Quaternion): Quaternion;
    /**
     * Creates a new quaternion from data stored into an array
     * @param array defines the data source
     * @param offset defines the offset in the source array where the data starts
     * @returns a new quaternion
     */
    static FromArray(array: number[], offset?: number): Quaternion;
    /**
     * Updates the given quaternion "result" from the starting index of the given array.
     * @param array the array to pull values from
     * @param offset the offset into the array to start at
     * @param result the quaternion to store the result in
     */
    static FromArrayToRef(array: number[], offset: number, result: Quaternion): void;
    /**
     * Create a quaternion from Euler rotation angles
     * @param x Pitch
     * @param y Yaw
     * @param z Roll
     * @returns the new Quaternion
     */
    static FromEulerAngles(x: number, y: number, z: number): Quaternion;
    /**
     * Updates a quaternion from Euler rotation angles
     * @param x Pitch
     * @param y Yaw
     * @param z Roll
     * @param result the quaternion to store the result
     * @returns the updated quaternion
     */
    static FromEulerAnglesToRef(x: number, y: number, z: number, result: Quaternion): Quaternion;
    /**
     * Create a quaternion from Euler rotation vector
     * @param vec the Euler vector (x Pitch, y Yaw, z Roll)
     * @returns the new Quaternion
     */
    static FromEulerVector(vec: Vector3): Quaternion;
    /**
     * Updates a quaternion from Euler rotation vector
     * @param vec the Euler vector (x Pitch, y Yaw, z Roll)
     * @param result the quaternion to store the result
     * @returns the updated quaternion
     */
    static FromEulerVectorToRef(vec: Vector3, result: Quaternion): Quaternion;
    /**
     * Creates a new quaternion from the given Euler float angles (y, x, z)
     * @param yaw defines the rotation around Y axis
     * @param pitch defines the rotation around X axis
     * @param roll defines the rotation around Z axis
     * @returns the new quaternion
     */
    static RotationYawPitchRoll(yaw: number, pitch: number, roll: number): Quaternion;
    /**
     * Creates a new rotation from the given Euler float angles (y, x, z) and stores it in the target quaternion
     * @param yaw defines the rotation around Y axis
     * @param pitch defines the rotation around X axis
     * @param roll defines the rotation around Z axis
     * @param result defines the target quaternion
     */
    static RotationYawPitchRollToRef(yaw: number, pitch: number, roll: number, result: Quaternion): void;
    /**
     * Creates a new quaternion from the given Euler float angles expressed in z-x-z orientation
     * @param alpha defines the rotation around first axis
     * @param beta defines the rotation around second axis
     * @param gamma defines the rotation around third axis
     * @returns the new quaternion
     */
    static RotationAlphaBetaGamma(alpha: number, beta: number, gamma: number): Quaternion;
    /**
     * Creates a new quaternion from the given Euler float angles expressed in z-x-z orientation and stores it in the target quaternion
     * @param alpha defines the rotation around first axis
     * @param beta defines the rotation around second axis
     * @param gamma defines the rotation around third axis
     * @param result defines the target quaternion
     */
    static RotationAlphaBetaGammaToRef(alpha: number, beta: number, gamma: number, result: Quaternion): void;
    /**
     * Creates a new quaternion containing the rotation value to reach the target (axis1, axis2, axis3) orientation as a rotated XYZ system (axis1, axis2 and axis3 are normalized during this operation)
     * @param axis1 defines the first axis
     * @param axis2 defines the second axis
     * @param axis3 defines the third axis
     * @returns the new quaternion
     */
    static RotationQuaternionFromAxis(axis1: Vector3, axis2: Vector3, axis3: Vector3): Quaternion;
    /**
     * Creates a rotation value to reach the target (axis1, axis2, axis3) orientation as a rotated XYZ system (axis1, axis2 and axis3 are normalized during this operation) and stores it in the target quaternion
     * @param axis1 defines the first axis
     * @param axis2 defines the second axis
     * @param axis3 defines the third axis
     * @param ref defines the target quaternion
     */
    static RotationQuaternionFromAxisToRef(axis1: Vector3, axis2: Vector3, axis3: Vector3, ref: Quaternion): void;
    /**
     * Interpolates between two quaternions
     * @param left defines first quaternion
     * @param right defines second quaternion
     * @param amount defines the gradient to use
     * @returns the new interpolated quaternion
     */
    static Slerp(left: Quaternion, right: Quaternion, amount: number): Quaternion;
    /**
     * Interpolates between two quaternions and stores it into a target quaternion
     * @param left defines first quaternion
     * @param right defines second quaternion
     * @param amount defines the gradient to use
     * @param result defines the target quaternion
     */
    static SlerpToRef(left: Quaternion, right: Quaternion, amount: number, result: Quaternion): void;
    /**
     * Interpolate between two quaternions using Hermite interpolation
     * @param value1 defines first quaternion
     * @param tangent1 defines the incoming tangent
     * @param value2 defines second quaternion
     * @param tangent2 defines the outgoing tangent
     * @param amount defines the target quaternion
     * @returns the new interpolated quaternion
     */
    static Hermite(value1: Quaternion, tangent1: Quaternion, value2: Quaternion, tangent2: Quaternion, amount: number): Quaternion;
}
/**
 * Class used to store matrix data (4x4)
 */
export declare class Matrix {
    private static _updateFlagSeed;
    private static _identityReadOnly;
    private _isIdentity;
    private _isIdentityDirty;
    private _isIdentity3x2;
    private _isIdentity3x2Dirty;
    /**
     * Gets the update flag of the matrix which is an unique number for the matrix.
     * It will be incremented every time the matrix data change.
     * You can use it to speed the comparison between two versions of the same matrix.
     */
    updateFlag: number;
    private readonly _m;
    /**
     * Gets the internal data of the matrix
     */
    get m(): number[];
    /** @hidden */
    _markAsUpdated(): void;
    /** @hidden */
    private _updateIdentityStatus;
    /**
     * Creates an empty matrix (filled with zeros)
     */
    constructor();
    /**
     * Check if the current matrix is identity
     * @returns true is the matrix is the identity matrix
     */
    isIdentity(): boolean;
    /**
     * Check if the current matrix is identity as a texture matrix (3x2 store in 4x4)
     * @returns true is the matrix is the identity matrix
     */
    isIdentityAs3x2(): boolean;
    /**
     * Gets the determinant of the matrix
     * @returns the matrix determinant
     */
    determinant(): number;
    /**
     * Returns the matrix as a Float32Array or Array<number>
     * @returns the matrix underlying array
     */
    toArray(): number[];
    /**
     * Returns the matrix as a Float32Array or Array<number>
    * @returns the matrix underlying array.
    */
    asArray(): number[];
    /**
     * Inverts the current matrix in place
     * @returns the current inverted matrix
     */
    invert(): Matrix;
    /**
     * Sets all the matrix elements to zero
     * @returns the current matrix
     */
    reset(): Matrix;
    /**
     * Adds the current matrix with a second one
     * @param other defines the matrix to add
     * @returns a new matrix as the addition of the current matrix and the given one
     */
    add(other: Matrix): Matrix;
    /**
     * Sets the given matrix "result" to the addition of the current matrix and the given one
     * @param other defines the matrix to add
     * @param result defines the target matrix
     * @returns the current matrix
     */
    addToRef(other: Matrix, result: Matrix): Matrix;
    /**
     * Adds in place the given matrix to the current matrix
     * @param other defines the second operand
     * @returns the current updated matrix
     */
    addToSelf(other: Matrix): Matrix;
    /**
     * Sets the given matrix to the current inverted Matrix
     * @param other defines the target matrix
     * @returns the unmodified current matrix
     */
    invertToRef(other: Matrix): Matrix;
    /**
     * add a value at the specified position in the current Matrix
     * @param index the index of the value within the matrix. between 0 and 15.
     * @param value the value to be added
     * @returns the current updated matrix
     */
    addAtIndex(index: number, value: number): Matrix;
    /**
     * mutiply the specified position in the current Matrix by a value
     * @param index the index of the value within the matrix. between 0 and 15.
     * @param value the value to be added
     * @returns the current updated matrix
     */
    multiplyAtIndex(index: number, value: number): Matrix;
    /**
     * Inserts the translation vector (using 3 floats) in the current matrix
     * @param x defines the 1st component of the translation
     * @param y defines the 2nd component of the translation
     * @param z defines the 3rd component of the translation
     * @returns the current updated matrix
     */
    setTranslationFromFloats(x: number, y: number, z: number): Matrix;
    /**
     * Adds the translation vector (using 3 floats) in the current matrix
     * @param x defines the 1st component of the translation
     * @param y defines the 2nd component of the translation
     * @param z defines the 3rd component of the translation
     * @returns the current updated matrix
     */
    addTranslationFromFloats(x: number, y: number, z: number): Matrix;
    /**
     * Inserts the translation vector in the current matrix
     * @param vector3 defines the translation to insert
     * @returns the current updated matrix
     */
    setTranslation(vector3: Vector3): Matrix;
    /**
     * Gets the translation value of the current matrix
     * @returns a new Vector3 as the extracted translation from the matrix
     */
    getTranslation(): Vector3;
    /**
     * Fill a Vector3 with the extracted translation from the matrix
     * @param result defines the Vector3 where to store the translation
     * @returns the current matrix
     */
    getTranslationToRef(result: Vector3): Matrix;
    /**
     * Remove rotation and scaling part from the matrix
     * @returns the updated matrix
     */
    removeRotationAndScaling(): Matrix;
    /**
     * Multiply two matrices
     * @param other defines the second operand
     * @returns a new matrix set with the multiplication result of the current Matrix and the given one
     */
    multiply(other: Matrix): Matrix;
    /**
     * Copy the current matrix from the given one
     * @param other defines the source matrix
     * @returns the current updated matrix
     */
    copyFrom(other: Matrix): Matrix;
    /**
     * Populates the given array from the starting index with the current matrix values
     * @param array defines the target array
     * @param offset defines the offset in the target array where to start storing values
     * @returns the current matrix
     */
    copyToArray(array: Float32Array | Array<number>, offset?: number): Matrix;
    /**
     * Sets the given matrix "result" with the multiplication result of the current Matrix and the given one
     * @param other defines the second operand
     * @param result defines the matrix where to store the multiplication
     * @returns the current matrix
     */
    multiplyToRef(other: Matrix, result: Matrix): Matrix;
    /**
     * Sets the Float32Array "result" from the given index "offset" with the multiplication of the current matrix and the given one
     * @param other defines the second operand
     * @param result defines the array where to store the multiplication
     * @param offset defines the offset in the target array where to start storing values
     * @returns the current matrix
     */
    multiplyToArray(other: Matrix, result: Float32Array | Array<number>, offset: number): Matrix;
    /**
     * Check equality between this matrix and a second one
     * @param value defines the second matrix to compare
     * @returns true is the current matrix and the given one values are strictly equal
     */
    equals(value: Matrix): boolean;
    /**
     * Clone the current matrix
     * @returns a new matrix from the current matrix
     */
    clone(): Matrix;
    /**
     * Returns the name of the current matrix class
     * @returns the string "Matrix"
     */
    getClassName(): string;
    /**
     * Gets the hash code of the current matrix
     * @returns the hash code
     */
    getHashCode(): number;
    /**
     * Decomposes the current Matrix into a translation, rotation and scaling components
     * @param scale defines the scale vector3 given as a reference to update
     * @param rotation defines the rotation quaternion given as a reference to update
     * @param translation defines the translation vector3 given as a reference to update
     * @returns true if operation was successful
     */
    decompose(scale?: Vector3, rotation?: Quaternion, translation?: Vector3): boolean;
    /**
     * Gets specific row of the matrix
     * @param index defines the number of the row to get
     * @returns the index-th row of the current matrix as a new Vector4
     */
    getRow(index: number): Vector4;
    /**
     * Sets the index-th row of the current matrix to the vector4 values
     * @param index defines the number of the row to set
     * @param row defines the target vector4
     * @returns the updated current matrix
     */
    setRow(index: number, row: Vector4): Matrix;
    /**
     * Compute the transpose of the matrix
     * @returns the new transposed matrix
     */
    transpose(): Matrix;
    /**
     * Compute the transpose of the matrix and store it in a given matrix
     * @param result defines the target matrix
     * @returns the current matrix
     */
    transposeToRef(result: Matrix): Matrix;
    /**
     * Sets the index-th row of the current matrix with the given 4 x float values
     * @param index defines the row index
     * @param x defines the x component to set
     * @param y defines the y component to set
     * @param z defines the z component to set
     * @param w defines the w component to set
     * @returns the updated current matrix
     */
    setRowFromFloats(index: number, x: number, y: number, z: number, w: number): Matrix;
    /**
     * Compute a new matrix set with the current matrix values multiplied by scale (float)
     * @param scale defines the scale factor
     * @returns a new matrix
     */
    scale(scale: number): Matrix;
    /**
     * Scale the current matrix values by a factor to a given result matrix
     * @param scale defines the scale factor
     * @param result defines the matrix to store the result
     * @returns the current matrix
     */
    scaleToRef(scale: number, result: Matrix): Matrix;
    /**
     * Scale the current matrix values by a factor and add the result to a given matrix
     * @param scale defines the scale factor
     * @param result defines the Matrix to store the result
     * @returns the current matrix
     */
    scaleAndAddToRef(scale: number, result: Matrix): Matrix;
    /**
     * Writes to the given matrix a normal matrix, computed from this one (using values from identity matrix for fourth row and column).
     * @param ref matrix to store the result
     */
    toNormalMatrix(ref: Matrix): void;
    /**
     * Gets only rotation part of the current matrix
     * @returns a new matrix sets to the extracted rotation matrix from the current one
     */
    getRotationMatrix(): Matrix;
    /**
     * Extracts the rotation matrix from the current one and sets it as the given "result"
     * @param result defines the target matrix to store data to
     * @returns the current matrix
     */
    getRotationMatrixToRef(result: Matrix): Matrix;
    /**
     * Toggles model matrix from being right handed to left handed in place and vice versa
     */
    toggleModelMatrixHandInPlace(): void;
    /**
     * Toggles projection matrix from being right handed to left handed in place and vice versa
     */
    toggleProjectionMatrixHandInPlace(): void;
    /**
     * Creates a matrix from an array
     * @param array defines the source array
     * @param offset defines an offset in the source array
     * @returns a new Matrix set from the starting index of the given array
     */
    static FromArray(array: number[], offset?: number): Matrix;
    /**
     * Copy the content of an array into a given matrix
     * @param array defines the source array
     * @param offset defines an offset in the source array
     * @param result defines the target matrix
     */
    static FromArrayToRef(array: number[], offset: number, result: Matrix): void;
    /**
     * Stores an array into a matrix after having multiplied each component by a given factor
     * @param array defines the source array
     * @param offset defines the offset in the source array
     * @param scale defines the scaling factor
     * @param result defines the target matrix
     */
    static FromFloat32ArrayToRefScaled(array: number[], offset: number, scale: number, result: Matrix): void;
    /**
     * Gets an identity matrix that must not be updated
     */
    static get IdentityReadOnly(): Matrix;
    /**
     * Stores a list of values (16) inside a given matrix
     * @param initialM11 defines 1st value of 1st row
     * @param initialM12 defines 2nd value of 1st row
     * @param initialM13 defines 3rd value of 1st row
     * @param initialM14 defines 4th value of 1st row
     * @param initialM21 defines 1st value of 2nd row
     * @param initialM22 defines 2nd value of 2nd row
     * @param initialM23 defines 3rd value of 2nd row
     * @param initialM24 defines 4th value of 2nd row
     * @param initialM31 defines 1st value of 3rd row
     * @param initialM32 defines 2nd value of 3rd row
     * @param initialM33 defines 3rd value of 3rd row
     * @param initialM34 defines 4th value of 3rd row
     * @param initialM41 defines 1st value of 4th row
     * @param initialM42 defines 2nd value of 4th row
     * @param initialM43 defines 3rd value of 4th row
     * @param initialM44 defines 4th value of 4th row
     * @param result defines the target matrix
     */
    static FromValuesToRef(initialM11: number, initialM12: number, initialM13: number, initialM14: number, initialM21: number, initialM22: number, initialM23: number, initialM24: number, initialM31: number, initialM32: number, initialM33: number, initialM34: number, initialM41: number, initialM42: number, initialM43: number, initialM44: number, result: Matrix): void;
    /**
     * Creates new matrix from a list of values (16)
     * @param initialM11 defines 1st value of 1st row
     * @param initialM12 defines 2nd value of 1st row
     * @param initialM13 defines 3rd value of 1st row
     * @param initialM14 defines 4th value of 1st row
     * @param initialM21 defines 1st value of 2nd row
     * @param initialM22 defines 2nd value of 2nd row
     * @param initialM23 defines 3rd value of 2nd row
     * @param initialM24 defines 4th value of 2nd row
     * @param initialM31 defines 1st value of 3rd row
     * @param initialM32 defines 2nd value of 3rd row
     * @param initialM33 defines 3rd value of 3rd row
     * @param initialM34 defines 4th value of 3rd row
     * @param initialM41 defines 1st value of 4th row
     * @param initialM42 defines 2nd value of 4th row
     * @param initialM43 defines 3rd value of 4th row
     * @param initialM44 defines 4th value of 4th row
     * @returns the new matrix
     */
    static FromValues(initialM11: number, initialM12: number, initialM13: number, initialM14: number, initialM21: number, initialM22: number, initialM23: number, initialM24: number, initialM31: number, initialM32: number, initialM33: number, initialM34: number, initialM41: number, initialM42: number, initialM43: number, initialM44: number): Matrix;
    /**
     * Creates a new matrix composed by merging scale (vector3), rotation (quaternion) and translation (vector3)
     * @param scale defines the scale vector3
     * @param rotation defines the rotation quaternion
     * @param translation defines the translation vector3
     * @returns a new matrix
     */
    static Compose(scale: Vector3, rotation: Quaternion, translation: Vector3): Matrix;
    /**
     * Sets a matrix to a value composed by merging scale (vector3), rotation (quaternion) and translation (vector3)
     * @param scale defines the scale vector3
     * @param rotation defines the rotation quaternion
     * @param translation defines the translation vector3
     * @param result defines the target matrix
     */
    static ComposeToRef(scale: Vector3, rotation: Quaternion, translation: Vector3, result: Matrix): void;
    /**
     * Creates a new identity matrix
     * @returns a new identity matrix
     */
    static Identity(): Matrix;
    /**
     * Creates a new identity matrix and stores the result in a given matrix
     * @param result defines the target matrix
     */
    static IdentityToRef(result: Matrix): void;
    /**
     * Creates a new zero matrix
     * @returns a new zero matrix
     */
    static Zero(): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the X axis
     * @param angle defines the angle (in radians) to use
     * @return the new matrix
     */
    static RotationX(angle: number): Matrix;
    /**
     * Creates a new matrix as the invert of a given matrix
     * @param source defines the source matrix
     * @returns the new matrix
     */
    static Invert(source: Matrix): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the X axis and stores it in a given matrix
     * @param angle defines the angle (in radians) to use
     * @param result defines the target matrix
     */
    static RotationXToRef(angle: number, result: Matrix): void;
    /**
     * Creates a new rotation matrix for "angle" radians around the Y axis
     * @param angle defines the angle (in radians) to use
     * @return the new matrix
     */
    static RotationY(angle: number): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the Y axis and stores it in a given matrix
     * @param angle defines the angle (in radians) to use
     * @param result defines the target matrix
     */
    static RotationYToRef(angle: number, result: Matrix): void;
    /**
     * Creates a new rotation matrix for "angle" radians around the Z axis
     * @param angle defines the angle (in radians) to use
     * @return the new matrix
     */
    static RotationZ(angle: number): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the Z axis and stores it in a given matrix
     * @param angle defines the angle (in radians) to use
     * @param result defines the target matrix
     */
    static RotationZToRef(angle: number, result: Matrix): void;
    /**
     * Creates a new rotation matrix for "angle" radians around the given axis
     * @param axis defines the axis to use
     * @param angle defines the angle (in radians) to use
     * @return the new matrix
     */
    static RotationAxis(axis: Vector3, angle: number): Matrix;
    /**
     * Creates a new rotation matrix for "angle" radians around the given axis and stores it in a given matrix
     * @param axis defines the axis to use
     * @param angle defines the angle (in radians) to use
     * @param result defines the target matrix
     */
    static RotationAxisToRef(axis: Vector3, angle: number, result: Matrix): void;
    /**
     * Takes normalised vectors and returns a rotation matrix to align "from" with "to".
     * Taken from http://www.iquilezles.org/www/articles/noacos/noacos.htm
     * @param from defines the vector to align
     * @param to defines the vector to align to
     * @param result defines the target matrix
     */
    static RotationAlignToRef(from: Vector3, to: Vector3, result: Matrix): void;
    /**
     * Creates a rotation matrix
     * @param yaw defines the yaw angle in radians (Y axis)
     * @param pitch defines the pitch angle in radians (X axis)
     * @param roll defines the roll angle in radians (Z axis)
     * @returns the new rotation matrix
     */
    static RotationYawPitchRoll(yaw: number, pitch: number, roll: number): Matrix;
    /**
     * Creates a rotation matrix and stores it in a given matrix
     * @param yaw defines the yaw angle in radians (Y axis)
     * @param pitch defines the pitch angle in radians (X axis)
     * @param roll defines the roll angle in radians (Z axis)
     * @param result defines the target matrix
     */
    static RotationYawPitchRollToRef(yaw: number, pitch: number, roll: number, result: Matrix): void;
    /**
     * Creates a scaling matrix
     * @param x defines the scale factor on X axis
     * @param y defines the scale factor on Y axis
     * @param z defines the scale factor on Z axis
     * @returns the new matrix
     */
    static Scaling(x: number, y: number, z: number): Matrix;
    /**
     * Creates a scaling matrix and stores it in a given matrix
     * @param x defines the scale factor on X axis
     * @param y defines the scale factor on Y axis
     * @param z defines the scale factor on Z axis
     * @param result defines the target matrix
     */
    static ScalingToRef(x: number, y: number, z: number, result: Matrix): void;
    /**
     * Creates a translation matrix
     * @param x defines the translation on X axis
     * @param y defines the translation on Y axis
     * @param z defines the translationon Z axis
     * @returns the new matrix
     */
    static Translation(x: number, y: number, z: number): Matrix;
    /**
     * Creates a translation matrix and stores it in a given matrix
     * @param x defines the translation on X axis
     * @param y defines the translation on Y axis
     * @param z defines the translationon Z axis
     * @param result defines the target matrix
     */
    static TranslationToRef(x: number, y: number, z: number, result: Matrix): void;
    /**
     * Returns a new Matrix whose values are the interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue".
     * @param startValue defines the start value
     * @param endValue defines the end value
     * @param gradient defines the gradient factor
     * @returns the new matrix
     */
    static Lerp(startValue: Matrix, endValue: Matrix, gradient: number): Matrix;
    /**
     * Set the given matrix "result" as the interpolated values for "gradient" (float) between the ones of the matrices "startValue" and "endValue".
     * @param startValue defines the start value
     * @param endValue defines the end value
     * @param gradient defines the gradient factor
     * @param result defines the Matrix object where to store data
     */
    static LerpToRef(startValue: Matrix, endValue: Matrix, gradient: number, result: Matrix): void;
    /**
     * Builds a new matrix whose values are computed by:
     * * decomposing the the "startValue" and "endValue" matrices into their respective scale, rotation and translation matrices
     * * interpolating for "gradient" (float) the values between each of these decomposed matrices between the start and the end
     * * recomposing a new matrix from these 3 interpolated scale, rotation and translation matrices
     * @param startValue defines the first matrix
     * @param endValue defines the second matrix
     * @param gradient defines the gradient between the two matrices
     * @returns the new matrix
     */
    static DecomposeLerp(startValue: Matrix, endValue: Matrix, gradient: number): Matrix;
    /**
     * Update a matrix to values which are computed by:
     * * decomposing the the "startValue" and "endValue" matrices into their respective scale, rotation and translation matrices
     * * interpolating for "gradient" (float) the values between each of these decomposed matrices between the start and the end
     * * recomposing a new matrix from these 3 interpolated scale, rotation and translation matrices
     * @param startValue defines the first matrix
     * @param endValue defines the second matrix
     * @param gradient defines the gradient between the two matrices
     * @param result defines the target matrix
     */
    static DecomposeLerpToRef(startValue: Matrix, endValue: Matrix, gradient: number, result: Matrix): void;
    /**
     * Gets a new rotation matrix used to rotate an entity so as it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up"
     * This function works in left handed mode
     * @param eye defines the final position of the entity
     * @param target defines where the entity should look at
     * @param up defines the up vector for the entity
     * @returns the new matrix
     */
    static LookAtLH(eye: Vector3, target: Vector3, up: Vector3): Matrix;
    /**
     * Sets the given "result" Matrix to a rotation matrix used to rotate an entity so that it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up".
     * This function works in left handed mode
     * @param eye defines the final position of the entity
     * @param target defines where the entity should look at
     * @param up defines the up vector for the entity
     * @param result defines the target matrix
     */
    static LookAtLHToRef(eye: Vector3, target: Vector3, up: Vector3, result: Matrix): void;
    /**
     * Gets a new rotation matrix used to rotate an entity so as it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up"
     * This function works in right handed mode
     * @param eye defines the final position of the entity
     * @param target defines where the entity should look at
     * @param up defines the up vector for the entity
     * @returns the new matrix
     */
    static LookAtRH(eye: Vector3, target: Vector3, up: Vector3): Matrix;
    /**
     * Sets the given "result" Matrix to a rotation matrix used to rotate an entity so that it looks at the target vector3, from the eye vector3 position, the up vector3 being oriented like "up".
     * This function works in right handed mode
     * @param eye defines the final position of the entity
     * @param target defines where the entity should look at
     * @param up defines the up vector for the entity
     * @param result defines the target matrix
     */
    static LookAtRHToRef(eye: Vector3, target: Vector3, up: Vector3, result: Matrix): void;
    /**
     * Create a left-handed orthographic projection matrix
     * @param width defines the viewport width
     * @param height defines the viewport height
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @returns a new matrix as a left-handed orthographic projection matrix
     */
    static OrthoLH(width: number, height: number, znear: number, zfar: number): Matrix;
    /**
     * Store a left-handed orthographic projection to a given matrix
     * @param width defines the viewport width
     * @param height defines the viewport height
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @param result defines the target matrix
     */
    static OrthoLHToRef(width: number, height: number, znear: number, zfar: number, result: Matrix): void;
    /**
     * Create a left-handed orthographic projection matrix
     * @param left defines the viewport left coordinate
     * @param right defines the viewport right coordinate
     * @param bottom defines the viewport bottom coordinate
     * @param top defines the viewport top coordinate
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @returns a new matrix as a left-handed orthographic projection matrix
     */
    static OrthoOffCenterLH(left: number, right: number, bottom: number, top: number, znear: number, zfar: number): Matrix;
    /**
     * Stores a left-handed orthographic projection into a given matrix
     * @param left defines the viewport left coordinate
     * @param right defines the viewport right coordinate
     * @param bottom defines the viewport bottom coordinate
     * @param top defines the viewport top coordinate
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @param result defines the target matrix
     */
    static OrthoOffCenterLHToRef(left: number, right: number, bottom: number, top: number, znear: number, zfar: number, result: Matrix): void;
    /**
     * Creates a right-handed orthographic projection matrix
     * @param left defines the viewport left coordinate
     * @param right defines the viewport right coordinate
     * @param bottom defines the viewport bottom coordinate
     * @param top defines the viewport top coordinate
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @returns a new matrix as a right-handed orthographic projection matrix
     */
    static OrthoOffCenterRH(left: number, right: number, bottom: number, top: number, znear: number, zfar: number): Matrix;
    /**
     * Stores a right-handed orthographic projection into a given matrix
     * @param left defines the viewport left coordinate
     * @param right defines the viewport right coordinate
     * @param bottom defines the viewport bottom coordinate
     * @param top defines the viewport top coordinate
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @param result defines the target matrix
     */
    static OrthoOffCenterRHToRef(left: number, right: number, bottom: number, top: number, znear: number, zfar: number, result: Matrix): void;
    /**
     * Creates a left-handed perspective projection matrix
     * @param width defines the viewport width
     * @param height defines the viewport height
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @returns a new matrix as a left-handed perspective projection matrix
     */
    static PerspectiveLH(width: number, height: number, znear: number, zfar: number): Matrix;
    /**
     * Creates a left-handed perspective projection matrix
     * @param fov defines the horizontal field of view
     * @param aspect defines the aspect ratio
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @returns a new matrix as a left-handed perspective projection matrix
     */
    static PerspectiveFovLH(fov: number, aspect: number, znear: number, zfar: number): Matrix;
    /**
     * Stores a left-handed perspective projection into a given matrix
     * @param fov defines the horizontal field of view
     * @param aspect defines the aspect ratio
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @param result defines the target matrix
     * @param isVerticalFovFixed defines it the fov is vertically fixed (default) or horizontally
     */
    static PerspectiveFovLHToRef(fov: number, aspect: number, znear: number, zfar: number, result: Matrix, isVerticalFovFixed?: boolean): void;
    /**
     * Stores a left-handed perspective projection into a given matrix with depth reversed
     * @param fov defines the horizontal field of view
     * @param aspect defines the aspect ratio
     * @param znear defines the near clip plane
     * @param zfar not used as infinity is used as far clip
     * @param result defines the target matrix
     * @param isVerticalFovFixed defines it the fov is vertically fixed (default) or horizontally
     */
    static PerspectiveFovReverseLHToRef(fov: number, aspect: number, znear: number, zfar: number, result: Matrix, isVerticalFovFixed?: boolean): void;
    /**
     * Creates a right-handed perspective projection matrix
     * @param fov defines the horizontal field of view
     * @param aspect defines the aspect ratio
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @returns a new matrix as a right-handed perspective projection matrix
     */
    static PerspectiveFovRH(fov: number, aspect: number, znear: number, zfar: number): Matrix;
    /**
     * Stores a right-handed perspective projection into a given matrix
     * @param fov defines the horizontal field of view
     * @param aspect defines the aspect ratio
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @param result defines the target matrix
     * @param isVerticalFovFixed defines it the fov is vertically fixed (default) or horizontally
     */
    static PerspectiveFovRHToRef(fov: number, aspect: number, znear: number, zfar: number, result: Matrix, isVerticalFovFixed?: boolean): void;
    /**
     * Stores a right-handed perspective projection into a given matrix
     * @param fov defines the horizontal field of view
     * @param aspect defines the aspect ratio
     * @param znear defines the near clip plane
     * @param zfar not used as infinity is used as far clip
     * @param result defines the target matrix
     * @param isVerticalFovFixed defines it the fov is vertically fixed (default) or horizontally
     */
    static PerspectiveFovReverseRHToRef(fov: number, aspect: number, znear: number, zfar: number, result: Matrix, isVerticalFovFixed?: boolean): void;
    /**
     * Stores a perspective projection for WebVR info a given matrix
     * @param fov defines the field of view
     * @param znear defines the near clip plane
     * @param zfar defines the far clip plane
     * @param result defines the target matrix
     * @param rightHanded defines if the matrix must be in right-handed mode (false by default)
     */
    static PerspectiveFovWebVRToRef(fov: {
        upDegrees: number;
        downDegrees: number;
        leftDegrees: number;
        rightDegrees: number;
    }, znear: number, zfar: number, result: Matrix, rightHanded?: boolean): void;
    /**
     * Computes a complete transformation matrix
     * @param viewport defines the viewport to use
     * @param world defines the world matrix
     * @param view defines the view matrix
     * @param projection defines the projection matrix
     * @param zmin defines the near clip plane
     * @param zmax defines the far clip plane
     * @returns the transformation matrix
     */
    static GetFinalMatrix(viewport: Viewport, world: Matrix, view: Matrix, projection: Matrix, zmin: number, zmax: number): Matrix;
    /**
     * Compute the transpose of a given matrix
     * @param matrix defines the matrix to transpose
     * @returns the new matrix
     */
    static Transpose(matrix: Matrix): Matrix;
    /**
     * Compute the transpose of a matrix and store it in a target matrix
     * @param matrix defines the matrix to transpose
     * @param result defines the target matrix
     */
    static TransposeToRef(matrix: Matrix, result: Matrix): void;
    /**
     * Sets the given matrix as a rotation matrix composed from the 3 left handed axes
     * @param xaxis defines the value of the 1st axis
     * @param yaxis defines the value of the 2nd axis
     * @param zaxis defines the value of the 3rd axis
     * @param result defines the target matrix
     */
    static FromXYZAxesToRef(xaxis: Vector3, yaxis: Vector3, zaxis: Vector3, result: Matrix): void;
    /**
     * Creates a rotation matrix from a quaternion and stores it in a target matrix
     * @param quat defines the quaternion to use
     * @param result defines the target matrix
     */
    static FromQuaternionToRef(quat: Quaternion, result: Matrix): void;
}
/**
 * Two pi constants convenient for computation.
 */
export declare const TwoPi: number;
/**
 * Boolean : true if the absolute difference between a and b is lower than epsilon (default = 1.401298E-45)
 * @param a number
 * @param b number
 * @param epsilon (default = 1.401298E-45)
 * @returns true if the absolute difference between a and b is lower than epsilon (default = 1.401298E-45)
 */
export declare function WithinEpsilon(a: number, b: number, epsilon?: number): boolean;
/**
 * Returns a string : the upper case translation of the number i to hexadecimal.
 * @param i number
 * @returns the upper case translation of the number i to hexadecimal.
 */
export declare function ToHex(i: number): string;
/**
 * Returns -1 if value is negative and +1 is value is positive.
 * @param value the value
 * @returns the value itself if it's equal to zero.
 */
export declare function Sign(value: number): number;
/**
 * Returns the value itself if it's between min and max.
 * Returns min if the value is lower than min.
 * Returns max if the value is greater than max.
 * @param value the value to clmap
 * @param min the min value to clamp to (default: 0)
 * @param max the max value to clamp to (default: 1)
 * @returns the clamped value
 */
export declare function Clamp(value: number, min?: number, max?: number): number;
/**
 * the log2 of value.
 * @param value the value to compute log2 of
 * @returns the log2 of value.
 */
export declare function Log2(value: number): number;
/**
* Loops the value, so that it is never larger than length and never smaller than 0.
*
* This is similar to the modulo operator but it works with floating point numbers.
* For example, using 3.0 for t and 2.5 for length, the result would be 0.5.
* With t = 5 and length = 2.5, the result would be 0.0.
* Note, however, that the behaviour is not defined for negative numbers as it is for the modulo operator
* @param value the value
* @param length the length
* @returns the looped value
*/
export declare function Repeat(value: number, length: number): number;
/**
 * Normalize the value between 0.0 and 1.0 using min and max values
 * @param value value to normalize
 * @param min max to normalize between
 * @param max min to normalize between
 * @returns the normalized value
 */
export declare function Normalize(value: number, min: number, max: number): number;
/**
* Denormalize the value from 0.0 and 1.0 using min and max values
* @param normalized value to denormalize
* @param min max to denormalize between
* @param max min to denormalize between
* @returns the denormalized value
*/
export declare function Denormalize(normalized: number, min: number, max: number): number;
/**
* Calculates the shortest difference between two given angles given in degrees.
* @param current current angle in degrees
* @param target target angle in degrees
* @returns the delta
*/
export declare function DeltaAngle(current: number, target: number): number;
/**
* PingPongs the value t, so that it is never larger than length and never smaller than 0.
* @param tx value
* @param length length
* @returns The returned value will move back and forth between 0 and length
*/
export declare function PingPong(tx: number, length: number): number;
/**
* Interpolates between min and max with smoothing at the limits.
*
* This function interpolates between min and max in a similar way to Lerp. However, the interpolation will gradually speed up
* from the start and slow down toward the end. This is useful for creating natural-looking animation, fading and other transitions.
* @param from from
* @param to to
* @param tx value
* @returns the smooth stepped value
*/
export declare function SmoothStep(from: number, to: number, tx: number): number;
/**
* Moves a value current towards target.
*
* This is essentially the same as Mathf.Lerp but instead the function will ensure that the speed never exceeds maxDelta.
* Negative values of maxDelta pushes the value away from target.
* @param current current value
* @param target target value
* @param maxDelta max distance to move
* @returns resulting value
*/
export declare function MoveTowards(current: number, target: number, maxDelta: number): number;
/**
* Same as MoveTowards but makes sure the values interpolate correctly when they wrap around 360 degrees.
*
* Variables current and target are assumed to be in degrees. For optimization reasons, negative values of maxDelta
*  are not supported and may cause oscillation. To push current away from a target angle, add 180 to that angle instead.
* @param current current value
* @param target target value
* @param maxDelta max distance to move
* @returns resulting angle
*/
export declare function MoveTowardsAngle(current: number, target: number, maxDelta: number): number;
/**
 * Creates a new scalar with values linearly interpolated of "amount" between the start scalar and the end scalar.
 * @param start start value
 * @param end target value
 * @param amount amount to lerp between
 * @returns the lerped value
 */
export declare function Lerp(start: number, end: number, amount: number): number;
/**
* Same as Lerp but makes sure the values interpolate correctly when they wrap around 360 degrees.
* The parameter t is clamped to the range [0, 1]. Variables a and b are assumed to be in degrees.
* @param start start value
* @param end target value
* @param amount amount to lerp between
* @returns the lerped value
*/
export declare function LerpAngle(start: number, end: number, amount: number): number;
/**
* Calculates the linear parameter t that produces the interpolant value within the range [a, b].
* @param a start value
* @param b target value
* @param value value between a and b
* @returns the inverseLerp value
*/
export declare function InverseLerp(a: number, b: number, value: number): number;
/**
 * Returns a new scalar located for "amount" (float) on the Hermite spline defined by the scalars "value1", "value3", "tangent1", "tangent2".
 * @see http://mathworld.wolfram.com/HermitePolynomial.html
 * @param value1 spline value
 * @param tangent1 spline value
 * @param value2 spline value
 * @param tangent2 spline value
 * @param amount input value
 * @returns hermite result
 */
export declare function Hermite(value1: number, tangent1: number, value2: number, tangent2: number, amount: number): number;
/**
* Returns a random float number between and min and max values
* @param min min value of random
* @param max max value of random
* @returns random value
*/
export declare function RandomRange(min: number, max: number): number;
/**
* This function returns percentage of a number in a given range.
*
* RangeToPercent(40,20,60) will return 0.5 (50%)
* RangeToPercent(34,0,100) will return 0.34 (34%)
* @param number to convert to percentage
* @param min min range
* @param max max range
* @returns the percentage
*/
export declare function RangeToPercent(number: number, min: number, max: number): number;
/**
* This function returns number that corresponds to the percentage in a given range.
*
* PercentToRange(0.34,0,100) will return 34.
* @param percent to convert to number
* @param min min range
* @param max max range
* @returns the number
*/
export declare function PercentToRange(percent: number, min: number, max: number): number;
/**
 * Returns the angle converted to equivalent value between -Math.PI and Math.PI radians.
 * @param angle The angle to normalize in radian.
 * @return The converted angle.
 */
export declare function NormalizeRadians(angle: number): number;
/**
 * Returns an array of the given size filled with element built from the given constructor and the paramters
 * @param size the number of element to construct and put in the array
 * @param itemBuilder a callback responsible for creating new instance of item. Called once per array entry.
 * @returns a new array filled with new objects
 */
export declare function BuildArray<T>(size: number, itemBuilder: () => T): Array<T>;
export declare class Viewport {
    /** viewport left coordinate */
    x: number;
    /** viewport top coordinate */
    y: number;
    /**viewport width */
    width: number;
    /** viewport height */
    height: number;
    /**
     * Creates a Viewport object located at (x, y) and sized (width, height)
     * @param x defines viewport left coordinate
     * @param y defines viewport top coordinate
     * @param width defines the viewport width
     * @param height defines the viewport height
     */
    constructor(
    /** viewport left coordinate */
    x: number, 
    /** viewport top coordinate */
    y: number, 
    /**viewport width */
    width: number, 
    /** viewport height */
    height: number);
}
