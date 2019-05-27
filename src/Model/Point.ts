export class Point {
    public X: number;
    public Y: number;

    /**
     * Constructs a Point. Will not accept NaNs.
     * @param x A number. Cannot be NaN.
     * @param y A number. Cannot be NaN.
     */
    public constructor(x: number, y: number) {
        if(Number.isNaN(x)) {
            throw new Error("x is NaN. Will not construct Point.");
        }
        if(Number.isNaN(y)) {
            throw new Error("y is NaN. Will not construct Point.");
        }
        this.X = x;
        this.Y = y;
    }

    public toString = () : string => {
        return "(" + this.X + "," + this.Y + ")";
    }

    /**
     * Constructs a Point from a string representation in the format (x,y). Will not accept NaNs.
     * @param vectorAsString A string in the format (x,y). Will not accept NaNs.
     */
    public static FromString(vectorAsString: string): Point {
        this.CheckChar('(', vectorAsString[0], vectorAsString);
        this.CheckChar(')', vectorAsString[vectorAsString.length - 1], vectorAsString);
        if(vectorAsString.indexOf(',') === -1) {
            throw new Error("vectorAsString is an invalid format. Cannot find ','. fullString: " + vectorAsString);
        }
        let splitStr = vectorAsString.substr(1, vectorAsString.length - 2).split(',');
        if(splitStr.length != 2) {
            throw new Error("vectorAsString is an invalid format. Expecting string in format (x,y). fullString: " + vectorAsString);
        }
        let x = parseInt(splitStr[0]);
        let y = parseInt(splitStr[1]);
        let v = new Point(x,y);
        return v;
    }

    private static CheckChar(expectedChar: string, actualChar: string, fullString: string)
    {
        if(actualChar != expectedChar) {
            throw new Error("vectorAsString is an invalid format. Expecting: '" + expectedChar + "'. Actual: '" + actualChar + "'. fullString: " + fullString);
        }
    }

    public equals(obj: Point): boolean {
        return this.X === obj.X && this.Y === obj.Y;
    }

    public Add(p: Point) {
        return new Point(this.X + p.X, this.Y + p.Y);
    }

    public Subtract(p: Point) {
        return new Point(this.X - p.X, this.Y - p.Y);
    }
}