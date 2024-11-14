
class gal 
{ 
    constructor() { } 
    static backslash(Count=1) 
    {
        return "\\".repeat(Count);
    }
    static file_append(filename, addtext)
    {
        gal.fs.appendFileSync(filename, addtext);
    }
    static file_exists(filename)
    {
        return gal.fs.existSync(filename);
    }
}
try
{
    gal.fs = require("fs");
    gal.file_reader = require("fs");
    gal.read_file = function(File_Name) 
    {
        gal.file_reader.readFileSync(File_Name, 'utf8');
    };
    gal.write_file = function(File_Name, File_Text) 
    {
        gal.file_reader.writeFileSunc(File_Name, File_Text);
    }
}
catch (error)
{
    gal.read_file = function(File_Name)
    {
        debugger;
    };
    gal.read_file = function(File_Name, File_Text)
    {
        debugger;
    };
}

gal.read_char = function()
{
    let buffer = Buffer.alloc(1);
    gal.fs.readSync(0, buffer, 0, 1);
    return buffer.toString('utf8');
}

class Gal_Class extends gal {
}
class Symbol  extends Gal_Class {
    constructor()
    {
        super();
        this.Symbol_Owner = undefined;
        this.Symbol_Value = undefined;
    }
    /* comment "definitiona bound property entity representing the entity's relationship with this attribute"; */
}
class Number_Symbol  extends Symbol {
    constructor()
    {
        super();
        this.Symbol_Value = undefined;
    }
}
class String_Symbol  extends Symbol {
    constructor()
    {
        super();
        this.Symbol_Value = undefined;
    }
}
class Entity_Symbol  extends Symbol {
    constructor()
    {
        super();
        this.Symbol_Value = undefined;
    }
}
class Flag_Symbol  extends Symbol {
    constructor()
    {
        super();
        this.Symbol_Value = undefined;
    }
}
class Attribute  extends Symbol {
    constructor()
    {
        super();
        this.Attribute_Entity = undefined;
        this.Attribute_Value = undefined;
        this.Attribute_Certainty = 0;
    }
    /* comment 'definitionA single-valued attribute having a primitive data type.'; */
    Assign(Value, Certainty = 0)
    {
        this.Attribute_Value = Value;
        this.Attribute_Certainty = Certainty;
    }
    Get_Value()
    {
        return this.Attribute_Value;
    }
    Get_Certainty()
    {
        return this.Attribute_Certainty;
    }
}

/* comment 'Token.gal'; */
// forward Factory
// forward Block
// forward Statement
// forward Operation
// forward Syntax
// forward Keyvalue
// forward Compiler
class Token extends gal {
    constructor()
    {
        super();
        this.Input = undefined;
        this.Document = undefined;
        this.Start_Position = undefined;
        this.End_Position = undefined;
        this.Gal = undefined;
        this.Fallback = undefined;
        this.Debug = undefined;
        this.Python = undefined;
        this.Javascript = undefined;
        this.Mumps = undefined;
        this.Error = undefined;
        this.Test_Case = undefined;
        this.Is_Verb = false;
        this.Usage = undefined;
        this.Method_Context = undefined;
        this.Variable_Context = undefined;
        this.Parent = undefined;
        this.Class_Owner = undefined;
        this.Method_Name = undefined;
    }
    Get_Input()
    {
        return this.Input;
    }
    To_String()
    {
        var String = this.constructor.name + " " + this.Input + " " + this.Start_Position + '-' + this.End_Position;
        if (this.Error !== undefined)
        {
            String += ' ERROR<' + this.Error + '>';
        }
        return String;
    }
    Compare(Element)
    {
        var My_End = this.End_Position;
        var Elem_End = Element.End_Position;
        if (My_End > Elem_End)
        {
            return 1;
        }
        if (My_End < Elem_End)
        {
            return -1;
        }
        var My_Start = this.Start_Position;
        var Elem_Start = Element.Start_Position;
        if (My_Start > Elem_Start)
        {
            return -1;
        }
        if (My_Start < Elem_Start)
        {
            return 1;
        }
        return 0;
    }
    static Predict(Character, Next)
    {
        return false;
    }
    Append(Character, Next)
    {
        if (!(this.constructor.Predict(Character, Next)))
        {
            return false;
        }
        this.Input += Character;
        this.End_Position++;
        return true;
    }
    Attributes()
    {
    }
    Process_Arguments()
    {
    }
    Structure()
    {
    }
    Model()
    {
    }
    Class_Export()
    {
    }
    Verb_Export()
    {
    }
    Gal_Generate()
    {
        this.Gal = this.Input;
    }
    Fallback_Generate()
    {
        this.Fallback = this.Input;
    }
    Debug_Generate()
    {
        this.Debug = this.Input;
    }
    Python_Generate()
    {
        this.Python = this.Input;
    }
    Javascript_Generate()
    {
        this.Javascript = this.Input;
    }
    Mumps_Generate()
    {
        this.Mumps = this.Input;
    }
    Python_Atom(Precedence)
    {
        return this.Python;
    }
    Javascript_Atom(Precedence)
    {
        var Code = this.Javascript;
        return Code;
    }
    Gal_Code()
    {
        return this.Input;
    }
    Enquote(Text)
    {
        if (!(Text.includes("'")))
        {
            return "'"  +  Text  +  "'";
        }
        if (!(Text.includes('"')))
        {
            return '"'  +  Text  +  '"';
        }
        if (!(Text.includes("`")))
        {
            return "`"  +  Text  +  "`";
        }
        if (!(Text.includes('“')) && !(Text.includes('”')))
        {
            return '“'  +  Text  +  '”';
        }
        if (!(Text.includes('‘')) && !(Text.includes('’')))
        {
            return '‘'  +  Text  +  '’';
        }
        if (!(Text.includes('«')) && !(Text.includes('»')))
        {
            return '«'  +  Text  +  '»';
        }
        if (!(Text.includes('‹')) && !(Text.includes('›')))
        {
            return '‹'  +  Text  +  '›';
        }
        return "'ERROR gal token DEEPLY ENQUOTED STRING FAILED HERE'";
    }
    Test_Generate()
    {
        var Code = '';
        if (this.Gal !== undefined)
        {
            Code += "    " + 'gal = ' + this.Enquote(this.Gal) + ';' + "\n";
        }
        if (this.Fallback !== undefined)
        {
            Code += "    " + 'fallback = ' + this.Enquote(this.Fallback) + ';' + "\n";
        }
        if (this.Python !== undefined)
        {
            Code += "    " + 'python = ' + this.Enquote(this.Python) + ';' + "\n";
        }
        if (this.Javascript !== undefined)
        {
            Code += "    " + 'javascript = ' + this.Enquote(this.Javascript) + ';' + "\n";
        }
        if (Code > '')
        {
            var Full_Code = 'test case ' + this.constructor.name + ' {' + "\n" + Code + '}' + "\n";
            this.Test_Case = Full_Code;
        }
    }
}
class Token_Space  extends Token {
    static Predict(Character, Next)
    {
        return !Character.match(/\S/);
    }
}
class Value_Token  extends Token {
}
class Token_Name  extends Value_Token {
    static Predict(Character, Next)
    {
        if (!Character.match(/\S/))
        {
            return false;
        }
        if ('[]{}<>();,"`'.includes(Character))
        {
            return false;
        }
        if (Character == "'")
        {
            return false;
        }
        return true;
    }
    Append(Character, Next)
    {
        if (!Character.match(/\S/))
        {
            return false;
        }
        if ('[]{}<>();,"`'.includes(Character))
        {
            return false;
        }
        if (Character == "'")
        {
            return false;
        }
        this.Input += Character;
        this.End_Position++;
        return true;
    }
    Python_Generate()
    {
        var Code = this.Input;
        if (Code.includes(':'))
        {
            if (Code.charAt(0) == ':')
            {
                Code = Code.substr(1);
            }
            Code = Code.replaceAll(':', '_');
            /* comment 'writelineToken.Name  [my Input]--> Code'; */
        }
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Code = this.Input;
        if (Code.includes(':'))
        {
            if (Code.charAt(0) == ':')
            {
                Code = Code.substr(1);
            }
            Code = Code.replaceAll(':', '_');
        }
        this.Javascript = Code;
    }
    Unquoted()
    {
        var Text = this.Input;
        return Text;
    }
}
class Token_Class_Name  extends Token_Name {
    static Predict(Character, Next)
    {
        if (!Character.match(/\S/))
        {
            return false;
        }
        if (Character != ':')
        {
            return false;
        }
        if (!Next.match(/\S/))
        {
            return false;
        }
        return true;
    }
}
class Number  extends Value_Token {
    static Predict(Character, Next)
    {
        return '0123456789.-'.includes(Character);
    }
}
class Quote  extends Value_Token {
    static Predict(Character, Next)
    {
        return Character == '"' || Character == "'" || Character == '`';
    }
    Append(Character, Next)
    {
        var Text = this.Input;
        var First = Text.charAt(0);
        var Last = Text.charAt(Text.length-1);
        if (First == Last && Text.length > 1)
        {
            return false;
        }
        this.Input += Character;
        this.End_Position++;
        return true;
    }
    Unquoted()
    {
        var Text = this.Input;
        var Length = Text.length;
        var Middle = Text.substr(1, Length - 2);
        return Middle;
    }
    Gal_Generate()
    {
        var Code = this.Input;
        if (this.Input.includes("\n"))
        {
            var Line;
            var Expressions = '';
            var Q = Code.charAt(0);
            Code = Code.substr(1, Code.length - 2);
            for (Line of Code.split("\n"))
            {
                if (Expressions != '')
                {
                    Expressions += ' [line] ';
                }
                Expressions += Q + Line + Q;
            }
            Code = '(append '  +  Expressions  +  ')';
        }
        this.Gal = Code;
    }
    Fallback_Generate()
    {
        var Code = this.Input;
        if (this.Input.includes("\n"))
        {
            var Line;
            var Expressions = '';
            var Q = Code.charAt(0);
            Code = Code.substr(1, Code.length - 2);
            for (Line of Code.split("\n"))
            {
                if (Expressions != '')
                {
                    Expressions += ' [line] ';
                }
                Expressions += Q + Line + Q;
            }
            Code = '(append '  +  Expressions  +  ')';
        }
        this.Fallback = Code;
    }
    Python_Generate()
    {
        var Input = this.Input;
        if (Input.includes(gal.backslash()))
        {
            Input = Input.replaceAll(gal.backslash(), gal.backslash(2));
        }
        var Q = Input.charAt(0);
        var Middle = Input.substr(1, Input.length - 2);
        if (Middle.includes("\n") || Q == '`')
        {
            Q = "'''";
        }
        var Code = Q + Middle + Q;
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Input = this.Input;
        if (Input.includes(gal.backslash()))
        {
            Input = Input.replaceAll(gal.backslash(), gal.backslash(2));
        }
        this.Javascript = Input;
    }
}
class Boundary_Token  extends Token {
    Append(Character, Next)
    {
        return false;
    }
}
class Start_Token  extends Boundary_Token {
}
class End_Token  extends Boundary_Token {
}
class Token_Semi  extends End_Token {
    static Predict(Character, Next)
    {
        return Character == ';';
    }
}
class Token_Block_Start  extends Start_Token {
    static Predict(Character, Next)
    {
        return Character == '{';
    }
}
class Token_Block_End  extends End_Token {
    static Predict(Character, Next)
    {
        return Character == '}';
    }
}
class Token_Operation_Start  extends Start_Token {
    static Predict(Character, Next)
    {
        return Character == '(';
    }
}
class Token_Operation_End  extends End_Token {
    static Predict(Character, Next)
    {
        return Character == ')';
    }
}
class Token_Syntax_Start  extends Start_Token {
    static Predict(Character, Next)
    {
        return Character == '[';
    }
}
class Token_Syntax_End  extends End_Token {
    static Predict(Character, Next)
    {
        return Character == ']';
    }
}
class Token_Keyvalue_Start  extends Start_Token {
    static Predict(Character, Next)
    {
        return Character == '<';
    }
}
class Token_Keyvalue_End  extends End_Token {
    static Predict(Character, Next)
    {
        return Character == '>';
    }
}
class Token_Comma  extends Boundary_Token {
    static Predict(Character, Next)
    {
        return Character == ',';
    }
}

/* comment 'Element.gal'; */
// forward Gal
// forward Python
// forward Javascript
// forward Sql
class Element extends gal {
    static Js_Precedence = 99;
    static Verbose = false;
    constructor()
    {
        super();
        this.Dialect = '';
        this.Input = '';
        this.Start_Position = -1;
        this.End_Position = -1;
        this.Document = undefined;
        this.Parent = undefined;
        this.Gal = undefined;
        this.Debug = undefined;
        this.Fallback = undefined;
        this.Python = undefined;
        this.Javascript = undefined;
        this.Mumps = undefined;
        this.Php = undefined;
        this.Java = undefined;
        this.Sql = undefined;
        this.Gal_Declaration = undefined;
        this.Fallback_Declaration = undefined;
        this.Tokens = [];
        this.Class_Context = undefined;
        this.Method_Context = undefined;
        this.Variable_Context = undefined;
        this.Document_Body = [];
        this.Elements = [];
        this.Error = undefined;
        this.Is_Verb = false;
        this.Usage = '';
        this.Re_Structure = true;
        this.Block = undefined;
        this.Data_Type = undefined;
        this.Method_Signature = '';
        this.Class_Owner = undefined;
        this.Method_Name = undefined;
        this.Test_Case = undefined;
    }
    static Test(Errors, Verbose)
    {
        var Error_Message = this.constructor.name + ' does not override base Test method.';
        Errors.push(Error_Message);
        if (Verbose)
        {
            console.log(Error_Message);
        }
    }
    Validate()
    {
        return true;
    }
    Lookup(Element_Name)
    {
        if (this.Parent)
        {
            return this.Parent.Lookup(Element_Name);
        }
        return false;
    }
    Model()
    {
    }
    Pre_Fallback()
    {
    }
    To_String()
    {
        var String = this.constructor.name + ': ';
        try
        {
            String += this.Start_Position;
        }
        catch
        {
            String += '<Start?>';
        }
        try
        {
            String += '-' + this.End_Position;
        }
        catch
        {
            String += '-<End?>';
        }
        try
        {
            if (this.Error !== undefined)
            {
                String += ' ERROR <' + this.Error + '>';
            }
        }
        catch
        {
            String += ' ok';
        }
        String += ' <' + this.Get_Input() + '> ';
        return String;
    }
    Am(Other)
    {
        var My_Text = this.To_String();
        var Other_Text = Other.To_String();
        return My_Text == Other_Text;
    }
    Am_Earlier(Other)
    {
        if (!(Other instanceof Element))
        {
            return true;
        }
        if (Other.Start_Position < 0)
        {
            return true;
        }
        if (this.Start_Position < 0)
        {
            return false;
        }
        return this.Start_Position < Other.Start_Position;
    }
    String_Info()
    {
        return '.';
    }
    Get_Input()
    {
        if (!(this.Document !== undefined))
        {
            return '<no document>';
        }
        if (this.Start_Position < 0)
        {
            return '<negative start>';
        }
        var String_Length = this.End_Position - this.Start_Position + 1;
        var Input = this.Document.Input;
        var Start = this.Start_Position;
        var Text = Input.substr(Start, String_Length);
        return Text;
    }
    Compare(Element)
    {
        var My_End = this.End_Position;
        var Elem_End = Element.End_Position;
        if (My_End > Elem_End)
        {
            return 1;
        }
        if (My_End < Elem_End)
        {
            return -1;
        }
        var My_Start = this.Start_Position;
        var Elem_Start = Element.Start_Position;
        if (My_Start > Elem_Start)
        {
            return -1;
        }
        if (My_Start < Elem_Start)
        {
            return 1;
        }
        return 0;
    }
    Inference_Context()
    {
        if (!(this.Parent !== undefined))
        {
            return undefined;
        }
        return this.Parent.Inference_Context();
    }
    Gal_Generate()
    {
        throw "Must Override Gal_Generate";
    }
    Debug_Generate()
    {
        throw "Must Override Debug_Generate";
    }
    Fallback_Generate()
    {
        this.Fallback = this.Gal;
    }
    Php_Generate()
    {
        throw "Must Override Php_Generate";
    }
    Java_Generate()
    {
        throw "Must Override Java_Generate";
    }
    Test_Generate()
    {
        var Child_Code = '';
        var Element;
        for (Element of this.Elements)
        {
            if (!(Element.Test_Case !== undefined))
            {
                continue;
            }
            Child_Code += Element.Test_Case + "\n";
        }
        var Code = '';
        if (this.Gal !== undefined)
        {
            Code += 'gal = ' + this.Enquote(this.Gal) + ';' + "\n";
        }
        if (this.Fallback !== undefined)
        {
            Code += 'fallback = ' + this.Enquote(this.Fallback) + ';' + "\n";
        }
        if (this.Python !== undefined)
        {
            Code += 'python = ' + this.Enquote(this.Python) + ';' + "\n";
        }
        if (this.Javascript !== undefined)
        {
            Code += 'javascript = ' + this.Enquote(this.Javascript) + ';' + "\n";
        }
        if (Code > '')
        {
            var Full_Code = Child_Code + 'test case ' + this.constructor.name + "\n" + '{' + "\n" + this.Indent(Code) + '}' + "\n";
            this.Test_Case = Full_Code;
        }
    }
    Gal_Add_Token(Token)
    {
        return -1;
    }
    Gal_Add_Element(Child_Element)
    {
        /* comment 'writelineappend element  [class.name]'; */
        if (Child_Element.End_Position > this.End_Position)
        {
            this.End_Position = Child_Element.End_Position;
        }
        this.Elements.push(Child_Element);
    }
    Gal_Tokenize()
    {
        var Text = this.Input;
        var Char = Text.substr(0, 1);
        var Next = Text.substr(1, 1);
        var End = Text.length - 1;
        var Position = 0;
        var Token = Factory.Create_Token(Char, Next, Position);
        if (!(Token instanceof Token_Space))
        {
            this.Tokens.push(Token);
        }
        for (Position=1; Position<=End; Position++)
        {
            Char = Text.substr(Position, 1);
            if (Position < End)
            {
                Next = Text.substr(Position + 1, 1);
            }
            else
            {
                Next = '';
            }
            if (Token.Append(Char, Next))
            {
                continue;
            }
            Token = Factory.Create_Token(Char, Next, Position);
            if (!(Token))
            {
                return false;
            }
            if (Token instanceof Token_Space)
            {
                continue;
            }
            this.Tokens.push(Token);
        }
        return true;
    }
    Gal_Parse()
    {
        Gal.Parse_Element(this);
    }
    Javascript_Parse()
    {
        /* comment "TODO:" "Parse this element's tokens into Javascript language elements."; */
        Javascript.Parse_Element(this);
    }
    Python_Parse()
    {
        /* comment "TODO:" "Parse this element's tokens into Python language elements."; */
        Python.Parse_Element(this);
    }
    Sql_Parse()
    {
        /* comment "TODO:" "Parse this element's tokens into SQL language elements."; */
        Sql.Parse_Element(this);
    }
    Structure()
    {
        if (!(this.Re_Structure))
        {
            return;
        }
        this.Re_Structure = false;
        /* comment 'writeline     Element Structure  [class.name]'; */
        this.Base_Structure();
        var Element;
        for (Element of this.Elements)
        {
            if (this.Method_Context !== undefined && !(Element.Method_Context !== undefined))
            {
                Element.Method_Context = this.Method_Context;
            }
            if (this.Variable_Context !== undefined && !(Element.Variable_Context !== undefined))
            {
                Element.Variable_Context = this.Variable_Context;
            }
            /* comment '.= Element Parent [self]'; */
            Element.Structure();
        }
    }
    Base_Model()
    {
        /* comment 'writeline     Element Model  [class.name]'; */
        var This_Element;
        for (This_Element of this.Document_Body)
        {
            /* comment "writeline ' - model ' (. This_Element To_String);"; */
            try
            {
                This_Element.Model();
            }
            catch (Error)
            {
                debugger;
                console.log("ERROR modeling ", This_Element.To_String(), ': ', Error);
                This_Element.Error = Error;
            }
        }
    }
    Base_Structure()
    {
    }
    Child_Attributes()
    {
        var Element;
        for (Element of this.Document_Body)
        {
            var Error;
            try
            {
                Element.Attributes();
                Element.Process_Arguments();
            }
            catch (Error)
            {
                /* comment 'debug'; */
                console.log('Child_Attributes error <', Error, '> on Element ', Element.To_String());
                Element.Error = Error;
            }
        }
    }
    Attributes()
    {
    }
    Process_Arguments()
    {
    }
    Validate()
    {
        return true;
    }
    Class_Export()
    {
    }
    Verb_Export()
    {
    }
    Javascript_Generate()
    {
        throw this.constructor.name + ' must override Javascript_Generate';
    }
    Python_Generate()
    {
        throw this.constructor.name + ' must override Python_Generate';
    }
    Sql_Generate()
    {
        throw this.constructor.name + ' must override Sql_Generate';
    }
    Mumps_Generate()
    {
        throw this.constructor.name + ' must override Mumps_Generate';
    }
    Gal_Block()
    {
        var Gal_Code = ';';
        if (this.Block !== undefined && this.Block.Gal !== undefined)
        {
            Gal_Code = this.Block.Gal;
        }
        return Gal_Code;
    }
    Fallback_Block()
    {
        if (this.Block !== undefined)
        {
            return this.Block.Fallback;
        }
        return ';';
    }
    Python_Block()
    {
        try
        {
            if (this.Block !== undefined && this.Block.Python !== undefined)
            {
                if (this.Block.Python > '')
                {
                    return this.Block.Python;
                }
            }
        }
        catch { } 
        return ':'  +  "\n"  +  "    "  +  'pass'  +  "\n";
    }
    Python_Statements()
    {
        try
        {
            if (this.Block !== undefined && this.Block.Python_Statements !== undefined)
            {
                if (this.Block.Python_Statements > '')
                {
                    return this.Block.Python_Statements;
                }
            }
        }
        catch { } 
        return '';
    }
    Javascript_Block()
    {
        try
        {
            if (this.Block !== undefined && this.Block.Javascript !== undefined)
            {
                if (this.Block.Javascript > '')
                {
                    return this.Block.Javascript;
                }
            }
        }
        catch { } 
        return ' { } ';
    }
    Javascript_Statements()
    {
        try
        {
            if (this.Block !== undefined && this.Block.Javascript_Statements !== undefined)
            {
                if (this.Block.Javascript_Statements > '')
                {
                    return this.Block.Javascript_Statements;
                }
            }
        }
        catch { } 
        return '';
    }
    Fallback_Args()
    {
        var Argument;
        var Args_Gal = '';
        for (Argument of this.Listargs)
        {
            var Arg_Gal = Argument.Fallback;
            Args_Gal += ' ' + Arg_Gal;
        }
        return Args_Gal;
    }
    Python_Args(Separator)
    {
        var Argument;
        var Args_Py = '';
        var Between = '';
        for (Argument of this.Listargs)
        {
            if (!(Argument.Python !== undefined))
            {
                throw 'Argument Python not defined: ' + Argument.Gal;
            }
            var Arg_Py = Argument.Python;
            Args_Py += Between + Arg_Py;
            Between = Separator;
        }
        return Args_Py;
    }
    Python_String_Args(Separator)
    {
        var Argument;
        var Args_Py = '';
        var Between = '';
        for (Argument of this.Listargs)
        {
            if (!(Argument.Python !== undefined))
            {
                throw 'Argument Python not defined: ' + Argument.Gal;
            }
            var Arg_Py = Argument.Python;
            if (Argument instanceof Quote)
            {
                Args_Py += Between + Arg_Py;
            }
            else
            {
                Args_Py += Between + 'str(' + Arg_Py + ')';
            }
            Between = Separator;
        }
        return Args_Py;
    }
    Javascript_Args(Separator)
    {
        var Argument;
        var Args_Js = '';
        var Between = '';
        for (Argument of this.Listargs)
        {
            if (!(Argument.Javascript !== undefined))
            {
                throw 'Argument Javascript not defined: ' + Argument.Gal;
            }
            var Arg_Js = Argument.Javascript;
            Args_Js += Between + Arg_Js;
            Between = Separator;
        }
        return Args_Js;
    }
    Mumps_Args(Separator)
    {
        var Argument;
        var Args_M = '';
        var Between = '';
        for (Argument of this.Listargs)
        {
            var Arg_M = Argument.Mumps;
            Args_M += Between + Arg_M;
            Between = Separator;
        }
        return Args_M;
    }
    Fallback_Arguments()
    {
        var Argument;
        var Args_Code = '';
        for (Argument of this.Arguments)
        {
            Args_Code += ' ' + Argument.Fallback;
        }
        return Args_Code;
    }
    Argument_String()
    {
        var Argument;
        var Args_Code = '';
        var Between = '';
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Quote)
            {
                Args_Code += Argument.Unquoted();
            }
            else
            {
                Args_Code += Between + Argument.Gal_Code();
                Between = ' ';
            }
        }
        return Args_Code;
    }
    Python_Arguments(Separator)
    {
        var Argument;
        var Args_Py = '';
        var Between = '';
        for (Argument of this.Arguments)
        {
            var Arg_Py = Argument.Python;
            Args_Py += Between + Arg_Py;
            Between = Separator;
        }
        return Args_Py;
    }
    Javascript_Arguments(Separator)
    {
        var Argument;
        var Args_Js = '';
        var Between = '';
        for (Argument of this.Arguments)
        {
            var Arg_Js = Argument.Javascript;
            Args_Js += Between + Arg_Js;
            Between = Separator;
        }
        return Args_Js;
    }
    Mumps_Arguments(Separator)
    {
        var Argument;
        var Args_M = '';
        var Between = '';
        for (Argument of this.Arguments)
        {
            var Arg_M = Argument.Mumps;
            Args_M += Between + Arg_M;
            Between = Separator;
        }
        return Args_M;
    }
    Indent(Input)
    {
        var Lines = Input.split("\n");
        var Line;
        var Indented = '';
        for (Line of Lines)
        {
            if (Line > '')
            {
                Indented += "    " + Line + "\n";
            }
        }
        return Indented;
    }
    Pascal_Case(Input)
    {
        var Name = Input.toLowerCase();
        var Words = Name.split('_');
        var Pascal = '';
        var I;
        var End = Words.length - 1;
        var W;
        var Between = '';
        var One_Word;
        for (I=0; I<=End; I++)
        {
            W = Words[I];
            One_Word = W.charAt(0).toUpperCase()  +  W.substr(1);
            Pascal += Between + One_Word;
            Between = '_';
        }
        return Pascal;
    }
    Python_Atom(Precedence)
    {
        var Code = this.Python;
        try
        {
            if (Precedence > this.constructor.Js_Precedence)
            {
                Code = '('  +  Code  +  ')';
            }
        }
        catch { } 
        return Code;
    }
    Javascript_Atom(Precedence)
    {
        var Code = this.Javascript;
        try
        {
            if (Precedence > this.constructor.Js_Precedence)
            {
                Code = '('  +  Code  +  ')';
            }
        }
        catch { } 
        return Code;
    }
    Code_Context()
    {
        var Start = this.Start_Position;
        var End = this.End_Position;
        var Length = End - Start + 1;
        var Window = 50;
        var Before = Start - Window;
        var BL = Window;
        if (Before < 0)
        {
            BL = Window + Before;
            Before = 0;
        }
        var Prefix = this.Document.Input.substr(Before, BL);
        var Middle = this.Document.Input.substr(Start, Length);
        var Suffix = this.Document.Input.substr(End + 1, Window);
        var Context = Prefix + '<*' + Middle + '*>' + Suffix;
        return Context;
    }
    Enquote(Text)
    {
        if (!(Text.includes("'")))
        {
            return "'"  +  Text  +  "'";
        }
        if (!(Text.includes('"')))
        {
            return '"'  +  Text  +  '"';
        }
        if (!(Text.includes("`")))
        {
            return "`"  +  Text  +  "`";
        }
        if (!(Text.includes('“')) && !(Text.includes('”')))
        {
            return '“'  +  Text  +  '”';
        }
        if (!(Text.includes('‘')) && !(Text.includes('’')))
        {
            return '‘'  +  Text  +  '’';
        }
        if (!(Text.includes('«')) && !(Text.includes('»')))
        {
            return '«'  +  Text  +  '»';
        }
        if (!(Text.includes('‹')) && !(Text.includes('›')))
        {
            return '‹'  +  Text  +  '›';
        }
        return "'ERROR gal element DEEPLY ENQUOTED STRING FAILED HERE'";
    }
    Gal_Code()
    {
        var Start = this.Start_Position;
        var End = this.End_Position;
        var Length = End - Start + 1;
        var Code = this.Document.Input.substr(Start, Length);
        return Code;
    }
    Failure_Message(Problem_Desc)
    {
        var Message = Problem_Desc + '. ';
        Message += this.Gal_Code() + ' ';
        Message += this.Code_Context();
        return Message;
    }
}
class Named_Element  extends Element {
    static Gal_Keyword = undefined;
    static Gs_Keyword = undefined;
    constructor()
    {
        super();
        this.Verb = undefined;
        this.Listargs = [];
        this.Arguments = [];
    }
    String_Info()
    {
        var String = '';
        try
        {
            var Argument;
            for (Argument of this.Arguments)
            {
                var Arg_Str = Argument.constructor.name;
                String += ' ' + Arg_Str;
            }
        }
        catch
        {
            String += '<invalid Arguments>';
        }
        String += '.';
        return String;
    }
    Base_Structure()
    {
        var Argument;
        var Previous;
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Syntax && Previous !== undefined && Previous instanceof Syntax)
            {
                Previous.Chain_Forward = true;
                Argument.Chain_Backward = true;
            }
            Previous = Argument;
        }
    }
    Gal_Add_Element(Child_Element)
    {
        /* comment 'writelineappend element argument  [class.name]'; */
        if (Child_Element.End_Position > this.End_Position)
        {
            this.End_Position = Child_Element.End_Position;
        }
        this.Elements.push(Child_Element);
        this.Arguments.push(Child_Element);
        this.Listargs.push(Child_Element);
    }
}

/* comment 'Statement.gal'; */
// forward Comment_Statement
class Statement  extends Named_Element {
    constructor()
    {
        super();
        this.In_Block = false;
        this.Block = undefined;
        this.Verb_Owner = undefined;
        this.Class_Owner = undefined;
        this.Infer_Inits = '';
    }
    Ensure_Block()
    {
        if (this.Block !== undefined)
        {
            return;
        }
        var Block = new Block();
        Block.Document = this.Document;
        Block.Start_Position = this.Start_Position;
        Block.End_Position = this.End_Position;
        this.Block = Block;
    }
    String_Info()
    {
        var String = '';
        try
        {
            var Argument;
            for (Argument of this.Arguments)
            {
                var Arg_Str = Argument.constructor.name;
                String += ' ' + Arg_Str;
            }
        }
        catch
        {
            String += '<invalid Arguments>';
        }
        try
        {
            if (this.Block !== undefined)
            {
                String += ' ' + this.Block.To_String();
            }
        }
        catch
        {
            String += '<invalid Block>';
        }
        String += '.';
        return String;
    }
    Structure()
    {
        if (!(this.Re_Structure))
        {
            return;
        }
        this.Re_Structure = false;
        /* comment 'writeline     Element Structure  [class.name]'; */
        this.Base_Structure();
        if (this.Block !== undefined)
        {
            if (this.Class_Context !== undefined)
            {
                this.Block.Class_Context = this.Class_Context;
            }
            if (this.Method_Context !== undefined)
            {
                this.Block.Method_Context = this.Method_Context;
            }
            if (this.Variable_Context !== undefined)
            {
                this.Block.Variable_Context = this.Variable_Context;
            }
            this.Block.Structure();
        }
        var Element;
        for (Element of this.Elements)
        {
            /* comment '.= Element Parent [me]'; */
            if (this.Method_Context !== undefined && 3 && !(Element.Method_Context !== undefined))
            {
                Element.Method_Context = this.Method_Context;
            }
            Element.Structure();
        }
    }
    Base_Structure()
    {
        var Argument;
        var Previous;
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Syntax && Previous !== undefined && Previous instanceof Syntax)
            {
                Previous.Chain_Forward = true;
                Argument.Chain_Backward = true;
            }
            Previous = Argument;
        }
    }
    Conditional_Debug()
    {
        var Code = ': Debugger Conditional ' + this.Start_Position + ' ' + this.End_Position + ';' + "\n";
        return Code;
    }
    Gal_Add_Token(Token)
    {
        /* comment "Add token '(. Token To_String)' to statement ' (i To_String)'"; */
        if (Token instanceof Token_Semi || Token instanceof Token_Block_End)
        {
            /* comment 'Statement (i To_String) appends  (. Token To_String) statement terminator'; */
            this.Elements.push(Token);
            this.End_Position = Token.End_Position;
            if (this.In_Block)
            {
                this.Block.End_Position = this.End_Position;
            }
            return -1;
        }
        if (Token instanceof Token_Block_Start)
        {
            /* comment 'Statement (i To_String) appends  (. Token To_String) block start'; */
            this.Elements.push(Token);
            var Here = Token.End_Position;
            this.End_Position = Here;
            this.Block = new Block();
            this.Block.Document = this.Document;
            this.Block.Start_Position = Here;
            this.Block.End_Position = Here;
            this.In_Block = true;
            this.Elements.push(this.Block);
            return 0;
        }
        if (Token instanceof Start_Token)
        {
            return 1;
        }
        if (Token instanceof End_Token)
        {
            /* comment 'Statement (i To_String) appends  (. Token To_String) error end token'; */
            /* comment "TODO:" 'log error here'; */
            return -999;
        }
        this.Elements.push(Token);
        if (this.In_Block)
        {
            /* comment 'Statement (i To_String) appends  (. Token To_String) in a block'; */
            return 1;
        }
        else
        {
            /* comment 'Statement (i To_String) appends  (. Token To_String) as argument'; */
            this.Arguments.push(Token);
            this.Listargs.push(Token);
        }
        this.End_Position = Token.End_Position;
        return 0;
    }
    Gal_Add_Element(Child_Element)
    {
        /* comment 'writelineAdd element  (. Child_Element To_String) to statement  (i To_String)'; */
        if (Child_Element.End_Position > this.End_Position)
        {
            this.End_Position = Child_Element.End_Position;
        }
        if (this.In_Block)
        {
            this.Block.Gal_Add_Element(Child_Element);
        }
        else
        {
            this.Elements.push(Child_Element);
            this.Arguments.push(Child_Element);
            this.Listargs.push(Child_Element);
        }
    }
    Gal_Generate()
    {
        this.Ensure_Block();
        this.Block.Gal_Generate();
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Token_Comma)
            {
                Gal_Code += ',';
                continue;
            }
            if (!(Argument.Gal !== undefined))
            {
                this.Error = "Argument Error";
                Gal_Code += "<Argument Error>";
                console.log(Argument.To_String(), ": Argument Error");
            }
            else
            {
                Gal_Code += ' ' + Argument.Gal;
            }
        }
        Gal_Code += this.Block.Gal;
        this.Gal = Gal_Code;
    }
    Fallback_Generate()
    {
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Argument.Fallback_Generate();
            Gal_Code += ' ' + Argument.Fallback;
        }
        if (this.Block !== undefined)
        {
            this.Block.Fallback_Generate();
            Gal_Code += this.Fallback_Block();
        }
        else
        {
            Gal_Code += ';';
        }
        this.Fallback = Gal_Code;
    }
    Debug_Generate()
    {
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        if (this.Block !== undefined)
        {
            this.Block.Debug_Generate();
            Gal_Code += this.Block.Gal;
        }
        else
        {
            Gal_Code += ';';
        }
        Gal_Code += this.Conditional_Debug();
        this.Debug = Gal_Code;
    }
}
class Block  extends Element {
    constructor()
    {
        super();
        this.Statements = [];
        this.Gal_Statements = undefined;
        this.Fallback_Statements = undefined;
        this.Python_Statements = undefined;
        this.Javascript_Statements = undefined;
    }
    Add_Statement(Statement)
    {
        this.Statements.push(Statement);
    }
    String_Info()
    {
        var String = this.constructor.name + ': ';
        try
        {
            String += this.Start_Position;
        }
        catch
        {
            String += '<Start?>';
        }
        try
        {
            String += '-' + this.End_Position;
        }
        catch
        {
            String += '-<End?>';
        }
        String += ' {';
        var Statement;
        for (Statement of this.Statements)
        {
            var Stmt_Str = Statement.constructor.name;
            String += ' ' + Stmt_Str;
        }
        String += ' }';
        try
        {
            if (this.Error !== undefined)
            {
                String += ' ERROR <' + this.Error + '>';
            }
        }
        catch
        {
            String += ' ok';
        }
        return String;
    }
    Base_Structure()
    {
        if (this.Method_Context !== undefined)
        {
            /* comment 'writelineBlock Method Context'; */
        }
        else
        {
            var Message = '%% Block No Method Context in ';
            if (this.Parent !== undefined)
            {
                Message += this.Parent.To_String();
            }
            Message += ' %%';
            /* comment 'writeline Message'; */
        }
        var Statement;
        for (Statement of this.Statements)
        {
            if (this.Class_Context !== undefined)
            {
                /* comment 'writeline     (. Statement To_String)'; */
                Statement.Class_Context = this.Class_Context;
            }
            if (this.Method_Context !== undefined)
            {
                /* comment 'writeline     (. Statement To_String)'; */
                Statement.Method_Context = this.Method_Context;
            }
            if (this.Variable_Context !== undefined)
            {
                Statement.Variable_Context = this.Variable_Context;
            }
            Statement.Structure();
        }
    }
    Gal_Add_Element(Child_Element)
    {
        /* comment 'writelineblock append element  [class.name]'; */
        if (Child_Element.End_Position > this.End_Position)
        {
            this.End_Position = Child_Element.End_Position;
        }
        this.Elements.push(Child_Element);
        this.Statements.push(Child_Element);
    }
    Gal_Generate()
    {
        var Block_Code = '';
        var Statement;
        for (Statement of this.Statements)
        {
            if (!(Statement.Gal !== undefined))
            {
                Statement.Gal_Generate();
            }
            Block_Code += Statement.Gal + "\n";
        }
        var Code = ';';
        if (Block_Code > '')
        {
            Block_Code = this.Indent(Block_Code);
            Code = "\n"  +  '{'  +  "\n"  +  Block_Code  +  '}'  +  "\n";
        }
        this.Gal_Statements = Block_Code;
        this.Gal = Code;
    }
    Debug_Generate()
    {
        var Code = "\n" + '{' + "\n";
        var Block_Code = '';
        var Statement;
        for (Statement of this.Statements)
        {
            Block_Code += Statement.Gal + "\n";
        }
        Block_Code = this.Indent(Block_Code);
        this.Gal_Statements = Block_Code;
        Code += Block_Code + '}' + "\n";
        this.Debug = Code;
    }
    Fallback_Generate()
    {
        var Block_Code = '';
        var Statement;
        for (Statement of this.Statements)
        {
            if (!(Statement.Fallback !== undefined))
            {
                Statement.Fallback_Generate();
            }
            Block_Code += Statement.Fallback + "\n";
        }
        var Code = ';' + "\n";
        if (Block_Code > '')
        {
            Block_Code = this.Indent(Block_Code);
            Code = "\n"  +  '{'  +  "\n"  +  Block_Code  +  '}'  +  "\n";
        }
        this.Fallback_Statements = Block_Code;
        this.Fallback = Code;
    }
    Python_Generate()
    {
        var Non_Comments = false;
        var Stmt_Code = '';
        var Statement;
        for (Statement of this.Statements)
        {
            var Statement_Py = Statement.Python;
            if (Statement_Py !== undefined)
            {
                Stmt_Code += Statement_Py;
            }
            else
            {
                Stmt_Code += '# ERROR from ' + Statement.To_String();
            }
            if (!(Statement instanceof Comment_Statement))
            {
                Non_Comments = true;
            }
        }
        if (!(Non_Comments))
        {
            Stmt_Code += 'pass' + "\n";
        }
        Stmt_Code = this.Indent(Stmt_Code);
        this.Python_Statements = Stmt_Code;
        var Code = ':' + "\n" + Stmt_Code;
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Block_Code = '';
        var Statement;
        for (Statement of this.Statements)
        {
            var Statement_JS = Statement.Javascript;
            if (Statement_JS !== undefined)
            {
                Block_Code += Statement_JS;
            }
            else
            {
                Block_Code += '// ERROR from ' + Statement.To_String() + "\n";
            }
        }
        /* comment 'writelineblock:  Block_Code'; */
        Block_Code = this.Indent(Block_Code);
        /* comment 'writelineindented block:  Block_Code'; */
        this.Javascript_Statements = Block_Code;
        var Code = "\n" + '{' + "\n" + Block_Code + '}' + "\n";
        /* comment 'writelinecode:  Code'; */
        this.Javascript = Code;
    }
}
class Line_Statement  extends Statement {
}
class Scoped_Statement  extends Statement {
}
class Declare_Statement  extends Line_Statement {
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Javascript_Generate()
    {
        if (!(this.Variable.Javascript !== undefined))
        {
            throw this.Failure_Message('Variable Javascript is undefined');
        }
        var Variable_Javascript = this.Variable.Javascript;
        var Value_Javascript = '';
        if (this.Value !== undefined)
        {
            Value_Javascript = ' = '  +  this.Value.Javascript;
        }
        var Code = 'var ' + Variable_Javascript + Value_Javascript + ';' + "\n";
        this.Javascript = Code;
    }
    Python_Generate()
    {
        if (!(this.Variable.Python !== undefined))
        {
            throw this.Failure_Message('Variable Python is undefined');
        }
        var Variable_Python = this.Variable.Python;
        var Value_Python = 'None';
        if (this.Value !== undefined)
        {
            if (!(this.Value.Python !== undefined))
            {
                throw this.Failure_Message('Value Python is undefined');
            }
            Value_Python = this.Value.Python;
        }
        var Code = Variable_Python + ' = ' + Value_Python + "\n";
        this.Python = Code;
    }
}
class Method_Statement  extends Scoped_Statement {
    constructor()
    {
        super();
        this.Python_Class = 'cls';
        this.Method_Context = undefined;
        this.Variable_Context = undefined;
        this.Method_Signature = undefined;
        this.Return_Type = undefined;
        this.Method_Name = undefined;
    }
    Attributes()
    {
        this.Return_Type = this.Listargs.shift();
        this.Method_Name = this.Listargs.shift();
        this.Method_Context = this;
        /* comment "TODO:" 'add this to the compiled method list of the class.'; */
        var Header = 'method';
        var Argument;
        for (Argument of this.Arguments)
        {
            /* comment 'The arguments must be consistent, because we need to know the header before generation begins.'; */
            Header += ' ' + Argument.Get_Input();
        }
        this.Method_Signature = Header;
    }
    Model()
    {
        if (!(this.Class_Owner))
        {
            return;
        }
        var Signature = 'method';
        var Argument;
        for (Argument of this.Arguments)
        {
            /* comment 'The arguments must be consistent, because we need to know the header before generation begins.'; */
            Signature += ' ' + Argument.Get_Input();
        }
        this.Method_Signature = Signature;
        this.Class_Owner.Signatures[Signature] = this;
    }
    Verb_Export()
    {
        console.log('Method statement ', this.Method_Signature, ' Verb_Export begin');
        if (!(Compiler.Instance.Verb_Export))
        {
            return;
        }
        console.log('flag on');
        var Verb = Compiler.Instance.Get_Verb(this.Method_Signature);
        if ((Verb == null || Verb == ""))
        {
            return;
        }
        console.log('verb found');
        var My_Class_Name = this.Class_Owner.Class_Name.Input;
        if (My_Class_Name in Verb.Handler_Classes)
        {
            return;
        }
        console.log('handler is new');
        /* comment "TODO:" 'Generate a text copy of my gal code with the handler header.'; */
        this.Block.End_Position = this.End_Position;
        this.Block.Document = this.Document;
        console.log('getting block');
        this.Ensure_Block();
        var Gal_Block = this.Gal_Block();
        console.log('generating handler');
        var Code = 'handler ' + My_Class_Name + Gal_Block;
        /* comment "TODO:" "Add it as a text token to the verb's handler list."; */
        console.log('creating token');
        var New_Token = new Token();
        New_Token.Input = Code;
        New_Token.Gal = Code;
        New_Token.Start_Position = this.Start_Position;
        New_Token.End_Position = this.End_Position;
        console.log('adding to verb block');
        Verb.Ensure_Block();
        Verb.Block.Add_Statement(New_Token);
        Verb.Handler_Classes[My_Class_Name] = this;
        /* comment "TODO:" 'Check Class_Keep_Verbs compiler switch. Exit if true.'; */
        if (Compiler.Instance.Class_Keep_Verbs)
        {
            return;
        }
        /* comment "TODO:" 'Delete this method from the class.'; */
        this.Class_Owner.Delete_Method(this);
        console.log('Method statement ', this.Method_Signature, ' Verb_Export end');
    }
    Debug_Generate()
    {
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        if (this.Block !== undefined)
        {
            this.Block.Debug_Generate();
            Gal_Code += this.Block.Gal;
        }
        else
        {
            Gal_Code += ';';
        }
        this.Debug = Gal_Code;
    }
}
class Class_Method_Statement  extends Method_Statement {
}
class Property_Statement  extends Line_Statement {
    Debug_Generate()
    {
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        if (this.Block !== undefined)
        {
            this.Block.Debug_Generate();
            Gal_Code += this.Block.Gal;
        }
        else
        {
            Gal_Code += ';';
        }
        this.Debug = Gal_Code;
    }
}
class Class_Property_Statement  extends Line_Statement {
}
class Constructor_Statement  extends Method_Statement {
    Attributes()
    {
    }
    Debug_Generate()
    {
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        if (this.Block !== undefined)
        {
            this.Block.Debug_Generate();
            Gal_Code += this.Block.Gal;
        }
        else
        {
            Gal_Code += ';';
        }
        this.Debug = Gal_Code;
    }
}
class If_Statement  extends Scoped_Statement {
    Debug_Generate()
    {
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        if (this.Block !== undefined)
        {
            this.Block.Debug_Generate();
            Gal_Code += this.Block.Gal;
        }
        else
        {
            Gal_Code += ';';
        }
        this.Debug = Gal_Code;
    }
}
class Append_Args_Statement  extends Line_Statement {
}
class Assign_Statement  extends Line_Statement {
}
class Invocation_Statement  extends Line_Statement {
}
class Argument_Statement  extends Line_Statement {
    Debug_Generate()
    {
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        if (this.Block !== undefined)
        {
            this.Block.Debug_Generate();
            Gal_Code += this.Block.Gal;
        }
        else
        {
            Gal_Code += ';';
        }
        this.Debug = Gal_Code;
    }
}
class Comment_Statement  extends Append_Args_Statement {
    Debug_Generate()
    {
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        if (this.Block !== undefined)
        {
            this.Block.Debug_Generate();
            Gal_Code += this.Block.Gal;
        }
        else
        {
            Gal_Code += ';';
        }
        this.Debug = Gal_Code;
    }
}
class For_Statement  extends Scoped_Statement {
}
class Interface_Statement  extends Scoped_Statement {
}
// forward Statement_Classify
class Verb_Statement  extends Scoped_Statement {
    constructor()
    {
        super();
        this.Method_Signature = undefined;
        this.Handler_Classes = {};
    }
    Base_Structure()
    {
        this.Class_Context = this;
        var Statement;
        if (this.Block !== undefined && this.Block.Statements !== undefined)
        {
            for (Statement of this.Block.Statements)
            {
                if (Statement instanceof Statement_Classify)
                {
                    Statement.Verb_Owner = this;
                    Statement.Method_Signature = this.Method_Signature;
                }
            }
        }
    }
    Model()
    {
        Compiler.Instance.Add_Verb(this);
        /* comment '. [: Compiler Instance] Add_Class [me];'; */
    }
    Delete_Handler(Handler)
    {
        var Statement;
        var I;
        var L = this.Block.Statements.length - 1;
        for (I=0; I<=L; I++)
        {
            Statement = this.Block.Statements[I];
            if (Statement.Start_Position == Handler.Start_Position && Statement.End_Position == Handler.End_Position)
            {
                this.Block.Statements.splice(I, 1);
                break;
            }
        }
    }
}
class Read_Statement  extends Line_Statement {
}
class Class_Statement  extends Scoped_Statement {
    constructor()
    {
        super();
        this.Name_Prefix = '';
        this.Generate_Constructor = false;
        this.Base_Class = false;
        this.Property_Statements = [];
        this.Class_Property_Statements = [];
        this.Method_Statements = [];
        this.Class_Method_Statements = [];
        this.Main_Body = [];
        this.Constructor = undefined;
        this.Signatures = {};
    }
    Append_Statement(Statement)
    {
        Statement.Class_Owner = this;
        if (Statement instanceof Constructor_Statement)
        {
            /* comment 'writelineClass_Statement.Append_Statement Constructor Statement Found'; */
            this.Constructor = Statement;
        }
        else if (Statement instanceof Class_Property_Statement)
        {
            /* comment 'writelineClass_Statement.Append_Statement - Class Property Statement:  (. Statement To_String)'; */
            this.Class_Property_Statements.push(Statement);
        }
        else if (Statement instanceof Property_Statement)
        {
            this.Property_Statements.push(Statement);
            this.Generate_Constructor = true;
        }
        else if (Statement instanceof Interface_Statement)
        {
            this.Interface_Statements.push(Statement);
        }
        else
        {
            /* comment 'writelineClass_Statement.Append_Statement  [my Class_Name Input] owns method  [. Statement Method_Name Input]'; */
            this.Main_Body.push(Statement);
        }
    }
    Base_Structure()
    {
        this.Class_Context = this;
        var Statement;
        /* comment 'writelineClass Add to Index:  [my Class_Name Input]'; */
        if (this.Block !== undefined && this.Block.Statements !== undefined)
        {
            for (Statement of this.Block.Statements)
            {
                /* comment 'writelinei append statement'; */
                this.Append_Statement(Statement);
            }
        }
        Compiler.Instance.Add_Class(this);
    }
    Model()
    {
        /* comment 'writelineModel Class Statement  (i To_String)'; */
        Compiler.Instance.Add_Class(this);
    }
}
class Program  extends Element {
    constructor()
    {
        super();
        this.Statements = [];
        this.Gal_Statements = undefined;
        this.Fallback_Statements = undefined;
        this.Python_Statements = undefined;
        this.Javascript_Statements = undefined;
        this.Mumps_Statements = undefined;
    }
    Gal_Add_Element(Child_Element)
    {
        if (Child_Element.End_Position > this.End_Position)
        {
            this.End_Position = Child_Element.End_Position;
        }
        this.Elements.push(Child_Element);
        this.Statements.push(Child_Element);
    }
    Gal_Generate()
    {
        var Code = '';
        var Statement;
        for (Statement of this.Statements)
        {
            if (Statement.Gal !== undefined)
            {
                if (Statement.Gal > '')
                {
                    Code += Statement.Gal + "\n";
                }
            }
            else
            {
                Code += '<Error no gal for ' + Statement.To_String() + '>';
                debugger;
            }
        }
        this.Gal_Statements = Code;
        this.Gal = Code;
    }
    Debug_Generate()
    {
        var Code = '';
        var Statement;
        for (Statement of this.Statements)
        {
            if (Statement.Gal)
            {
                Code += Statement.Gal + "\n";
            }
            else
            {
                Code += '<Error no debug for ' + Statement.To_String() + '>';
            }
        }
        this.Gal_Statements = Code;
        this.Debug = Code;
    }
    Fallback_Generate()
    {
        var Code = '';
        var Statement;
        for (Statement of this.Statements)
        {
            Statement.Fallback_Generate();
            Code += Statement.Fallback + "\n";
        }
        this.Fallback_Statements = Code;
        this.Fallback = Code;
    }
    Python_Generate()
    {
        var Code = "\n";
        var Statement;
        for (Statement of this.Statements)
        {
            /* comment 'dv$Statement'; */
            Code += Statement.Python;
        }
        this.Python_Statements = Code;
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Code = "\n";
        var Statement;
        for (Statement of this.Statements)
        {
            Code += Statement.Javascript;
        }
        this.Javascript_Statements = Code;
        this.Javascript = Code;
    }
    Mumps_Generate()
    {
        var Code = '';
        var Statement;
        for (Statement of this.Statements)
        {
            if (Statement.Mumps)
            {
                Code += Statement.Mumps + "\n";
            }
            else
            {
                Code += '<Error no mumps for ' + Statement.To_String() + '>';
            }
        }
        this.Mumps_Statements = Code;
        this.Mumps = Code;
    }
}
class Gal_File  extends Program {
    constructor()
    {
        super();
        this.Start_Position = -1;
        this.End_Position = -1;
        this.File_Name = undefined;
    }
    Read()
    {
        var File_Name = this.File_Name;
        var File_Text;
        File_Text = gal.file_reader.readFileSync(File_Name,'utf8');
        this.Input = File_Text;
    }
    Write()
    {
        var File_Name = this.File_Name;
        var File_Text = this.Input;
        gal.file_reader.writeFileSync(File_Name, File_Text);
    }
}
class Goal_Statement  extends Class_Statement {
}
class Feature_Assignment_Statement  extends Line_Statement {
    constructor()
    {
        super();
        this.Class_Name = undefined;
        this.Property_Name = undefined;
    }
    Fallback_Generate()
    {
        var Prop = this.Property_Name;
        var Cls = this.Class_Name;
        var Parent = '';
        if (this.Parent.Name !== undefined)
        {
            Parent = this.Parent.Name.Fallback;
        }
        var Code = '.= ' + Parent + ' ' + Prop + ' (new ' + Cls + this.Fallback_Args() + ');';
        this.Fallback = Code;
    }
}
class List_Feature_Statement  extends Feature_Assignment_Statement {
    Fallback_Generate()
    {
        var Prop = this.Property_Name;
        var Cls = this.Class_Name;
        var Parent = '';
        if (this.Parent.Name !== undefined)
        {
            Parent = this.Parent.Name.Fallback;
        }
        var Code = 'list List_' + Prop + this.Fallback_Args() + ';' + "\n";
        if (Parent > '')
        {
            Code += '.= ' + Parent + ' ' + Prop + ' List_' + Prop + ';';
        }
        this.Fallback = Code;
    }
}
class Symbol_Statement  extends Scoped_Statement {
}
class Entity_Definition_Statement  extends Statement {
    Fallback_Generate()
    {
        debugger;
        var Name = this.Name.Fallback;
        var Parent = '';
        if (this.Parent.Name !== undefined)
        {
            Parent = this.Parent.Name.Fallback;
        }
        var Code = 'entity.new ' + Name + ' ' + this.Class_Name + this.Fallback_Args() + ';' + "\n";
        if (Parent > '')
        {
            Code += '.= ' + Parent + ' ' + Name + ' ' + Name + ';' + "\n";
        }
        Code += this.Block.Fallback_Statements;
        this.Fallback = Code;
    }
}

class Operation  extends Named_Element {
    Gal_Add_Token(Token)
    {
        if (Token instanceof Start_Token)
        {
            return 1;
        }
        if (Token instanceof Token_Operation_End)
        {
            this.Elements.push(Token);
            this.End_Position = Token.End_Position;
            return -1;
        }
        if (Token instanceof Token_Comma)
        {
            return -1;
        }
        if (Token instanceof End_Token)
        {
            this.Error = 'Expected end-operation token';
            return -999;
        }
        /* comment "TODO:" 'handle comma here'; */
        if (Token instanceof Start_Token)
        {
            return 1;
        }
        this.Elements.push(Token);
        if (this.Verb !== undefined)
        {
            this.Arguments.push(Token);
            this.Listargs.push(Token);
        }
        else
        {
            this.Verb = Token.Input;
            Token.Is_Verb = true;
        }
        this.End_Position = Token.End_Position;
        return 0;
    }
    Gal_Generate()
    {
        var Gal_Code = '(' + this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        Gal_Code += ')';
        this.Gal = Gal_Code;
    }
    Debug_Generate()
    {
        var Gal_Code = '(' + this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        Gal_Code += ')';
        this.Debug = Gal_Code;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(' + this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Fallback;
        }
        Gal_Code += ')';
        this.Fallback = Gal_Code;
    }
}
class Syntax  extends Named_Element {
    constructor()
    {
        super();
        this.Chain_Backward = false;
        this.Chain_Forward = false;
    }
    Gal_Add_Token(Token)
    {
        if (Token instanceof Start_Token)
        {
            return 1;
        }
        if (Token instanceof Token_Syntax_End)
        {
            this.Elements.push(Token);
            this.End_Position = Token.End_Position;
            return -1;
        }
        if (Token instanceof Token_Comma)
        {
            return -1;
        }
        if (Token instanceof End_Token)
        {
            this.Error = 'Expected syntax end token';
            return -999;
        }
        /* comment "TODO:" 'handle comma here'; */
        if (Token instanceof Start_Token)
        {
            return 1;
        }
        this.Elements.push(Token);
        if (this.Verb !== undefined)
        {
            this.Arguments.push(Token);
            this.Listargs.push(Token);
        }
        else
        {
            this.Verb = Token.Input;
            Token.Is_Verb = true;
        }
        this.End_Position = Token.End_Position;
        return 0;
    }
    Gal_Generate()
    {
        /* comment 'writelineSyntax Gal_Generate  (i To_String)'; */
        var First_Char = '[';
        var Last_Char = ']';
        if (this.Chain_Backward)
        {
            First_Char = '';
        }
        if (this.Chain_Forward)
        {
            Last_Char = ',';
        }
        First_Char = '[';
        Last_Char = ']';
        var Gal_Code = First_Char + this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        Gal_Code += Last_Char;
        this.Gal = Gal_Code;
    }
    Debug_Generate()
    {
        var First_Char = '[';
        var Last_Char = ']';
        if (this.Chain_Backward)
        {
            First_Char = '';
        }
        if (this.Chain_Forward)
        {
            Last_Char = ',';
        }
        First_Char = '[';
        Last_Char = ']';
        var Gal_Code = First_Char + this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        Gal_Code += Last_Char;
        this.Debug = Gal_Code;
    }
    Fallback_Generate()
    {
        /* comment 'writelineSyntax Fallback_Generate  (i To_String)'; */
        var First_Char = '[';
        var Last_Char = ']';
        if (this.Chain_Backward)
        {
            First_Char = '';
        }
        if (this.Chain_Forward)
        {
            Last_Char = ',';
        }
        First_Char = '[';
        Last_Char = ']';
        var Gal_Code = First_Char + this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Fallback;
        }
        Gal_Code += Last_Char;
        this.Fallback = Gal_Code;
    }
}
class Keyvalue  extends Named_Element {
    Gal_Add_Token(Token)
    {
        if (Token instanceof Start_Token)
        {
            return 1;
        }
        if (Token instanceof Token_Keyvalue_End)
        {
            this.Elements.push(Token);
            this.End_Position = Token.End_Position;
            return -1;
        }
        if (Token instanceof End_Token)
        {
            /* comment "TODO:" 'log error here'; */
            return -999;
        }
        this.Elements.push(Token);
        this.Arguments.push(Token);
        this.Listargs.push(Token);
        this.End_Position = Token.End_Position;
        return 0;
    }
    Gal_Generate()
    {
        var Gal_Code = '<';
        var Between = '';
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += Between + Argument.Gal;
            Between = ' ';
        }
        Gal_Code += '>';
        this.Gal = Gal_Code;
    }
    Debug_Generate()
    {
        var Gal_Code = '<';
        var Between = '';
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += Between + Argument.Gal;
            Between = ' ';
        }
        Gal_Code += '>';
        this.Debug = Gal_Code;
    }
    Fallback_Generate()
    {
        var Gal_Code = '<';
        var Between = '';
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += Between + Argument.Fallback;
            Between = ' ';
        }
        Gal_Code += '>';
        this.Fallback = Gal_Code;
    }
}
class Repeating_Operation  extends Operation {
    Mumps_Generate()
    {
        var Between = '';
        var Code = '';
        var Argument;
        for (Argument of this.Arguments)
        {
            Code += Between + Argument.Mumps_Atom();
            Between = this.constructor.Mumps_Operator;
        }
        this.M_Expr = Code;
    }
    Javascript_Generate()
    {
        var Between = '';
        var Operation = ' ' + this.constructor.Js_Operator + ' ';
        var Code = '';
        var Argument;
        for (Argument of this.Arguments)
        {
            Code += Between + Argument.Javascript_Atom(this.constructor.Js_Precedence);
            Between = Operation;
        }
        this.Javascript = Code;
    }
    Python_Generate()
    {
        var Between = '';
        var Operation = ' ' + this.constructor.Py_Operator + ' ';
        var Code = '';
        var Argument;
        for (Argument of this.Arguments)
        {
            Code += Between + Argument.Python_Atom(this.constructor.Py_Precedence);
            Between = Operation;
        }
        this.Python = Code;
    }
}
class Binary_Operation  extends Operation {
    Mumps_Generate()
    {
        var First = this.Arguments[0];
        var Second = this.Arguments[1];
        var First_M = First.M_Expression();
        var Second_M = Second.M_Atom();
        var Code = First_M + this.constructor.Mumps_Operator + Second_M;
        this.M_Expr = Code;
    }
    Javascript_Generate()
    {
        var First = this.Arguments[0];
        var Second = this.Arguments[1];
        var Precedence = this.constructor.Js_Precedence;
        var First_Js = First.Javascript_Atom(Precedence);
        var Second_Js = Second.Javascript_Atom(Precedence);
        var Code = First_Js + ' ' + this.constructor.Js_Operator + ' ' + Second_Js;
        this.Javascript = Code;
    }
    Python_Generate()
    {
        var First = this.Arguments[0];
        var Second = this.Arguments[1];
        var Precedence = this.constructor.Py_Precedence;
        var First_Py = First.Python_Atom(Precedence);
        var Second_Py = Second.Python_Atom(Precedence);
        var Code = First_Py + ' ' + this.constructor.Py_Operator + ' ' + Second_Py;
        this.Python = Code;
    }
}
class String_Binary_Operation  extends Operation {
    Mumps_Generate()
    {
        var First = this.Arguments[0];
        var Second = this.Arguments[1];
        var First_M = First.M_Expression();
        var Second_M = Second.M_Atom();
        var Code = First_M + this.constructor.Mumps_Operator + Second_M;
        this.M_Expr = Code;
    }
    Javascript_Generate()
    {
        var First = this.Arguments[0];
        var Second = this.Arguments[1];
        var Precedence = this.constructor.Js_Precedence;
        var First_Js = First.Javascript_Atom(Precedence);
        var Second_Js = Second.Javascript_Atom(Precedence);
        var Code = First_Js + ' ' + this.constructor.Js_Operator + ' ' + Second_Js;
        this.Javascript = Code;
    }
    Python_Generate()
    {
        var First = this.Arguments[0];
        var Second = this.Arguments[1];
        var Precedence = this.constructor.Py_Precedence;
        var First_Py = First.Python_Atom(Precedence);
        var Second_Py = Second.Python_Atom(Precedence);
        if (!(First instanceof Quote))
        {
            First_Py = 'str('  +  First_Py  +  ')';
        }
        if (!(Second instanceof Quote))
        {
            Second_Py = 'str('  +  Second_Py  +  ')';
        }
        var Code = First_Py + ' ' + this.constructor.Py_Operator + ' ' + Second_Py;
        this.Python = Code;
    }
}
class Invocation_Operation  extends Operation {
}
class Unary_Operation  extends Operation {
    constructor()
    {
        super();
        this.First = undefined;
    }
    Mumps_Generate()
    {
        var First_M = this.First.M_Atom();
        var Code = this.constructor.Mumps_Operator + First_M;
        this.M_Atom = Code;
    }
    Javascript_Generate()
    {
        var Precedence = this.constructor.Js_Precedence;
        var First_Js = this.First.Javascript_Atom(Precedence);
        var Code = this.constructor.Js_Operator + '(' + First_Js + ')';
        this.Javascript = Code;
    }
    Python_Generate()
    {
        var Precedence = this.constructor.Py_Precedence;
        var First_Py = this.First.Python_Atom(Precedence);
        var Code = this.constructor.Py_Operator + ' ' + First_Py;
        this.Python = Code;
    }
}
class String_Unary_Operation  extends Unary_Operation {
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Precedence = this.constructor.Py_Precedence;
        var First_Py = this.First.Python_Atom(Precedence);
        if (!(this.First instanceof Quote))
        {
            debugger;
            First_Py = 'str('  +  First_Py  +  ')';
        }
        var Code = this.constructor.Py_Operator + ' ' + First_Py;
        this.Python = Code;
    }
}
class Append_Args_Operation  extends Repeating_Operation {
    Attributes()
    {
        var Argument;
        for (Argument of this.Arguments)
        {
            Argument.Usge = 'string';
        }
    }
}
class Noun_Syntax  extends Syntax {
}
class Declare_Syntax  extends Syntax {
    Python_Generate()
    {
        var Code = this.Variable.Python;
        if (this.Value !== undefined)
        {
            Code += ' = ' + this.Value.Python;
        }
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Code = this.Variable.Javascript;
        if (this.Value !== undefined)
        {
            Code += ' = ' + this.Value.Javascript;
        }
        this.Javascript = Code;
    }
}

/* comment 'Language.gal'; */
class Language extends gal {
    static Verbose = false;
    static Language_Name = 'Language';
    static Languages = {};
    static Generator_Name = undefined;
    static Initialize()
    {
        var Name = this.Language_Name;
        /* comment 'dict.assign [: Language Languages] Name [class.self]'; */
    }
    Get(Element)
    {
    }
    Generate(Element)
    {
    }
}
class Gal  extends Language {
    static Verbose = false;
    Get(Element)
    {
        if (Element.Gal !== undefined)
        {
            return Element.Gal;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Gal_Generate();
    }
    static Parse_Element(Element)
    {
        var Token = Element.Tokens[0];
        var Next = Element.Tokens[1];
        var Parent = Element;
        Parent.Document = Element;
        /* comment 'writelineParent Equals Element:  (. Parent To_String)'; */
        var Document = Element;
        var End = Element.Tokens.length - 1;
        var Position;
        var Comma_Mode = 'unsupported';
        var Child = Factory.Create_Element(Token, Next, Document, Parent, Comma_Mode);
        var Stack = [];
        if (this.Verbose)
        {
            console.log("Gal_Parse push first child ", Child.To_String());
        }
        Stack.push(Child);
        Parent = Child;
        var Comma = false;
        for (Position=1; Position<=End; Position++)
        {
            if (this.Verbose)
            {
                console.log("");
            }
            Token = Element.Tokens[Position];
            Comma = Token instanceof Token_Comma;
            if (this.Verbose)
            {
                console.log("Parse Token ", Token.To_String(), " with stack ", Stack.length, ' comma ', Comma, ' mode ', Comma_Mode);
            }
            /* comment 'writelineParse Token  (. Token To_String) with stack  (list.length Stack) comma  Comma mode  Comma_Mode'; */
            if (Child)
            {
                var Status = Child.Gal_Add_Token(Token);
                if (this.Verbose)
                {
                    console.log("    Element '", Child.To_String(), "' returned status '", Status, "' on Token '", Token.To_String(), "' stack length ", Stack.length, ' comma mode ', Comma_Mode);
                }
                if (Status == 0)
                {
                    if (Token instanceof Value_Token && !(Token.Is_Verb))
                    {
                        if (this.Verbose)
                        {
                            console.log("Appending value token to document body");
                        }
                        Element.Document_Body.push(Token);
                    }
                    continue;
                }
                if (Status < 0)
                {
                    var Stack_Length = Stack.length;
                    var Elem_String = Child.To_String();
                    if (this.Verbose)
                    {
                        console.log("Going to pop with ", Stack_Length, " elements, element ", Elem_String);
                    }
                    if (Stack.length > 0)
                    {
                        Child = Stack.pop();
                        if (Stack.length > 0)
                        {
                            Parent = Stack[Stack.length-1];
                            /* comment 'writelineParent Stack Last:  (. Parent To_String)'; */
                        }
                        else
                        {
                            Parent = Element;
                            /* comment 'writelineParent must equal Element:  (. Parent To_String)'; */
                            /* comment 'writelineChild was  (. Child To_String)'; */
                        }
                        if (Child instanceof Syntax)
                        {
                            Comma_Mode = 'syntax';
                        }
                        else if (Child instanceof Operation)
                        {
                            Comma_Mode = 'operation';
                        }
                        else if (Child instanceof Keyvalue)
                        {
                            Comma_Mode = 'keyvalue';
                        }
                        else
                        {
                            Comma_Mode = 'unsupported';
                        }
                        if (Child instanceof Statement && Child.Block !== undefined)
                        {
                            Element.Document_Body.push(Child.Block);
                        }
                        Element.Document_Body.push(Child);
                        if (this.Verbose)
                        {
                            console.log('Adding element ', Child.To_String(), ' to parent ', Parent.To_String());
                        }
                        Parent.Gal_Add_Element(Child);
                        if (Stack.length > 0)
                        {
                            Child = Stack[Stack.length-1];
                        }
                        else
                        {
                            Child = undefined;
                            if (this.Verbose)
                            {
                                console.log("Stack empty, null element");
                            }
                        }
                    }
                    else
                    {
                        Child = undefined;
                        Parent = Element;
                        if (this.Verbose)
                        {
                            console.log("Empty stack, element null");
                        }
                    }
                    if (!(Comma))
                    {
                        continue;
                    }
                }
                else
                {
                    if (this.Verbose)
                    {
                        console.log("Positive Status ", Status, " on Token ", Token.To_String(), " in element ", Element.To_String(), " stack length ", Stack.length);
                    }
                }
            }
            if (Position < End)
            {
                Next = Element.Tokens[Position + 1];
            }
            else
            {
                Next = undefined;
            }
            if (Token instanceof End_Token)
            {
                if (this.Verbose)
                {
                    console.log("Detected End Token ", Token.To_String(), " in element ", Child.To_String());
                }
            }
            Child = Factory.Create_Element(Token, Next, Document, Parent, Comma_Mode);
            Stack.push(Child);
            Parent = Child;
            if (this.Verbose)
            {
                console.log("Create/Push Element ", Child.To_String(), " stack ", Stack.length, " body elements ", Element.Document_Body.length);
            }
        }
    }
}
class Mumps  extends Language {
    Get(Element)
    {
        if (Element.Mumps !== undefined)
        {
            return Element.Mumps;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Mumps_Generate();
    }
    Parse_Element(Element)
    {
    }
}
class Fallback  extends Language {
    Get(Element)
    {
        if (Element.Fallback !== undefined)
        {
            return Element.Fallback;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Fallback_Generate();
    }
    Parse_Element(Element)
    {
    }
}
class Python  extends Language {
    Get(Element)
    {
        if (Element.Python !== undefined)
        {
            return Element.Python;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Python_Generate();
    }
    Parse_Element(Element)
    {
    }
}
class Javascript  extends Language {
    Get(Element)
    {
        if (Element.Javascript !== undefined)
        {
            return Element.Javascript;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Javascript_Generate();
    }
    Parse_Element(Element)
    {
    }
}
class Python_Fallback  extends Language {
    Get(Element)
    {
        if (Element.Python !== undefined)
        {
            return Element.Python;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        /* comment 'Avoid causing undefined errors in parents.'; */
        this.Python = '';
        try
        {
            Element.Python_Generate();
            Element.Fallback = Element.Gal;
        }
        catch { } 
    }
    Parse_Element(Element)
    {
    }
}
class Javascript_Fallback  extends Language {
    Get(Element)
    {
        if (Element.Javascript !== undefined)
        {
            return Element.Javascript;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        /* comment 'Avoid causing undefined errors in parents.'; */
        this.Javascript = '';
        try
        {
            Element.Javascript_Generate();
            Element.Fallback = Element.Gal;
        }
        catch { } 
    }
    Parse_Element(Element)
    {
    }
}
class Sql  extends Language {
    Get(Element)
    {
        if (Element.Sql !== undefined)
        {
            return Element.Sql;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Sql_Generate();
    }
    Parse_Element(Element)
    {
    }
}
class Debug  extends Language {
    Get(Element)
    {
        if (Element.Debug !== undefined)
        {
            return Element.Debug;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Debug_Generate();
    }
}
class Php  extends Language {
    Get(Element)
    {
        if (Element.Php !== undefined)
        {
            return Element.Php;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Php_Generate();
    }
}
class Java  extends Language {
    Get(Element)
    {
        if (Element.Java !== undefined)
        {
            return Element.Java;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Java_Generate();
    }
}
class Raku  extends Language {
    Get(Element)
    {
        if (Element.Raku !== undefined)
        {
            return Element.Raku;
        }
        return '<Undefined>';
    }
    Generate(Element)
    {
        Element.Raku_Generate();
    }
}
class Language_File  extends Gal_File {
}
class Gal_Input  extends Language_File {
    constructor()
    {
        super();
        this.Name = undefined;
    }
    Tokenize()
    {
        this.Gal_Tokenize();
    }
    Parse()
    {
        Gal.Parse_Element(this);
    }
}
class Gal_Output  extends Language_File {
    Generate(Document)
    {
        var This_Element;
        for (This_Element of Document.Document_Body)
        {
            try
            {
                This_Element.Gal_Generate();
            }
            catch (Error)
            {
                /* comment 'debug;'; */
                var Input_Code = This_Element.Get_Input();
                console.log("error generating gal: ", Error, ' code: ', Input_Code);
                This_Element.Error = Error;
            }
        }
        Document.Gal_Generate();
    }
    Get(Element)
    {
        if (Element.Gal !== undefined)
        {
            return Element.Gal;
        }
        return '';
    }
}
class Test_Output  extends Language_File {
    Generate(Document)
    {
        var This_Element;
        for (This_Element of Document.Document_Body)
        {
            try
            {
                This_Element.Test_Generate();
            }
            catch (Error)
            {
                /* comment 'debug;'; */
                var Input_Code = This_Element.Get_Input();
                console.log("error generating test: ", Error, ' code: ', Input_Code);
                This_Element.Error = Error;
            }
        }
        Document.Test_Generate();
    }
    Get(Element)
    {
        if (Element.Test_Case !== undefined)
        {
            return Element.Test_Case;
        }
        return '';
    }
}
class Fallback_Output  extends Language_File {
    Generate(Document)
    {
        var Gal_Out = new Gal_Output();
        Gal_Out.Generate(Document);
        var This_Element;
        for (This_Element of Document.Document_Body)
        {
            try
            {
                This_Element.Fallback_Generate();
            }
            catch (Error)
            {
                /* comment 'debug;'; */
                var Input_Code = This_Element.Get_Input();
                console.log("error generating fallback`: ", Error, ' code: ', Input_Code);
                This_Element.Error = Error;
            }
        }
        Document.Fallback_Generate();
    }
    Get(Element)
    {
        if (Element.Fallback !== undefined)
        {
            return Element.Fallback;
        }
        return '';
    }
}
class Python_Output  extends Language_File {
    Get(Element)
    {
        if (Element.Python !== undefined)
        {
            return Element.Python;
        }
        return '';
    }
    Generate(Document)
    {
        var Gal_Out = new Gal_Output();
        Gal_Out.Generate(Document);
        /* comment 'entity.new Fall_Out Fallback_Output'; */
        /* comment '. Fall_Out Generate Document'; */
        var This_Element;
        for (This_Element of Document.Document_Body)
        {
            try
            {
                This_Element.Python_Generate();
            }
            catch (Error)
            {
                /* comment 'debug;'; */
                var Input_Code = This_Element.Get_Input();
                console.log("error generating python`: ", Error, ' code: ', Input_Code);
                This_Element.Error = Error;
            }
        }
        Document.Python_Generate();
    }
}
class Javascript_Output  extends Language_File {
    Get(Element)
    {
        if (Element.Javascript !== undefined)
        {
            return Element.Javascript;
        }
        return '';
    }
    Generate(Document)
    {
        var Gal_Out = new Gal_Output();
        Gal_Out.Generate(Document);
        /* comment 'entity.new Fall_Out Fallback_Output'; */
        /* comment '. Fall_Out Generate Document'; */
        var This_Element;
        for (This_Element of Document.Document_Body)
        {
            try
            {
                This_Element.Javascript_Generate();
            }
            catch (Error)
            {
                /* comment 'debug;'; */
                var Input_Code = This_Element.Get_Input();
                console.log("error generating javascript`: ", Error, ' code: ', Input_Code);
                This_Element.Error = Error;
            }
        }
        Document.Javascript_Generate();
    }
}

/* comment 'Atomic_Operation.gal'; */
class Operation_And  extends Repeating_Operation {
    static Gal_Keyword = 'and';
    static Gs_Keyword = 'and';
    static Aliases = " and & && ";
    static Mumps_Operator = '&';
    static Js_Precedence = 6;
    static Js_Operator = '&&';
    static Py_Operator = 'and';
    static Py_Precedence = 6;
    static Php_Operator = 'and';
    static Php_Precedence = 6;
    Attributes()
    {
        var Argument;
        for (Argument of this.Arguments)
        {
            Argument.Usage = 'flag';
        }
    }
}
class Operation_Add  extends Repeating_Operation {
    static Gal_Keyword = '+';
    static Gs_Keyword = '+';
    static Aliases = " add ";
    static Mumps_Operator = '+';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Php_Precedence = 6;
    static Js_Operator = '+';
    static Py_Operator = '+';
    static Php_Operator = '+';
    Attributes()
    {
        var Argument;
        for (Argument of this.Arguments)
        {
            Argument.Usage = 'number';
        }
    }
}
class Operation_Append  extends Append_Args_Operation {
    static Gal_Keyword = 'append';
    static Gs_Keyword = 'append';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Php_Precedence = 6;
    static Py_Operator = ' + ';
    static Js_Operator = ' + ';
    static Php_Operator = ' + ';
    Attributes()
    {
        var Argument;
        for (Argument of this.Arguments)
        {
            Argument.Usage = 'string';
        }
    }
}
class Operation_Call  extends Invocation_Operation {
    static Gal_Keyword = '.';
    static Gs_Keyword = '.';
    static Aliases = " call ";
    constructor()
    {
        super();
        this.Target = undefined;
        this.Method = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Target.Python + '.' + this.Method.Python + '(' + this.Python_Args(', ') + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Target.Javascript + '.' + this.Method.Javascript + '(' + this.Javascript_Args(', ') + ')';
        this.Javascript = Javascript_Code;
    }
    /* comment "php [my Target Php]. [my Method Php]( (i Php_Args ', '))"; */
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Target';
        }
        this.Target = this.Listargs.shift();
        this.Target.Usage = 'value';
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Method';
        }
        this.Method = this.Listargs.shift();
        this.Method.Usage = 'method';
    }
}
class Operation_Colon  extends Invocation_Operation {
    static Gal_Keyword = ':';
    static Gs_Keyword = ':';
    static Aliases = " cm classmethod class.method colon ";
    constructor()
    {
        super();
        this.Target = undefined;
        this.Method = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Target.Python + '.' + this.Method.Python + '(' + this.Python_Args(', ') + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Target.Javascript + '.' + this.Method.Javascript + '(' + this.Javascript_Args(', ') + ')';
        this.Javascript = Javascript_Code;
    }
    /* comment "php [my Target Php]. [my Method Php]( (i Php_Args ', '))"; */
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Target';
        }
        this.Target = this.Listargs.shift();
        this.Target.Usage = 'class';
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Method';
        }
        this.Method = this.Listargs.shift();
        this.Method.Usage = 'method';
    }
}
class Operation_Classpropget  extends Operation {
    static Gal_Keyword = 'classpropget';
    static Gs_Keyword = 'classpropget';
    constructor()
    {
        super();
        this.First = undefined;
        this.Second = undefined;
    }
    Python_Generate()
    {
        var Class_Name;
        var Property_Name;
        if (this.Second !== undefined)
        {
            Class_Name = this.First.Python;
            Property_Name = this.Second.Python;
        }
        else
        {
            Class_Name = 'self.__class__';
            Property_Name = this.First.Python;
        }
        var Code = Class_Name + '.' + Property_Name;
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Class_Name;
        var Property_Name;
        if (this.Second !== undefined)
        {
            Class_Name = this.First.Javascript;
            Property_Name = this.Second.Javascript;
        }
        else
        {
            Class_Name = 'this.constructor';
            if (this.Method_Context !== undefined && this.Method_Context instanceof Class_Method_Statement)
            {
                Class_Name = 'this';
            }
            Property_Name = this.First.Javascript;
        }
        var Code = Class_Name + '.' + Property_Name;
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Second = this.Listargs.shift();
        }
    }
}
class Operation_Contains  extends Binary_Operation {
    static Gal_Keyword = 'contains';
    static Gs_Keyword = 'contains';
    constructor()
    {
        super();
        this.String = undefined;
        this.Search = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Search.Python + ' in ' + this.String.Python;
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.String.Javascript + '.includes(' + this.Search.Javascript + ')';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument String';
        }
        this.String = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Search';
        }
        this.Search = this.Listargs.shift();
    }
}
class Operation_Defined  extends Unary_Operation {
    static Gal_Keyword = 'defined';
    static Gs_Keyword = 'defined';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.First.Python + ' is not None';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + ' !== undefined';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_Dictionary_Get  extends Operation {
    static Gal_Keyword = 'dict.get';
    static Gs_Keyword = 'dict.get';
    static Aliases = " key.get ";
    constructor()
    {
        super();
        this.Dictionary = undefined;
        this.Key = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Dictionary.Python + '[' + this.Key.Python + ']';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Dictionary.Javascript + '[' + this.Key.Javascript + ']';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Dictionary';
        }
        this.Dictionary = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Key';
        }
        this.Key = this.Listargs.shift();
    }
}
class Operation_Key_Exists  extends Operation {
    static Gal_Keyword = 'key.exists';
    static Gs_Keyword = 'key.exists';
    static Aliases = " dict.exists ";
    constructor()
    {
        super();
        this.Dictionary = undefined;
        this.Key = undefined;
    }
    /* comment 'fallback(defined [key  [my Dictionary Fallback]  [my Key Fallback]])'; */
    Python_Generate()
    {
        var Python_Code = this.Key.Python + ' in ' + this.Dictionary.Python + '.keys()';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Key.Javascript + ' in ' + this.Dictionary.Javascript;
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Dictionary';
        }
        this.Dictionary = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Key';
        }
        this.Key = this.Listargs.shift();
    }
}
class Operation_Divide  extends Binary_Operation {
    static Gal_Keyword = '/';
    static Gs_Keyword = '/';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '/';
    static Py_Operator = '/';
    Attributes()
    {
    }
}
class Operation_Equal  extends Binary_Operation {
    static Gal_Keyword = '=';
    static Gs_Keyword = '=';
    static Aliases = " equal eq equals == ";
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '==';
    static Py_Operator = '==';
    Attributes()
    {
    }
}
class Operation_Greater  extends Binary_Operation {
    static Gal_Keyword = 'greater';
    static Gs_Keyword = 'greater';
    static Aliases = " gt ";
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '>';
    static Py_Operator = '>';
    Attributes()
    {
    }
}
class Operation_Greater_Equal  extends Binary_Operation {
    static Gal_Keyword = 'ge';
    static Gs_Keyword = 'ge';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '>=';
    static Py_Operator = '>=';
    Attributes()
    {
    }
}
class Operation_Http_Fetch  extends Operation {
    static Gal_Keyword = 'http.fetch';
    static Gs_Keyword = 'http.fetch';
    Attributes()
    {
    }
}
class Operation_Isa  extends Binary_Operation {
    static Gal_Keyword = 'isa';
    static Gs_Keyword = 'isa';
    static Js_Precedence = 6;
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Class_Name = undefined;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Variable.Javascript + ' instanceof ' + this.Class_Name.Javascript;
        this.Javascript = Javascript_Code;
    }
    Python_Generate()
    {
        var Python_Code = 'isinstance(' + this.Variable.Python + ', ' + this.Class_Name.Python + ')';
        this.Python = Python_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Operation_Is_Null  extends Operation {
    static Gal_Keyword = 'is.null';
    static Gs_Keyword = 'is.null';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Javascript_Generate()
    {
        var Javascript_Code = '(' + this.Variable.Javascript + ' == null || ' + this.Variable.Javascript + ' == "")';
        this.Javascript = Javascript_Code;
    }
    Python_Generate()
    {
        var Python_Code = '(' + this.Variable.Python + ' in (None, ""))';
        this.Python = Python_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}
class Operation_Less  extends Binary_Operation {
    static Gal_Keyword = 'less';
    static Gs_Keyword = 'less';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '<';
    static Py_Operator = '<';
    Attributes()
    {
    }
}
class Operation_Less_Equal  extends Binary_Operation {
    static Gal_Keyword = 'le';
    static Gs_Keyword = 'le';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '<=';
    static Py_Operator = '<=';
    Attributes()
    {
    }
}
class Operation_List_Get  extends Operation {
    static Gal_Keyword = 'list.get';
    static Gs_Keyword = 'list.get';
    constructor()
    {
        super();
        this.List = undefined;
        this.Node = undefined;
    }
    Python_Generate()
    {
        if (!(this.List.Python !== undefined))
        {
            throw this.Failure_Message('List Python missing');
        }
        if (!(this.Node.Python !== undefined))
        {
            throw this.Failure_Message('Node Python missing');
        }
        var Code = this.List.Python + '[' + this.Node.Python + ']';
        this.Python = Code;
    }
    Javascript_Generate()
    {
        if (!(this.List.Javascript !== undefined))
        {
            throw this.Failure_Message('List Javascript missing');
        }
        if (!(this.Node.Javascript !== undefined))
        {
            throw this.Failure_Message('Node Javascript missing');
        }
        var Code = this.List.Javascript + '[' + this.Node.Javascript + ']';
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument List';
        }
        this.List = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Node';
        }
        this.Node = this.Listargs.shift();
    }
}
class Operation_List_Last  extends Unary_Operation {
    static Gal_Keyword = 'list.last';
    static Gs_Keyword = 'list.last';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        if (!(this.First.Python !== undefined))
        {
            throw this.Failure_Message('List Python missing');
        }
        var Code = this.First.Python + '[-1]';
        this.Python = Code;
    }
    Javascript_Generate()
    {
        if (!(this.First.Javascript !== undefined))
        {
            throw this.Failure_Message('List Javascript missing');
        }
        var Code = this.First.Javascript + '[' + this.First.Javascript + '.length-1]';
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_List_Length  extends Unary_Operation {
    static Gal_Keyword = 'list.length';
    static Gs_Keyword = 'list.length';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'len(' + this.First.Python + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.length';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_List_Pop  extends Unary_Operation {
    static Gal_Keyword = 'pop';
    static Gs_Keyword = 'pop';
    static Aliases = " list.pop ";
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.First.Python + '.pop()';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.pop()';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_List_Shift  extends Unary_Operation {
    static Gal_Keyword = 'shift';
    static Gs_Keyword = 'shift';
    static Aliases = " list.shift ";
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.First.Python + '.pop(0)';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.shift()';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_List_Split  extends Binary_Operation {
    static Gal_Keyword = 'split';
    static Gs_Keyword = 'split';
    static Aliases = " list.split ";
    constructor()
    {
        super();
        this.String = undefined;
        this.Delimiter = undefined;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.String.Javascript + '.split(' + this.Delimiter.Javascript + ')';
        this.Javascript = Javascript_Code;
    }
    Python_Generate()
    {
        var Python_Code = this.String.Python + '.split(' + this.Delimiter.Python + ')';
        this.Python = Python_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument String';
        }
        this.String = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Delimiter';
        }
        this.Delimiter = this.Listargs.shift();
    }
}
class Operation_Lowercase  extends Unary_Operation {
    static Gal_Keyword = 'lowercase';
    static Gs_Keyword = 'lowercase';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.First.Python + '.lower()';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.toLowerCase()';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_Is_Lowercase  extends Unary_Operation {
    static Gal_Keyword = 'islower';
    static Gs_Keyword = 'islower';
    static Aliases = " is.lower is.lowercase ";
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.First.Python + '.islower()';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.match(/[a-z]/)';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_Is_Alpha  extends Unary_Operation {
    static Gal_Keyword = 'isalpha';
    static Gs_Keyword = 'isalpha';
    static Aliases = " is.lower is.lowercase ";
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.First.Python + '.isalpha()';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.match(/[a-zA-Z]/)';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_Multiply  extends Repeating_Operation {
    static Gal_Keyword = '*';
    static Gs_Keyword = '*';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '*';
    static Py_Operator = '*';
    Attributes()
    {
    }
}
class Operation_New  extends Invocation_Operation {
    static Gal_Keyword = 'new';
    static Gs_Keyword = 'new';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Class_Name.Python + '(' + this.Python_Args(', ') + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'new ' + this.Class_Name.Javascript + '(' + this.Javascript_Args(', ') + ')';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Operation_Not  extends Unary_Operation {
    static Gal_Keyword = 'not';
    static Gs_Keyword = 'not';
    static Aliases = " ! ";
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '!';
    static Py_Operator = 'not';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_Not_Equal  extends Binary_Operation {
    static Gal_Keyword = '!=';
    static Gs_Keyword = '!=';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '!=';
    static Py_Operator = '!=';
    Attributes()
    {
    }
}
class Operation_Not_Null  extends Operation {
    static Gal_Keyword = 'not.null';
    static Gs_Keyword = 'not.null';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Javascript_Generate()
    {
        var Javascript_Code = '(' + this.Variable.Javascript + ' !== undefined && ' + this.Variable.Javascript + ' > "")';
        this.Javascript = Javascript_Code;
    }
    Python_Generate()
    {
        var Python_Code = '(' + this.Variable.Python + ' is not None and str(' + this.Variable.Python + ') > "")';
        this.Python = Python_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}
class Operation_Or  extends Repeating_Operation {
    static Gal_Keyword = 'or';
    static Gs_Keyword = 'or';
    static Aliases = " | ";
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '||';
    static Py_Operator = 'or';
    Attributes()
    {
    }
}
class Operation_Round  extends Operation {
    static Gal_Keyword = 'round';
    static Gs_Keyword = 'round';
    constructor()
    {
        super();
        this.Number = undefined;
        this.Decimals = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'round(' + this.Number.Python + ', ' + this.Decimals.Python + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Number.Javascript + '.toFixed(' + this.Decimals.Javascript + ')';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Number';
        }
        this.Number = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Decimals';
        }
        this.Decimals = this.Listargs.shift();
    }
}
class Operation_Sql_Escape  extends Unary_Operation {
    static Gal_Keyword = 'sql.escape';
    static Gs_Keyword = 'sql.escape';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_Sql_Query  extends Unary_Operation {
    static Gal_Keyword = 'sql.query';
    static Gs_Keyword = 'sql.query';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_String  extends Unary_Operation {
    static Gal_Keyword = 'string';
    static Gs_Keyword = 'string';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'str(' + this.First.Python + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'String(' + this.First.Javascript + ')';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_String_Equal  extends String_Binary_Operation {
    static Gal_Keyword = 's=';
    static Gs_Keyword = 's=';
    static Aliases = " string.eq ";
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '==';
    static Py_Operator = '==';
    Attributes()
    {
    }
}
class Operation_String_Greater  extends String_Binary_Operation {
    static Gal_Keyword = 'string.gt';
    static Gs_Keyword = 'string.gt';
    static Aliases = " string.gt ";
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '>';
    static Py_Operator = '>';
    Attributes()
    {
    }
}
class Operation_String_Greater_Equal  extends String_Binary_Operation {
    static Gal_Keyword = 'string.ge';
    static Gs_Keyword = 'string.ge';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '>=';
    static Py_Operator = '>=';
    Attributes()
    {
    }
}
class Operation_String_Length  extends String_Unary_Operation {
    static Gal_Keyword = 'string.length';
    static Gs_Keyword = 'string.length';
    static Aliases = " length ";
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'len(' + this.First.Python + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.length';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_String_Less  extends String_Binary_Operation {
    static Gal_Keyword = 'string.lt';
    static Gs_Keyword = 'string.lt';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '<';
    static Py_Operator = '<';
    Attributes()
    {
    }
}
class Operation_String_Less_Equal  extends String_Binary_Operation {
    static Gal_Keyword = 'string.le';
    static Gs_Keyword = 'string.le';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '<=';
    static Py_Operator = '<=';
    Attributes()
    {
    }
}
class Operation_String_Not_Equal  extends String_Binary_Operation {
    static Gal_Keyword = 'string.ne';
    static Gs_Keyword = 'string.ne';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '!=';
    static Py_Operator = '!=';
    Attributes()
    {
    }
}
class Operation_Substring  extends Operation {
    static Gal_Keyword = 'substring';
    static Gs_Keyword = 'substring';
    constructor()
    {
        super();
        this.String_Value = undefined;
        this.Start_Index = undefined;
        this.Length = undefined;
    }
    Javascript_Generate()
    {
        var Code = this.String_Value.Javascript + '.substr(' + this.Start_Index.Javascript;
        if (this.Length !== undefined)
        {
            Code += ', ' + this.Length.Javascript;
        }
        Code += ')';
        this.Javascript = Code;
    }
    Python_Generate()
    {
        var SVal = this.String_Value.Python;
        var Start = this.Start_Index.Python;
        var Code;
        if (this.Length !== undefined)
        {
            var Len = this.Length.Python;
            if (Len == '1')
            {
                Code = SVal  +  '['  +  Start  +  ']';
            }
            else
            {
                Code = SVal  +  '['  +  Start  +  ':('  +  Start  +  ')+('  +  Len  +  ')]';
            }
        }
        else
        {
            Code = SVal  +  '['  +  Start  +  ':]';
        }
        this.Python = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument String_Value';
        }
        this.String_Value = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Start_Index';
        }
        this.Start_Index = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Length = this.Listargs.shift();
        }
    }
}
class Operation_Subtract  extends Binary_Operation {
    static Gal_Keyword = '-';
    static Gs_Keyword = '-';
    static Js_Precedence = 6;
    static Py_Precedence = 6;
    static Js_Operator = '-';
    static Py_Operator = '-';
    Attributes()
    {
    }
}
class Operation_Time_String  extends Operation {
    static Gal_Keyword = 'time.string';
    static Gs_Keyword = 'time.string';
    Python_Generate()
    {
        var Python_Code = 'datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = '(new Date().toISOString())';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Operation_Uppercase  extends Unary_Operation {
    static Gal_Keyword = 'uppercase';
    static Gs_Keyword = 'uppercase';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.First.Python + '.upper()';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.toUpperCase()';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_Titlecase  extends Unary_Operation {
    static Gal_Keyword = 'titlecase';
    static Gs_Keyword = 'titlecase';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.First.Python + '.title()';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.toUpperCase()';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_Is_Uppercase  extends Unary_Operation {
    static Gal_Keyword = 'isupper';
    static Gs_Keyword = 'isupper';
    static Aliases = " is.upper is.uppercase ";
    constructor()
    {
        super();
        this.First = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.First.Python + '.isupper()';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.First.Javascript + '.match(/[A-Z]/)';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_We  extends Invocation_Operation {
    static Gal_Keyword = 'we';
    static Gs_Keyword = 'we';
    constructor()
    {
        super();
        this.Method = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'self.__class__.' + this.Method.Python + '(' + this.Python_Args(', ') + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Class_Name = 'this.constructor';
        if (this.Method_Context !== undefined && this.Method_Context instanceof Class_Method_Statement)
        {
            Class_Name = 'this';
        }
        var Code = Class_Name + '.' + this.Method.Javascript + '(' + this.Javascript_Args(', ') + ')';
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Method';
        }
        this.Method = this.Listargs.shift();
    }
}
class Operation_Whitespace  extends Unary_Operation {
    static Gal_Keyword = 'whitespace';
    static Gs_Keyword = 'whitespace';
    constructor()
    {
        super();
        this.First = undefined;
    }
    Javascript_Generate()
    {
        var Javascript_Code = '!' + this.First.Javascript + '.match(/\\S/)';
        this.Javascript = Javascript_Code;
    }
    Python_Generate()
    {
        var Python_Code = 'not(re.match(r"\\S",' + this.First.Python + '))';
        this.Python = Python_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
    }
}
class Operation_Int2char  extends Operation {
    static Gal_Keyword = 'int2char';
    static Gs_Keyword = 'int2char';
    constructor()
    {
        super();
        this.Integer = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'chr(' + this.Integer.Python + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'String.fromCharCode(' + this.Integer.Javascript + ')';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Integer';
        }
        this.Integer = this.Listargs.shift();
    }
}
class Operation_Char2int  extends Operation {
    static Gal_Keyword = 'char2int';
    static Gs_Keyword = 'char2int';
    constructor()
    {
        super();
        this.Character = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'ord(' + this.Character.Python + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Character.Javascript + '.charCodeAt(0)';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Character';
        }
        this.Character = this.Listargs.shift();
    }
}
class Operation_Environment  extends Operation {
    static Gal_Keyword = 'env';
    static Gs_Keyword = 'env';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'os.environ[' + this.Variable.Python + ']';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'process.env[' + this.Variable.Javascript + ']';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}

class Syntax_Is  extends Syntax {
    static Gal_Keyword = 'is';
    static Gs_Keyword = 'is';
    constructor()
    {
        super();
        this.Superclass = undefined;
    }
    Attributes()
    {
        this.Superclass = this.Listargs.shift();
        /* comment 'writelineIS ToString:  (i To_String)'; */
        /* comment 'writelineParent ToString:  (. [my Parent] To_String)'; */
        this.Parent.Base_Class = true;
    }
    Python_Generate()
    {
        var Python_Code = '(' + this.Superclass.Python + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = ' extends ' + this.Superclass.Javascript;
        this.Javascript = Javascript_Code;
    }
}
class Syntax_Dot  extends Syntax {
    static Gal_Keyword = '.';
    static Gs_Keyword = '.';
    Python_Generate()
    {
        var Python_Code = this.Python_Arguments('.');
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Javascript_Arguments('.');
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Syntax_Colon  extends Syntax {
    static Gal_Keyword = ':';
    static Gs_Keyword = ':';
    Python_Generate()
    {
        var Python_Code = this.Python_Arguments('.');
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Javascript_Arguments('.');
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Syntax_Key  extends Syntax {
    static Gal_Keyword = 'key';
    static Gs_Keyword = 'key';
    constructor()
    {
        super();
        this.Dictionary = undefined;
        this.Key = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Dictionary.Python + '[' + this.Key.Python + ']';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Dictionary.Javascript + '[' + this.Key.Javascript + ']';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Dictionary';
        }
        this.Dictionary = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Key';
        }
        this.Key = this.Listargs.shift();
    }
}
class Syntax_Node  extends Syntax {
    static Gal_Keyword = 'node';
    static Gs_Keyword = 'node';
    constructor()
    {
        super();
        this.List = undefined;
        this.Node = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.List.Python + '[' + this.Node.Python + ']';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.List.Javascript + '[' + this.Node.Javascript + ']';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument List';
        }
        this.List = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Node';
        }
        this.Node = this.Listargs.shift();
    }
}
class Syntax_Line  extends Syntax {
    static Gal_Keyword = 'line';
    static Gs_Keyword = 'line';
    constructor()
    {
        super();
        this.Count = undefined;
    }
    Python_Generate()
    {
        var Code = "'\\n'";
        if (this.Count !== undefined)
        {
            Code += '*' + this.Count.Python;
        }
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Code = '"\\n"';
        if (this.Count !== undefined)
        {
            Code += '.repeat(' + this.Count.Javascript + ')';
        }
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length > 0)
        {
            this.Count = this.Listargs.shift();
        }
    }
}
class Syntax_Tab  extends Syntax {
    static Gal_Keyword = 'tab';
    static Gs_Keyword = 'tab';
    constructor()
    {
        super();
        this.Count = undefined;
    }
    Python_Generate()
    {
        var Code = '"\\t"';
        if (this.Count !== undefined)
        {
            Code += '*' + this.Count.Python;
        }
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Code = '"\\t"';
        if (this.Count !== undefined)
        {
            Code += '.repeat(' + this.Count.Javascript + ')';
        }
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length > 0)
        {
            this.Count = this.Listargs.shift();
        }
    }
}
class Syntax_Backslash  extends Syntax {
    static Gal_Keyword = 'backslash';
    static Gs_Keyword = 'backslash';
    constructor()
    {
        super();
        this.Count = undefined;
    }
    Python_Generate()
    {
        var Code = "gal.backslash(";
        if (this.Count !== undefined)
        {
            Code += this.Count.Python;
        }
        Code += ')';
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Code = "gal.backslash(";
        if (this.Count !== undefined)
        {
            Code += this.Count.Javascript;
        }
        Code += ')';
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length > 0)
        {
            this.Count = this.Listargs.shift();
        }
    }
}
class Syntax_Indent  extends Syntax {
    static Gal_Keyword = 'indent';
    static Gs_Keyword = 'indent';
    constructor()
    {
        super();
        this.Count = undefined;
    }
    Python_Generate()
    {
        var Code = '"    "';
        if (this.Count !== undefined)
        {
            Code += '*' + this.Count.Python;
        }
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Code = '"    "';
        if (this.Count !== undefined)
        {
            Code += '.repeat(' + this.Count.Javascript + ')';
        }
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length > 0)
        {
            this.Count = this.Listargs.shift();
        }
    }
}
class Syntax_String  extends Declare_Syntax {
    static Gal_Keyword = 'string';
    static Gs_Keyword = 'string';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Syntax_Number  extends Declare_Syntax {
    static Gal_Keyword = 'number';
    static Gs_Keyword = 'number';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Syntax_Integer  extends Declare_Syntax {
    static Gal_Keyword = 'integer';
    static Gs_Keyword = 'integer';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Syntax_Entity  extends Declare_Syntax {
    static Gal_Keyword = 'entity';
    static Gs_Keyword = 'entity';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Syntax_Variant  extends Declare_Syntax {
    static Gal_Keyword = 'variant';
    static Gs_Keyword = 'variant';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Syntax_Flag  extends Declare_Syntax {
    static Gal_Keyword = 'flag';
    static Gs_Keyword = 'flag';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Syntax_Dictionary  extends Declare_Syntax {
    static Gal_Keyword = 'dictionary';
    static Gs_Keyword = 'dictionary';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Syntax_List  extends Declare_Syntax {
    static Gal_Keyword = 'list';
    static Gs_Keyword = 'list';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Syntax_Class  extends Syntax {
    static Gal_Keyword = 'class';
    static Gs_Keyword = 'class';
    constructor()
    {
        super();
        this.Expression = undefined;
    }
    Fallback_Generate()
    {
        var Target = 'our';
        if (this.Expression !== undefined)
        {
            Target = ': '  +  this.Expression.Fallback;
        }
        var Code = '[' + Target + ' Global]';
    }
    Python_Generate()
    {
        var Entity = 'self.__class__';
        if (this.Method_Context !== undefined)
        {
            if (this.Method_Context instanceof Class_Method_Statement)
            {
                Entity = 'cls';
            }
        }
        if (this.Expression !== undefined)
        {
            Entity = this.Expression.Python  +  '.__class__';
        }
        var Code = Entity;
        var Argument;
        for (Argument of this.Listargs)
        {
            Code += '.' + Argument.Python;
        }
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Entity = 'this';
        if (this.Expression !== undefined)
        {
            Entity = this.Expression.Javascript;
        }
        var Code = Entity + '.constructor';
        var Argument;
        for (Argument of this.Listargs)
        {
            Code += '.' + Argument.Javascript;
        }
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length > 0)
        {
            this.Expression = this.Listargs.shift();
        }
    }
}
class Syntax_My_Class  extends Syntax {
    static Gal_Keyword = 'my.class';
    static Gs_Keyword = 'my.class';
    static Aliases = " self.class me.class us ";
    Python_Generate()
    {
        var Python_Code = 'self.__class__';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'this.constructor';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Syntax_Class_Name  extends Syntax {
    static Gal_Keyword = 'class.name';
    static Gs_Keyword = 'class.name';
    constructor()
    {
        super();
        this.Entity = undefined;
    }
    Python_Generate()
    {
        var Entity_Code = 'self';
        if (this.Entity !== undefined)
        {
            Entity_Code = this.Entity.Python_Atom(99);
        }
        var Code = Entity_Code + '.__class__.__name__';
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Entity_Code = 'this';
        if (this.Entity !== undefined)
        {
            Entity_Code = this.Entity.Javascript_Atom(99);
        }
        var Code = Entity_Code + '.constructor.name';
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length > 0)
        {
            this.Entity = this.Listargs.shift();
        }
    }
}
class Syntax_Class_Property  extends Syntax {
    static Gal_Keyword = 'class.property';
    static Gs_Keyword = 'class.property';
    constructor()
    {
        super();
        this.First = undefined;
        this.Second = undefined;
    }
    Python_Generate()
    {
        var Class_Name;
        var Property_Name;
        if (this.Second !== undefined)
        {
            Class_Name = this.First.Python;
            Property_Name = this.Second.Python;
        }
        else
        {
            /* comment 'writeline************ debug this here *******************'; */
            if (!(this.Method_Context !== undefined))
            {
                debugger;
                throw 'No Method Context in class property ' + this.First.Python;
            }
            var Context = this.Method_Context;
            /* comment 'dv$Context'; */
            Class_Name = Context.Python_Class;
            /* comment 'dv$Class_Name'; */
            Property_Name = this.First.Python;
        }
        var Code = Class_Name + '.' + Property_Name;
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Class_Name;
        var Property_Name;
        if (this.Second !== undefined)
        {
            Class_Name = this.First.Javascript;
            Property_Name = this.Second.Javascript;
        }
        else
        {
            Class_Name = 'this.constructor';
            if (this.Method_Context !== undefined && this.Method_Context instanceof Class_Method_Statement)
            {
                Class_Name = 'this';
            }
            Property_Name = this.First.Javascript;
        }
        var Code = Class_Name + '.' + Property_Name;
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument First';
        }
        this.First = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Second = this.Listargs.shift();
        }
    }
}
class Syntax_True  extends Noun_Syntax {
    static Gal_Keyword = 'true';
    static Gs_Keyword = 'true';
    Python_Generate()
    {
        var Python_Code = 'True';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'true';
        this.Javascript = Javascript_Code;
    }
    Mumps_Generate()
    {
        var Mumps_Code = '1';
        this.Mumps = Mumps_Code;
    }
    Attributes()
    {
    }
}
class Syntax_False  extends Noun_Syntax {
    static Gal_Keyword = 'false';
    static Gs_Keyword = 'false';
    Python_Generate()
    {
        var Python_Code = 'False';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'false';
        this.Javascript = Javascript_Code;
    }
    Mumps_Generate()
    {
        var Mumps_Code = '0';
        this.Mumps = Mumps_Code;
    }
    Attributes()
    {
    }
}
class Syntax_Null  extends Noun_Syntax {
    static Gal_Keyword = 'null';
    static Gs_Keyword = 'null';
    Python_Generate()
    {
        var Python_Code = 'None';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'undefined';
        this.Javascript = Javascript_Code;
    }
    Mumps_Generate()
    {
        var Mumps_Code = '""';
        this.Mumps = Mumps_Code;
    }
    Attributes()
    {
    }
}
class Syntax_Infinity  extends Syntax {
    static Gal_Keyword = 'infinity';
    static Gs_Keyword = 'infinity';
    Python_Generate()
    {
        var Python_Code = "float('inf')";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'Infinity';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Syntax_Negative_Infinity  extends Syntax {
    static Gal_Keyword = '-infinity';
    static Gs_Keyword = '-infinity';
    Python_Generate()
    {
        var Python_Code = "-float('inf')";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'Number.NEGATIVE_INFINITY';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}

/* comment 'Atomic_Statement_AK.gal'; */
class Statement_Add  extends Line_Statement {
    static Gal_Keyword = 'add';
    static Gs_Keyword = 'add';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Variable.Python + ' += ' + this.Python_Args(' + ') + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Variable.Javascript + ' += ' + this.Javascript_Args(' + ') + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}
class Statement_Append  extends Append_Args_Statement {
    static Gal_Keyword = 'append';
    static Gs_Keyword = 'append';
    static Aliases = " string.append ";
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Variable.Python + ' += ' + this.Python_String_Args(' + ') + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Variable.Javascript + ' += ' + this.Javascript_Args(' + ') + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}
class Statement_Assign  extends Scoped_Statement {
    static Gal_Keyword = '=';
    static Gs_Keyword = '=';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        this.Variable = this.Listargs.shift();
        this.Value = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            var Message = "Too many arguments: 2 expected";
            this.Error = Message;
            throw Message;
        }
    }
    Mumps_Generate()
    {
        var Mumps_Code = ' set ' + this.Variable.Mumps + '=' + this.Value.Mumps + "\n";
        this.Mumps = Mumps_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Variable.Javascript + ' = ' + this.Value.Javascript + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Python_Generate()
    {
        if (!(this.Variable.Python !== undefined))
        {
            throw this.Failure_Message('missing Variable Python');
        }
        if (!(this.Value.Python !== undefined))
        {
            throw this.Failure_Message('missing Value Python');
        }
        var Code = this.Variable.Python + ' = ' + this.Value.Python + "\n";
        this.Python = Code;
    }
}
class Statement_Break  extends Line_Statement {
    static Gal_Keyword = 'break';
    static Gs_Keyword = 'break';
    Python_Generate()
    {
        var Python_Code = 'break' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'break;' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Call  extends Invocation_Statement {
    static Gal_Keyword = '.';
    static Gs_Keyword = '.';
    constructor()
    {
        super();
        this.Target = undefined;
        this.Method = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Target.Python + '.' + this.Method.Python + '(' + this.Python_Args(', ') + ')' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Target.Javascript + '.' + this.Method.Javascript + '(' + this.Javascript_Args(', ') + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Target';
        }
        this.Target = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Method';
        }
        this.Method = this.Listargs.shift();
    }
}
class Statement_Colon  extends Invocation_Statement {
    static Gal_Keyword = ':';
    static Gs_Keyword = ':';
    static Aliases = " c. ";
    constructor()
    {
        super();
        this.Target = undefined;
        this.Method = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Target.Python + '.' + this.Method.Python + '(' + this.Python_Args(', ') + ')' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Target.Javascript + '.' + this.Method.Javascript + '(' + this.Javascript_Args(', ') + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Target';
        }
        this.Target = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Method';
        }
        this.Method = this.Listargs.shift();
    }
}
class Statement_Catch  extends Scoped_Statement {
    static Gal_Keyword = 'catch';
    static Gs_Keyword = 'catch';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Python_Generate()
    {
        var Code = 'except Exception';
        if (this.Variable !== undefined)
        {
            Code += ' as ' + this.Variable.Python;
        }
        Code += this.Python_Block();
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Code = 'catch';
        if (this.Variable !== undefined)
        {
            Code += ' (' + this.Variable.Javascript + ')';
        }
        Code += this.Javascript_Block();
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length > 0)
        {
            this.Variable = this.Listargs.shift();
        }
    }
}
class Statement_Continue  extends Line_Statement {
    static Gal_Keyword = 'continue';
    static Gs_Keyword = 'continue';
    Python_Generate()
    {
        var Python_Code = 'continue' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'continue;' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Class_Method  extends Class_Method_Statement {
    static Gal_Keyword = 'class.method';
    static Gs_Keyword = 'class.method';
    constructor()
    {
        super();
        this.Return_Type = undefined;
        this.Method_Name = undefined;
        this.Python_Class = 'cls';
        this.Method_Signature = undefined;
    }
    Attributes()
    {
        /* comment 'writelineClass Method attributes'; */
        this.Return_Type = this.Listargs.shift();
        this.Method_Name = this.Listargs.shift();
        this.Method_Context = this;
        var Header = 'class.method';
        var Argument;
        for (Argument of this.Arguments)
        {
            /* comment 'The arguments must be consistent, because we need to know the header before generation begins.'; */
            Header += ' ' + Argument.Get_Input();
        }
        this.Method_Signature = Header;
        /* comment 'writelineSaved class method header:  Header'; */
    }
    Python_Generate()
    {
        var Code = '@classmethod' + "\n" + 'def ' + this.Method_Name.Python + '(cls';
        var Args = this.Python_Args(', ');
        if (Args > '')
        {
            Code += ', ' + Args;
        }
        Code += ')' + this.Python_Block();
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'static ' + this.Method_Name.Javascript + '(' + this.Javascript_Args(', ') + ')' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
}
class Statement_Class_Property  extends Class_Property_Statement {
    static Gal_Keyword = 'class.property';
    static Gs_Keyword = 'class.property';
    constructor()
    {
        super();
        this.Data_Type = undefined;
        this.Property_Name = undefined;
        this.Value = undefined;
    }
    Python_Generate()
    {
        var Name_Code = this.Property_Name.Python;
        var Value_Code = 'None';
        var DT = this.Data_Type.Input;
        DT = ' '  +  DT  +  ' ';
        if (' dict dictionary hash '.includes(DT))
        {
            Value_Code = '{}';
        }
        else if (' list array '.includes(DT))
        {
            Value_Code = '[]';
        }
        if (this.Value !== undefined)
        {
            Value_Code = this.Value.Python;
        }
        var Code = Name_Code + ' = ' + Value_Code + "\n";
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Name_Code = this.Property_Name.Javascript;
        var Value_Code = 'undefined';
        var DT = this.Data_Type.Input;
        DT = ' '  +  DT  +  ' ';
        if (' dict dictionary hash '.includes(DT))
        {
            Value_Code = '{}';
        }
        else if (' list array '.includes(DT))
        {
            Value_Code = '[]';
        }
        if (this.Value !== undefined)
        {
            Value_Code = this.Value.Javascript;
        }
        var Code = 'static ' + Name_Code + ' = ' + Value_Code + ';' + "\n";
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Data_Type';
        }
        this.Data_Type = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Property_Name';
        }
        this.Property_Name = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Statement_Comment  extends Comment_Statement {
    static Gal_Keyword = 'comment';
    static Gs_Keyword = 'comment';
    Fallback_Generate()
    {
        var Gal_Code = 'comment ' + this.Enquote(this.Argument_String()) + ';';
        this.Fallback = Gal_Code;
    }
    Python_Generate()
    {
        var Code = '';
        var Arg = this.Get_Input();
        var Lines = Arg.split("\n");
        for (Arg of Lines)
        {
            Code += '# ' + Arg + "\n";
        }
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = '/* ' + this.Get_Input() + ' */' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Constructor  extends Constructor_Statement {
    static Gal_Keyword = 'constructor';
    static Gs_Keyword = 'constructor';
    Python_Generate()
    {
        var Code = 'def __init__(self';
        var Args = this.Python_Args(', ');
        if (Args > '')
        {
            Code += ', ' + Args;
        }
        Code += '):' + "\n" + "    " + 'super().__init__()' + "\n";
        if (this.Parent.Generate_Constructor)
        {
            Code += "    " + 'self.propinit()' + "\n";
        }
        Code += this.Python_Statements();
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Code = 'constructor(';
        var Args = this.Javascript_Args(', ');
        if (Args > '')
        {
            Code += Args;
        }
        Code += ') {' + "\n" + "    " + 'super();' + "\n";
        if (this.Parent.Generate_Constructor)
        {
            Code += "    " + 'this.propinit();' + "\n";
        }
        Code += this.Javascript_Statements() + '}' + "\n";
        this.Javascript = Code;
    }
    Attributes()
    {
    }
}
class Statement_Debug  extends Line_Statement {
    static Gal_Keyword = 'debug';
    static Gs_Keyword = 'debug';
    Python_Generate()
    {
        var Python_Code = 'zdebug.zbreak()' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'debugger;' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Debug_If  extends Line_Statement {
    static Gal_Keyword = 'debugif';
    static Gs_Keyword = 'debugif';
    Python_Generate()
    {
        var Python_Code = 'if ' + this.Python_Args(',') + ':' + "\n" + "    " + 'zdebug.zbreak()' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'if ' + this.Javascript_Args(',') + "\n" + '{' + "\n" + "    " + 'debugger;' + "\n" + '}' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Debug_Stack  extends Line_Statement {
    static Gal_Keyword = 'debug.stack';
    static Gs_Keyword = 'debug.stack';
    Attributes()
    {
    }
}
class Statement_Debug_Variable  extends Line_Statement {
    static Gal_Keyword = 'debug.variable';
    static Gs_Keyword = 'debug.variable';
    Python_Generate()
    {
        var Code = "";
        var Argument;
        for (Argument of this.Arguments)
        {
            var Arg_Name = Argument.Python;
            Code += 'try:' + "\n" + "    " + 'print("' + Arg_Name + ':", ' + Arg_Name + ');' + "\n" + 'except Exception:' + "\n" + "    " + 'print("' + Arg_Name + ':", "<ERROR>")' + "\n";
            this.Python = Code;
        }
    }
    Javascript_Generate()
    {
        var Code = "";
        var Argument;
        for (Argument of this.Arguments)
        {
            var Arg_Name = Argument.Javascript;
            Code += 'try {' + "\n" + "    " + 'console.log("' + Arg_Name + ':", ' + Arg_Name + ');' + "\n" + '}' + "\n" + 'catch {' + "\n" + "    " + 'console.log("' + Arg_Name + ':", "<ERROR>");' + "\n" + '}' + "\n";
            this.Javascript = Code;
        }
    }
    Attributes()
    {
    }
}
class Statement_Dictionary  extends Scoped_Statement {
    static Gal_Keyword = 'dict';
    static Gs_Keyword = 'dict';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Python_Generate()
    {
        var Variable_Code = this.Variable.Python;
        var Value_Code = "";
        var Between = '';
        var Argument;
        for (Argument of this.Listargs)
        {
            Value_Code += Between + Argument.Python;
            Between = ', ';
        }
        var Code = Variable_Code + ' = {' + Value_Code + '}' + "\n";
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Variable_Code = this.Variable.Javascript;
        var Value_Code = "";
        var Between = '';
        var Argument;
        for (Argument of this.Listargs)
        {
            Value_Code += Between + Argument.Javascript;
            Between = ', ';
        }
        var Code = 'var ' + Variable_Code + '= {' + Value_Code + '};' + "\n";
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}
class Statement_Dictionary_Assign  extends Scoped_Statement {
    static Gal_Keyword = 'dict.=';
    static Gs_Keyword = 'dict.=';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Key = undefined;
        this.Value = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Variable.Python + '[' + this.Key.Python + '] = ' + this.Value.Python + ';' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Variable.Javascript + '[' + this.Key.Javascript + '] = ' + this.Value.Javascript + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Key';
        }
        this.Key = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Value';
        }
        this.Value = this.Listargs.shift();
    }
}
class Statement_Else  extends If_Statement {
    static Gal_Keyword = 'else';
    static Gs_Keyword = 'else';
    Python_Generate()
    {
        var Python_Code = 'else' + this.Python_Block();
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'else' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Else_If  extends If_Statement {
    static Gal_Keyword = 'else.if';
    static Gs_Keyword = 'else.if';
    constructor()
    {
        super();
        this.Condition = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'elif ' + this.Condition.Python + this.Python_Block();
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'else if (' + this.Condition.Javascript + ')' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Condition';
        }
        this.Condition = this.Listargs.shift();
    }
}
class Statement_Entity  extends Declare_Statement {
    static Gal_Keyword = 'entity';
    static Gs_Keyword = 'entity';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Statement_Error  extends Append_Args_Statement {
    static Gal_Keyword = 'error';
    static Gs_Keyword = 'error';
    Python_Generate()
    {
        var Python_Code = 'raise Exception(' + this.Python_String_Args(' + ') + ')' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'throw ' + this.Javascript_Args(' + ') + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_File_Append  extends Line_Statement {
    static Gal_Keyword = 'file.append';
    static Gs_Keyword = 'file.append';
    constructor()
    {
        super();
        this.File_Name = undefined;
        this.Appended_Text = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'gal.file_append(' + this.File_Name.Python + ',' + this.Appended_Text.Python + ')' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'gal.file_append(' + this.File_Name.Javascript + ',' + this.Appended_Text.Javascript + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument File_Name';
        }
        this.File_Name = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Appended_Text';
        }
        this.Appended_Text = this.Listargs.shift();
    }
}
class Statement_File_Readall  extends Line_Statement {
    static Gal_Keyword = 'file.readall';
    static Gs_Keyword = 'file.readall';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.File_Name = undefined;
    }
    Python_Generate()
    {
        var Python_Code = '_FH = open(' + this.File_Name.Python + ', "r")' + "\n" + this.Variable.Python + ' = _FH.read()' + "\n" + '_FH.close()' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Varname = this.Variable.Javascript;
        var File_Name = this.File_Name.Javascript;
        var Code = Varname + ' = gal.file_reader.readFileSync(' + File_Name + ",'utf8');" + "\n";
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument File_Name';
        }
        this.File_Name = this.Listargs.shift();
    }
}
class Statement_File_Dump  extends Line_Statement {
    static Gal_Keyword = 'file.dump';
    static Gs_Keyword = 'file.dump';
    constructor()
    {
        super();
        this.File_Text = undefined;
        this.File_Name = undefined;
    }
    Python_Generate()
    {
        var Python_Code = '_FH = open(' + this.File_Name.Python + ', "w")' + "\n" + '_FH.write(' + this.File_Text.Python + ')' + "\n" + '_FH.close()' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'gal.file_reader.writeFileSync(' + this.File_Name.Javascript + ', ' + this.File_Text.Javascript + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument File_Text';
        }
        this.File_Text = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument File_Name';
        }
        this.File_Name = this.Listargs.shift();
    }
}
class Statement_Flag  extends Declare_Statement {
    static Gal_Keyword = 'flag';
    static Gs_Keyword = 'flag';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Statement_Foreach  extends Scoped_Statement {
    static Gal_Keyword = 'foreach';
    static Gs_Keyword = 'foreach';
    constructor()
    {
        super();
        this.List = undefined;
        this.Variable = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'for ' + this.Variable.Python + ' in ' + this.List.Python + this.Python_Block();
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'for (' + this.Variable.Javascript + ' of ' + this.List.Javascript + ')' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument List';
        }
        this.List = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}
class Statement_Forever  extends Scoped_Statement {
    static Gal_Keyword = 'forever';
    static Gs_Keyword = 'forever';
    Python_Generate()
    {
        var Python_Code = 'while True' + this.Python_Block();
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'while (true)' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Forgive  extends Scoped_Statement {
    static Gal_Keyword = 'forgive';
    static Gs_Keyword = 'forgive';
    Python_Generate()
    {
        var Python_Code = 'try' + this.Python_Block() + 'except Exception:' + "\n" + "    " + 'pass' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'try' + this.Javascript_Block() + 'catch { } ' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Forward  extends Line_Statement {
    static Gal_Keyword = 'forward';
    static Gs_Keyword = 'forward';
    constructor()
    {
        super();
        this.Name = undefined;
    }
    Python_Generate()
    {
        var Python_Code = '# forward ' + this.Name.Python + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = '// forward ' + this.Name.Javascript + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
    }
}
class Statement_For_Range  extends For_Statement {
    static Gal_Keyword = 'for.range';
    static Gs_Keyword = 'for.range';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Start_Index = undefined;
        this.End_Index = undefined;
    }
    Python_Generate()
    {
        if (!(this.Variable.Python !== undefined))
        {
            throw this.Failure_Message('Variable Python not defined');
        }
        if (!(this.Start_Index.Python !== undefined))
        {
            throw this.Failure_Message('Start Index Python not defined');
        }
        if (!(this.End_Index.Python !== undefined))
        {
            throw this.Failure_Message('End Index Python not defined');
        }
        var Code = 'for ' + this.Variable.Python + ' in range(' + this.Start_Index.Python + ', ' + this.End_Index.Python + '+1)' + this.Python_Block();
        this.Python = Code;
    }
    Javascript_Generate()
    {
        if (!(this.Variable.Javascript !== undefined))
        {
            throw this.Failure_Message('Variable Javascript not defined');
        }
        if (!(this.Start_Index.Javascript !== undefined))
        {
            throw this.Failure_Message('Start Index Javascript not defined');
        }
        if (!(this.End_Index.Javascript !== undefined))
        {
            throw this.Failure_Message('End Index Javascript not defined');
        }
        var Code = 'for (' + this.Variable.Javascript + '=' + this.Start_Index.Javascript + '; ' + this.Variable.Javascript + '<=' + this.End_Index.Javascript + '; ' + this.Variable.Javascript + '++)' + this.Javascript_Block();
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Start_Index';
        }
        this.Start_Index = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument End_Index';
        }
        this.End_Index = this.Listargs.shift();
    }
}
class Statement_Increment  extends Statement {
    static Gal_Keyword = 'increment';
    static Gs_Keyword = 'increment';
    constructor()
    {
        super();
        this.Numeric = undefined;
    }
    /* comment "python [my Numeric Python] ' += 1' [line];"; */
    Python_Generate()
    {
        var Python_Code = this.Numeric.Python + " += 1" + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Numeric.Javascript + "++;" + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Numeric';
        }
        this.Numeric = this.Listargs.shift();
    }
}
class Statement_And  extends Statement {
    static Gal_Keyword = 'and';
    static Gs_Keyword = 'and';
    constructor()
    {
        super();
        this.Flag = undefined;
        this.Value = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Flag.Python + " &= " + this.Value.Python + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Flag.Javascript + " &= " + this.Value.Javascript + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Flag';
        }
        this.Flag = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Value';
        }
        this.Value = this.Listargs.shift();
    }
}
class Statement_If  extends If_Statement {
    static Gal_Keyword = 'if';
    static Gs_Keyword = 'if';
    constructor()
    {
        super();
        this.Condition = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'if ' + this.Condition.Python + this.Python_Block();
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'if (' + this.Condition.Javascript + ')' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Condition';
        }
        this.Condition = this.Listargs.shift();
    }
}
class Statement_Iterate  extends Scoped_Statement {
    static Gal_Keyword = 'iterate';
    static Gs_Keyword = 'iterate';
    constructor()
    {
        super();
        this.Dictionary = undefined;
        this.Key_Variable = undefined;
        this.Value_Variable = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'for ' + this.Key_Variable.Python + ', ' + this.Value_Variable.Python + ' in ' + this.Dictionary.Python + '.items()' + this.Python_Block();
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'for ([' + this.Key_Variable.Javascript + ', ' + this.Value_Variable.Javascript + '] of Object.entries(' + this.Dictionary.Javascript + '))' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Dictionary';
        }
        this.Dictionary = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Key_Variable';
        }
        this.Key_Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Value_Variable';
        }
        this.Value_Variable = this.Listargs.shift();
    }
}
class Statement_Integer  extends Declare_Statement {
    static Gal_Keyword = 'integer';
    static Gs_Keyword = 'integer';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Statement_Join  extends Assign_Statement {
    static Gal_Keyword = 'join';
    static Gs_Keyword = 'join';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.List = undefined;
        this.Delimiter = undefined;
    }
    /* comment 'python [my Variable Python] =  [my List Python].join( [my Delimiter Python]) [line]'; */
    Python_Generate()
    {
        var Python_Code = this.Variable.Python + ' = ' + this.Delimiter.Python + '.join(' + this.List.Python + ')' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Variable.Javascript + ' = ' + this.List.Javascript + '.join(' + this.Delimiter.Javascript + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument List';
        }
        this.List = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Delimiter';
        }
        this.Delimiter = this.Listargs.shift();
    }
}
class Statement_Know  extends Line_Statement {
    static Gal_Keyword = 'know';
    static Gs_Keyword = 'know';
    Attributes()
    {
    }
}

/* comment 'Atomic_Statement_LZ.gal'; */
class Statement_List  extends Declare_Statement {
    static Gal_Keyword = 'list';
    static Gs_Keyword = 'list';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Attributes()
    {
        this.Variable = this.Listargs.shift();
    }
    Python_Generate()
    {
        var Variable = this.Variable.Python;
        var Args = this.Python_Args(', ');
        var Code = Variable + ' = [' + Args + ']' + "\n";
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Variable = this.Variable.Javascript;
        var Args = this.Javascript_Args(', ');
        var Code = 'var ' + Variable + ' = [' + Args + '];' + "\n";
        this.Javascript = Code;
    }
}
class Statement_List_Clear  extends Line_Statement {
    static Gal_Keyword = 'list.clear';
    static Gs_Keyword = 'list.clear';
    constructor()
    {
        super();
        this.List = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.List.Python + '.clear()';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.List.Javascript + ' = [];';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument List';
        }
        this.List = this.Listargs.shift();
    }
}
class Statement_List_Copy  extends Declare_Statement {
    static Gal_Keyword = 'list.copy';
    static Gs_Keyword = 'list.copy';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
    Python_Generate()
    {
        var Variable = this.Variable.Python;
        var Value = '[]';
        if (this.Value !== undefined)
        {
            Value = this.Value.Python;
        }
        var Code = Variable + ' = ' + Value + "\n";
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Variable = this.Variable.Javascript;
        var Value = '[]';
        if (this.Value !== undefined)
        {
            Value = this.Value.Javascript;
        }
        var Code = 'var ' + Variable + ' = ' + Value + ';' + "\n";
        this.Javascript = Code;
    }
}
class Statement_List_Append  extends Append_Args_Statement {
    static Gal_Keyword = 'push';
    static Gs_Keyword = 'push';
    static Aliases = " list.push list.append ";
    constructor()
    {
        super();
        this.List = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.List.Python + '.extend([' + this.Python_Args(', ') + '])' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.List.Javascript + '.push(' + this.Javascript_Args(', ') + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument List';
        }
        this.List = this.Listargs.shift();
    }
}
class Statement_List_Delete  extends Line_Statement {
    static Gal_Keyword = 'list.delete';
    static Gs_Keyword = 'list.delete';
    static Aliases = " list.remove list.splice ";
    constructor()
    {
        super();
        this.List = undefined;
        this.Index = undefined;
        this.Count = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'del ' + this.List.Python + '[' + this.Index.Python + ':' + this.Index.Python + '+' + this.Count.Python + ']' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.List.Javascript + '.splice(' + this.Index.Javascript + ', ' + this.Count.Javascript + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument List';
        }
        this.List = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Index';
        }
        this.Index = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Count';
        }
        this.Count = this.Listargs.shift();
    }
}
class Statement_Main  extends Method_Statement {
    static Gal_Keyword = 'main';
    static Gs_Keyword = 'main';
    constructor()
    {
        super();
        this.Signatures = {};
        this.Python_Class = '__foobar__';
    }
    Python_Generate()
    {
        var Code = "if __name__ == '__main__'";
        if (this.Listargs.length > 0)
        {
            Code += ':' + "\n" + "    " + 'try:' + "\n" + "    ".repeat(2) + '(' + this.Python_Args(', ') + ') = sys.argv[1:]' + "\n" + "    " + 'except:' + "\n" + "    ".repeat(2) + 'pass' + "\n";
            /* comment `print("Usage: python", sys.argv[0], "(i Python_Args ' ')") [line , indent 2]sys.exit() [line]`; */
            Code += this.Python_Statements();
        }
        else
        {
            Code += this.Python_Block();
        }
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Args_Code = 'let [_node, _code, ' + this.Javascript_Args(', ') + '] = process.argv;' + "\n";
        var Statement;
        var Statements_Code = '';
        for (Statement of this.Block.Statements)
        {
            Statements_Code += Statement.Javascript;
        }
        var Code = '/* Main Program Body */' + "\n" + Args_Code + Statements_Code + "\n";
        this.Javascript = Code;
    }
    Mumps_Generate()
    {
        var Mumps_Code = 'main ; main entry point' + "\n" + this.Block.Mumps + "    " + 'quit' + "\n";
        this.Mumps = Mumps_Code;
    }
    Attributes()
    {
    }
}
class Statement_Method  extends Method_Statement {
    static Gal_Keyword = 'method';
    static Gs_Keyword = 'method';
    constructor()
    {
        super();
        this.Return_Type = undefined;
        this.Method_Name = undefined;
        this.Python_Class = 'self.__class__';
    }
    Attributes()
    {
        this.Return_Type = this.Listargs.shift();
        this.Method_Name = this.Listargs.shift();
        this.Method_Context = this;
    }
    Python_Generate()
    {
        var Code = 'def ' + this.Method_Name.Python + '(self';
        var Args = this.Python_Args(', ');
        var Block = this.Python_Block();
        if (Args > '')
        {
            Code += ', ' + Args;
        }
        Code += ')' + Block;
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Method_Name.Javascript + '(' + this.Javascript_Args(', ') + ')' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
}
class Statement_Module  extends Line_Statement {
    static Gal_Keyword = 'module';
    static Gs_Keyword = 'module';
    Attributes()
    {
    }
}
class Statement_Number  extends Declare_Statement {
    static Gal_Keyword = 'number';
    static Gs_Keyword = 'number';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Statement_Property  extends Property_Statement {
    static Gal_Keyword = 'property';
    static Gs_Keyword = 'property';
    constructor()
    {
        super();
        this.Data_Type = undefined;
        this.Property_Name = undefined;
        this.Value = undefined;
    }
    Python_Generate()
    {
        var Name_Code = this.Property_Name.Python;
        var Value_Code = 'None';
        var DT = this.Data_Type.Input;
        DT = ' '  +  DT  +  ' ';
        if (' dict dictionary hash '.includes(DT))
        {
            Value_Code = '{}';
        }
        else if (' list array '.includes(DT))
        {
            Value_Code = '[]';
        }
        /* comment 'writelineproperty before defined'; */
        if (this.Value !== undefined)
        {
            Value_Code = this.Value.Python;
        }
        /* comment 'writelineproperty after defined'; */
        var Code = 'self.' + Name_Code + ' = ' + Value_Code + "\n";
        /* comment 'writelineProperty Code  Code'; */
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Name_Code = this.Property_Name.Javascript;
        var Value_Code = 'undefined';
        var DT = this.Data_Type.Input;
        DT = ' '  +  DT  +  ' ';
        if (' dict dictionary hash '.includes(DT))
        {
            Value_Code = '{}';
        }
        else if (' list array '.includes(DT))
        {
            Value_Code = '[]';
        }
        if (this.Value !== undefined)
        {
            Value_Code = this.Value.Javascript;
        }
        var Code = 'this.' + Name_Code + ' = ' + Value_Code + ';' + "\n";
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Data_Type';
        }
        this.Data_Type = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Property_Name';
        }
        this.Property_Name = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Statement_Propset  extends Assign_Statement {
    static Gal_Keyword = '.=';
    static Gs_Keyword = '.=';
    constructor()
    {
        super();
        this.Target = undefined;
        this.Property = undefined;
        this.Expression = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Target.Python + '.' + this.Property.Python + ' = ' + this.Expression.Python + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Target.Javascript + '.' + this.Property.Javascript + ' = ' + this.Expression.Javascript + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Target';
        }
        this.Target = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Property';
        }
        this.Property = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Expression';
        }
        this.Expression = this.Listargs.shift();
    }
}
class Statement_Classpropset  extends Assign_Statement {
    static Gal_Keyword = ':=';
    static Gs_Keyword = ':=';
    constructor()
    {
        super();
        this.Target = undefined;
        this.Property = undefined;
        this.Expression = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Target.Python + '.' + this.Property.Python + ' = ' + this.Expression.Python + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Target.Javascript + '.' + this.Property.Javascript + ' = ' + this.Expression.Javascript + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Target';
        }
        this.Target = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Property';
        }
        this.Property = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Expression';
        }
        this.Expression = this.Listargs.shift();
    }
}
class Statement_Our_Equal  extends Assign_Statement {
    static Gal_Keyword = 'our=';
    static Gs_Keyword = 'our=';
    static Aliases = " our.= us= us.= ours= ours.= ";
    constructor()
    {
        super();
        this.Property = undefined;
        this.Expression = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'cls.' + this.Property.Python + ' = ' + this.Expression.Python + "\n";
        this.Python = Python_Code;
    }
    /* comment "TODO:" 'javascript context this.prototype vs this'; */
    Javascript_Generate()
    {
        var Javascript_Code = 'this.' + this.Property.Javascript + ' = ' + this.Expression.Javascript + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Property';
        }
        this.Property = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Expression';
        }
        this.Expression = this.Listargs.shift();
    }
}
class Statement_Read_Line  extends Read_Statement {
    static Gal_Keyword = 'readline';
    static Gs_Keyword = 'readline';
    Python_Generate()
    {
        var Argument;
        var Argument_Python;
        var Code = '';
        for (Argument of this.Arguments)
        {
            Argument_Python = Argument.Python;
            if (Argument instanceof Quote)
            {
            }
            if (Argument instanceof Token_Name)
            {
                Code += Argument_Python + ' = input()' + "\n";
            }
            else
            {
                Code += "print(" + Argument_Python + ",sep='',end='')" + "\n";
            }
        }
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Argument;
        var Argument_Javascript;
        var Code = '';
        for (Argument of this.Arguments)
        {
            Argument_Javascript = Argument.Javascript;
            if (Argument instanceof Quote)
            {
            }
            if (Argument instanceof Token_Name)
            {
                Code += Argument_Javascript + ' = console.input();' + "\n";
            }
            else
            {
                Code += 'console.log(' + Argument_Javascript + ');' + "\n";
            }
        }
        this.Python = Code;
    }
    Attributes()
    {
    }
}
class Statement_Replace  extends Line_Statement {
    static Gal_Keyword = 'replace';
    static Gs_Keyword = 'replace';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Search_Text = undefined;
        this.Replace_Text = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Variable.Python + ' = ' + this.Variable.Python + '.replace(' + this.Search_Text.Python + ', ' + this.Replace_Text.Python + ')' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Variable.Javascript + ' = ' + this.Variable.Javascript + '.replaceAll(' + this.Search_Text.Javascript + ', ' + this.Replace_Text.Javascript + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Search_Text';
        }
        this.Search_Text = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Replace_Text';
        }
        this.Replace_Text = this.Listargs.shift();
    }
}
class Statement_Return  extends Line_Statement {
    static Gal_Keyword = 'return';
    static Gs_Keyword = 'return';
    constructor()
    {
        super();
        this.Value = undefined;
    }
    Python_Generate()
    {
        var Value_Python = '';
        if (this.Value !== undefined)
        {
            Value_Python += ' ' + this.Value.Python;
        }
        var Code = 'return' + Value_Python + "\n";
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Value_Javascript = '';
        if (this.Value !== undefined)
        {
            Value_Javascript += ' ' + this.Value.Javascript;
        }
        var Code = 'return' + Value_Javascript + ';' + "\n";
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Statement_Sort  extends Line_Statement {
    static Gal_Keyword = 'sort';
    static Gs_Keyword = 'sort';
    constructor()
    {
        super();
        this.List = undefined;
        this.Method = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument List';
        }
        this.List = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Method = this.Listargs.shift();
        }
    }
}
class Statement_String  extends Append_Args_Statement {
    static Gal_Keyword = 'string';
    static Gs_Keyword = 'string';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Attributes()
    {
        this.Variable = this.Listargs.shift();
        this.Variable.Usage = 'variable';
        var Argument;
        for (Argument of this.Listargs)
        {
            Argument.Usage = 'string';
        }
    }
    Python_Generate()
    {
        var Var_Code = this.Variable.Python;
        var Val_Code;
        if (this.Listargs.length > 0)
        {
            Val_Code = this.Python_String_Args(' + ');
        }
        else
        {
            Val_Code = "None";
        }
        var Code = Var_Code + ' = ' + Val_Code + "\n";
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Var_Code = this.Variable.Javascript;
        var Val_Code;
        if (this.Listargs.length > 0)
        {
            Val_Code = ' = '  +  this.Javascript_Args(' + ');
        }
        else
        {
            Val_Code = "";
        }
        var Code = 'var ' + Var_Code + Val_Code + ';' + "\n";
        this.Javascript = Code;
    }
}
class Statement_Try  extends Scoped_Statement {
    static Gal_Keyword = 'try';
    static Gs_Keyword = 'try';
    Python_Generate()
    {
        var Python_Code = 'try' + this.Python_Block();
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'try' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Variant  extends Declare_Statement {
    static Gal_Keyword = 'variant';
    static Gs_Keyword = 'variant';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Value = this.Listargs.shift();
        }
    }
}
class Statement_While  extends Scoped_Statement {
    static Gal_Keyword = 'while';
    static Gs_Keyword = 'while';
    constructor()
    {
        super();
        this.Condition = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'while ' + this.Condition.Python + this.Python_Block();
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'while (' + this.Condition.Javascript + ')' + this.Javascript_Block();
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Condition';
        }
        this.Condition = this.Listargs.shift();
    }
}
class Statement_Write  extends Append_Args_Statement {
    static Gal_Keyword = 'write';
    static Gs_Keyword = 'write';
    Python_Generate()
    {
        var Code = 'print(' + this.Python_Args(', ');
        if (this.Listargs.length > 1)
        {
            Code += ",sep=''";
        }
        Code += ",end='')" + "\n";
        this.Python = Code;
    }
    Attributes()
    {
    }
}
class Statement_Class  extends Class_Statement {
    static Gal_Keyword = 'class';
    static Gs_Keyword = 'class';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Debug_Generate()
    {
        var Gal_Code = this.constructor.Gal_Keyword;
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += ' ' + Argument.Gal;
        }
        if (this.Block !== undefined)
        {
            this.Block.Debug_Generate();
            Gal_Code += this.Block.Gal;
        }
        else
        {
            Gal_Code += ';';
        }
        this.Debug = Gal_Code;
    }
    Fallback_Generate()
    {
        var Name = this.Class_Name.Input;
        var Owner_Class = Compiler.Instance.Get_Class(Name);
        var Statement;
        var Argument;
        if (this.Am(Owner_Class))
        {
            var Ancestor = '';
            if (this.Listargs.length > 0)
            {
                Ancestor += ' ' + this.Listargs[this.Listargs.length-1].Fallback;
            }
            var Arguments = ' ' + this.Class_Name.Fallback + ' ' + Ancestor;
            var Class_Properties = '';
            var Prop;
            for (Prop of this.Class_Property_Statements)
            {
                Prop.Fallback_Generate();
                Class_Properties += Prop.Fallback;
            }
            var Block = Class_Properties;
            if (this.Constructor !== undefined)
            {
                this.Constructor.Fallback_Generate();
                var Thiscon = this.Indent(this.Constructor.Fallback);
                Block += Thiscon;
            }
            var Prop_Code = '';
            for (Prop of this.Property_Statements)
            {
                Prop.Fallback_Generate();
                Block += Prop.Fallback + "\n";
            }
            var MBGal = '';
            for (Statement of this.Main_Body)
            {
                Statement.Fallback_Generate();
                MBGal += Statement.Fallback;
            }
            Block += MBGal;
            Block = this.Indent(Block);
            var Code = 'class' + Arguments + "\n" + '{' + "\n" + Block + '}' + "\n";
            this.Fallback = Code;
        }
        else
        {
            for (Argument of this.Listargs)
            {
                Owner_Class.Listargs.push(Argument);
            }
            for (Statement of this.Block.Statements)
            {
                Owner_Class.Block.Add_Statement(Statement);
                Owner_Class.Append_Statement(Statement);
            }
            if (Owner_Class.Block.Fallback !== undefined)
            {
                Owner_Class.Block.Fallback_Generate();
            }
            if (Owner_Class.Fallback !== undefined)
            {
                Owner_Class.Fallback_Generate();
            }
            this.Fallback = '';
        }
    }
    Python_Generate()
    {
        var Null_Block = true;
        var Arguments = this.Python_Arguments(' ');
        var Class_Properties = '';
        var MBPy = '';
        var Prop;
        var Statement;
        for (Prop of this.Class_Property_Statements)
        {
            Class_Properties += Prop.Python;
            Null_Block = false;
        }
        var Block = '';
        Block += this.Indent(Class_Properties);
        if (this.Constructor !== undefined)
        {
            var Thiscon = this.Indent(this.Constructor.Python);
            Block += Thiscon;
            Null_Block = false;
        }
        if (this.Generate_Constructor)
        {
            Null_Block = false;
            var Prop_Code = '';
            for (Prop of this.Property_Statements)
            {
                Prop_Code += Prop.Python;
            }
            var Function = '__init__';
            var Super = "    " + 'super().__init__()' + "\n";
            if (this.Constructor !== undefined)
            {
                Function = 'propinit';
                Super = '';
            }
            var Constructor = 'def ' + Function + '(self):' + "\n";
            Constructor += Super;
            Constructor += this.Indent(Prop_Code);
            Constructor = this.Indent(Constructor);
            Block += Constructor;
        }
        for (Statement of this.Main_Body)
        {
            MBPy += Statement.Python;
            Null_Block = false;
        }
        MBPy = this.Indent(MBPy);
        Block += MBPy;
        if (Null_Block)
        {
            Block += "    " + 'pass' + "\n";
        }
        var Code = 'class ' + Arguments + ':' + "\n" + Block;
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Arguments = this.Javascript_Arguments(' ');
        if (!(this.Base_Class))
        {
            Arguments += ' extends gal';
        }
        var Class_Properties = '';
        var MBjs = '';
        var Prop;
        var Statement;
        for (Prop of this.Class_Property_Statements)
        {
            Class_Properties += Prop.Javascript;
        }
        var Block = ' {' + "\n";
        Block += this.Indent(Class_Properties);
        if (this.Generate_Constructor)
        {
            var Prop_Code = '';
            for (Prop of this.Property_Statements)
            {
                Prop_Code += Prop.Javascript;
            }
            var Constructor = this.Indent(Prop_Code);
            Constructor = this.Indent(Constructor);
            Constructor = "    "  +  'constructor()'  +  "\n"  +  "    "  +  '{'  +  "\n"  +  "    ".repeat(2)  +  'super();'  +  "\n"  +  Constructor  +  "    "  +  '}'  +  "\n";
            Block += Constructor;
        }
        else if (this.Constructor !== undefined)
        {
            Block += this.Constructor.Javascript;
        }
        var StmtJs;
        for (Statement of this.Main_Body)
        {
            if (!(Statement.Javascript !== undefined))
            {
                throw "Class method statement Javascript not defined: " + Statement.Gal_Code();
            }
            var Stmt_Js = Statement.Javascript;
            MBjs += Stmt_Js;
        }
        MBjs = this.Indent(MBjs);
        Block += MBjs + '}' + "\n";
        var Code = 'class ' + Arguments + Block;
        this.Javascript = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
        this.Class_Name.Usage = 'class';
    }
}

/* comment 'Fallback.gal'; */
class Definition_Statement  extends Scoped_Statement {
    static Gal_Keyword = undefined;
    static Aliases = undefined;
    static Base_Class = undefined;
    constructor()
    {
        super();
        this.Name_Arg = undefined;
        this.Keyword = undefined;
        this.Root_Type = undefined;
        this.Class_Name = undefined;
        this.Generate_Attributes = undefined;
        this.Argument_Statements = [];
        this.Declarations = '';
        this.Name_Prefix = '';
    }
    Attributes()
    {
        this.Name_Arg = this.Listargs.shift();
        this.Keyword = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Root_Type = this.Listargs.shift();
            /* comment 'writelineAssign Root Type:  [my Root_Type Gal]'; */
        }
        var Name = this.constructor.Base_Class;
        Name += '_';
        Name += this.Name_Arg.Input;
        var Token_Entity = new Token_Name();
        Token_Entity.Input = Name;
        this.Class_Name = Token_Entity;
        Compiler.Instance.Add_Class(this);
        Compiler.Instance.Add_Definition(this);
    }
    Append_Statement(Statement)
    {
        /* comment 'definition statement append statement'; */
        this.Block.Statements.push(Statement);
    }
    Structure()
    {
        if (!(this.Re_Structure))
        {
            return;
        }
        this.Re_Structure = false;
        this.Base_Structure();
        this.Generate_Attributes = true;
        if (this.Block !== undefined && this.Block.Statements !== undefined)
        {
            /* comment 'writelineMain Structure  [class.name]  [my Name_Arg Input]'; */
            for (Statement of this.Block.Statements)
            {
                /* comment 'writelineStructure Statement  [class.name Statement]'; */
                if (Statement instanceof Method_Statement && Statement.Method_Name.Input == 'Attributes')
                {
                    this.Generate_Attributes = false;
                }
                else if (Statement instanceof Argument_Statement)
                {
                    this.Argument_Statements.push(Statement);
                }
            }
        }
        var Element;
        for (Element of this.Elements)
        {
            /* comment '.= Element Parent [me]'; */
        }
        /* comment 'writeline***  [class.name]  [my Name_Arg Input].Structure determined Generate_Attributes is  [my Generate_Attributes] ***'; */
    }
    Fallback_Generate()
    {
        var Class_Name = this.constructor.Base_Class + '_' + this.Name_Arg.Fallback;
        var Gal_Code = 'class ' + Class_Name;
        if (this.Root_Type !== undefined)
        {
            var PC = this.Root_Type;
            if (!(PC.Fallback !== undefined))
            {
                PC.Fallback_Generate();
            }
            var Underscore = '_';
            var PCFB = PC.Fallback;
            Gal_Code += ' [is ' + PCFB;
            Gal_Code += Underscore;
            Gal_Code += this.constructor.Base_Class + ']';
            /* comment 'writelinePCFB  PCFB entity:  (. PC To_String) self:  (i To_String) gal:  [my Gal]'; */
        }
        else
        {
            Gal_Code += ' [is ' + this.constructor.Base_Class + ']';
        }
        Gal_Code += "\n" + '{' + "\n" + "    " + "class.property string Gal_Keyword '" + this.Keyword.Fallback + "';" + "\n" + "    " + "class.property string Gs_Keyword '" + this.Keyword.Fallback + "';" + "\n";
        if (this.Block)
        {
            this.Block.Fallback_Generate();
            Gal_Code += this.Block.Fallback_Statements;
        }
        if (this.Generate_Attributes)
        {
            var Attribute_Statements = '';
            var Statement;
            if (this.Block)
            {
                for (Statement of this.Block.Statements)
                {
                    if (Statement.Gal_Declaration !== undefined)
                    {
                        Attribute_Statements += Statement.Gal_Declaration;
                    }
                }
                var Indented = this.Indent(Attribute_Statements);
                /* comment 'writeline***  [class.name]  [my Name_Arg Fallack] - Attribute Statements:  Attribute_Statements [line]indented: [line] Indented'; */
                var Attribute_Method = 'method void Attributes' + "\n" + '{' + "\n" + Indented + '}' + "\n";
                Gal_Code += this.Indent(Attribute_Method);
            }
        }
        Gal_Code += '}' + "\n";
        var Definition = ': ' + Class_Name + ' Initialize [self];';
        this.Fallback = Gal_Code;
        this.Fallback_Declaration = Definition;
    }
}
class Statement_Statement  extends Definition_Statement {
    static Gal_Keyword = 'statement';
    static Base_Class = 'Statement';
}
class Statement_Operation  extends Definition_Statement {
    static Gal_Keyword = 'operation';
    static Base_Class = 'Operation';
}
class Statement_Syntax  extends Definition_Statement {
    static Gal_Keyword = 'syntax';
    static Base_Class = 'Syntax';
}
class Statement_Argument  extends Argument_Statement {
    static Gal_Keyword = 'argument';
    static Gs_Keyword = 'argument';
    constructor()
    {
        super();
        this.Argument_Name = undefined;
        this.Type_Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required Argument_Name';
        }
        this.Argument_Name = this.Listargs.shift();
        this.Argument_Name.Usage = 'variable';
        if (this.Listargs.length > 0)
        {
            this.Type_Value = this.Listargs.shift();
            this.Type_Value.Usage = 'value';
        }
    }
    Fallback_Generate()
    {
        var Definition = 'property entity ' + this.Argument_Name.Fallback + ';';
        var Code = "if (= (list.length [. [me] Listargs]) 0)" + "\n" + "{" + "\n" + "    " + "error 'missing required argument " + this.Argument_Name.Fallback + "';" + "\n" + "}" + "\n";
        Code += '.= [me] ' + this.Argument_Name.Fallback + ' (list.shift [. [me] Listargs]);' + "\n";
        if (this.Type_Value !== undefined)
        {
            Code += '.= [. [me] ' + this.Argument_Name.Fallback + '] Usage ' + this.Type_Value.Fallback + ';' + "\n";
        }
        this.Gal_Declaration = Code;
        this.Fallback = Definition;
    }
}
class Statement_Keyword  extends Argument_Statement {
    static Gal_Keyword = 'keyword';
    static Gs_Keyword = 'keyword';
    constructor()
    {
        super();
        this.Argument_Name = undefined;
        this.Type_Value = undefined;
    }
    Fallback_Generate()
    {
        var Definition = 'property entity ' + this.Argument_Name.Fallback + ';';
        var Code = "if (= (list.length [. [me] Keywords]) 0)" + "\n" + "{" + "\n" + "    " + "error 'missing required keyword " + this.Argument_Name.Fallback + "';" + "\n" + "}" + "\n";
        Code += '.= [me] ' + this.Argument_Name.Fallback + ' (list.shift [. [me] Keywords]);' + "\n";
        if (this.Type_Value !== undefined)
        {
            Code += '.= [. [me] ' + this.Argument_Name.Fallback + '] Usage ' + this.Type_Value.Fallback + ';' + "\n";
        }
        this.Gal_Declaration = Code;
        this.Fallback = Definition;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Argument_Name';
        }
        this.Argument_Name = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Type_Value = this.Listargs.shift();
        }
    }
}
class Statement_Optional  extends Argument_Statement {
    static Gal_Keyword = 'optional';
    static Gs_Keyword = 'optional';
    constructor()
    {
        super();
        this.Argument_Name = undefined;
        this.Type_Value = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw this.constructor.name + ' missing required Argument_Name';
        }
        this.Argument_Name = this.Listargs.shift();
        this.Argument_Name.Usage = 'variable';
        if (this.Listargs.length > 0)
        {
            this.Type_Value = this.Listargs.shift();
            this.Type_Value.Usage = 'value';
        }
    }
    Fallback_Generate()
    {
        var Definition = 'property entity ' + this.Argument_Name.Fallback + ';';
        var Code = 'if (gt (list.length [. [me] Listargs]) 0)' + "\n" + '{' + "\n";
        Code += "    " + '.= [me] ' + this.Argument_Name.Fallback + ' (list.shift [. [me] Listargs]);' + "\n";
        if (this.Type_Value !== undefined)
        {
            Code += "    " + '.= [. [me] ' + this.Argument_Name.Fallback;
            Code += '] Usage ' + this.Type_Value.Fallback + ';' + "\n";
        }
        Code += '}' + "\n";
        this.Gal_Declaration = Code;
        this.Fallback = Definition;
    }
}
class Statement_Fallback  extends Append_Args_Statement {
    static Gal_Keyword = 'fallback';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Fallback_Generate' + "\n" + '{' + "\n" + "    " + 'string Gal_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            Argument_Code = Argument.Fallback;
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Fallback]';
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Fallback Gal_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Atomic  extends Append_Args_Statement {
    static Gal_Keyword = 'atomic';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Atomic_Generate' + "\n" + '{' + "\n" + "    " + 'string Atomic_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            Argument_Code = Argument.Fallback;
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Atomic]';
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Atomic Atomic_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Gs  extends Append_Args_Statement {
    static Gal_Keyword = 'gs';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Gs_Generate' + "\n" + '{' + "\n" + "    " + 'string Gs_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            Argument_Code = Argument.Fallback;
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Gs]';
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Gs Gs_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Javascript  extends Append_Args_Statement {
    static Gal_Keyword = 'javascript';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Javascript_Generate' + "\n" + '{' + "\n" + "    " + 'string Javascript_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            Argument_Code = Argument.Fallback;
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Javascript]';
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Javascript Javascript_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Mumps  extends Append_Args_Statement {
    static Gal_Keyword = 'mumps';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Mumps_Generate' + "\n" + '{' + "\n" + "    " + 'string Mumps_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            Argument_Code = Argument.Fallback;
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Mumps]';
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Mumps Mumps_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Python  extends Line_Statement {
    static Gal_Keyword = 'python';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Python_Generate' + "\n" + '{' + "\n" + "    " + 'string Python_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            Argument_Code = Argument.Fallback;
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Python]';
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Python Python_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Php  extends Line_Statement {
    static Gal_Keyword = 'php';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Python_Generate' + "\n" + '{' + "\n" + "    " + 'string Php_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            Argument_Code = Argument.Fallback;
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Php]';
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Php Php_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Java  extends Line_Statement {
    static Gal_Keyword = 'java';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Python_Generate' + "\n" + '{' + "\n" + "    " + 'string Java_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            Argument_Code = Argument.Fallback;
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Java]';
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Java Java_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Raku  extends Line_Statement {
    static Gal_Keyword = 'raku';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Python_Generate' + "\n" + '{' + "\n" + "    " + 'string Raku_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            Argument_Code = Argument.Fallback;
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Raku]';
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Raku Raku_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Gal_Language  extends Definition_Statement {
    static Base_Class = 'Language';
    static Gal_Keyword = 'gal.language';
    constructor()
    {
        super();
        this.Language_Name = undefined;
    }
    /* comment "TODO:" 'iterate handlers and append them to the target class. tell each handler the name of its generator method e.g. Python_Generate.'; */
    Attributes()
    {
        this.Language_Name = this.Listargs.shift();
    }
    /* comment 'method void Structure'; */
    Model()
    {
    }
    Fallback_Generate()
    {
        var Gal_Body = this.Indent(this.Declarations);
        if (this.Block)
        {
            Gal_Body += this.Block.Fallback_Statements;
        }
        var Gal_Code = 'class ' + this.Language_Name.Fallback + ' [is Language]' + "\n" + '{' + "\n" + Gal_Body + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Classify  extends Method_Statement {
    static Gal_Keyword = 'isa';
    static Gs_Keyword = 'isa';
    constructor()
    {
        super();
        this.Class_Name = undefined;
        this.Method_Name = undefined;
        this.Verb_Owner = undefined;
        this.Method_Context = undefined;
        this.Variable_Context = undefined;
        this.Class_Name = undefined;
        this.Method_Signature = undefined;
    }
    Attributes()
    {
        this.Class_Name = this.Listargs.shift();
        this.Method_Context = this;
        this.Method_Signature = 'method flag '  +  this.Class_Name.Input;
    }
    Model()
    {
        if (this.Verb_Owner !== undefined)
        {
            this.Method_Name = this.Verb_Owner.Class_Name;
        }
    }
    Fallback_Generate()
    {
        var Header = this.Parent.Method_Signature;
        var Append_To = this.Class_Name.Fallback;
        var Method = Header + "\n" + '{' + "\n" + this.Block.Fallback_Statements + "    " + 'return [true];' + "\n" + '}';
        var Code = 'class.append ' + Append_To + "\n" + '{' + "\n" + this.Indent(Method) + '}';
        this.Fallback = Code;
    }
}
class Statement_Infer  extends Method_Statement {
    static Gal_Keyword = 'infer';
    static Gs_Keyword = 'infer';
    /* comment "fallback 'method void Infer' [my Block Fallback];"; */
    Fallback_Generate()
    {
        var Block_Code = '';
        try
        {
            Block_Code += this.Block.Fallback_Statements;
        }
        catch { } 
        var Code = 'method void Infer' + "\n" + '{' + "\n" + Block_Code + "    " + 'return [true];' + "\n" + '}';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Verb  extends Verb_Statement {
    static Gal_Keyword = 'verb';
    static Gs_Keyword = 'verb';
    static Aliases = " polymorph ";
    constructor()
    {
        super();
        this.DT = undefined;
        this.Class_Name = undefined;
        this.Method_Signature = undefined;
        this.Name_Prefix = '';
        this.Property_Name = undefined;
    }
    Attributes()
    {
        var Header = 'method';
        var Argument;
        for (Argument of this.Arguments)
        {
            /* comment 'The arguments must be consistent, because we need to know the header before generation begins.'; */
            Header += ' ' + Argument.Get_Input();
        }
        this.Method_Signature = Header;
        this.DT = this.Listargs.shift();
        this.Class_Name = this.Listargs.shift();
        var Name_Text = this.Class_Name.Get_Input();
        this.Property_Name = Name_Text;
    }
    Inference_Context()
    {
        return this;
    }
    Gal_Generate()
    {
        var Code = this.Block.Gal_Statements;
        this.Gal = Code;
    }
    Fallback_Generate()
    {
        var Gal_Code = '';
        this.Fallback = Gal_Code;
    }
}
class Statement_Oho  extends Statement {
    static Gal_Keyword = 'oho';
    static Gs_Keyword = 'oho';
    Fallback_Generate()
    {
        var Method_Name = 'Oho';
        var Arg;
        for (Arg of this.Arguments)
        {
            Method_Name += '_' + Arg.Fallback;
        }
        var Code = 'comment ". [class] ' + Method_Name + ';";';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Gal  extends Append_Args_Statement {
    static Gal_Keyword = 'gal';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Gal_Generate' + "\n" + '{' + "\n" + "    " + 'string Gal_Code';
        var Argument;
        var Argument_Code;
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Token_Name)
            {
                Argument_Code = '[my '  +  Argument_Code  +  ' Gal]';
            }
            else
            {
                Argument_Code = Argument.Gal;
            }
            Gal_Code += ' ' + Argument_Code;
        }
        Gal_Code += ';' + "\n" + "    " + 'my= Gal Gal_Code;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
}
class Statement_Inference  extends Verb_Statement {
    static Gal_Keyword = 'inference';
    static Gs_Keyword = 'inference';
    static Aliases = " polymorph cuckoo ";
    constructor()
    {
        super();
        this.DT = undefined;
        this.Class_Name = undefined;
        this.Method_Signature = undefined;
        this.Method_Name = undefined;
        this.Property_Name = undefined;
    }
    Attributes()
    {
        this.DT = this.Listargs.shift();
        this.Class_Name = this.Listargs.shift();
        var Name_Text = this.Class_Name.Get_Input();
        this.Property_Name = Name_Text;
        this.Method_Name = 'Infer_'  +  Name_Text;
        /* comment 'we need to know the header before generation begins.'; */
        var Header = 'method flag ' + this.Method_Name;
        var Argument;
        for (Argument of this.Listargs)
        {
            Header += ' ' + Argument.Get_Input();
        }
        this.Method_Signature = Header;
    }
    Inference_Context()
    {
        return this;
    }
    Fallback_Generate()
    {
        var Cname = this.Class_Name.Fallback;
        var Block = this.Block.Fallback_Statements;
        var Code = 'class Inference_' + Cname + ' [is Inference]' + "\n" + '{' + "\n" + "    " + 'method flag Infer' + "\n" + "    " + '{' + "\n" + "    ".repeat(2) + 'returnif (not (. [my Owner] Infer_' + Cname + ')) [false];' + "\n" + "    ".repeat(2) + 'return [true];' + "\n" + "    " + '}' + "\n" + '}' + "\n" + Block;
        this.Fallback = Code;
    }
}

/* comment 'Additions.gal'; */
class Syntax_My  extends Syntax {
    static Gal_Keyword = 'my';
    static Gs_Keyword = 'my';
    static Aliases = " self i me this ";
    constructor()
    {
        super();
        this.Has_Arguments = false;
    }
    Attributes()
    {
        /* comment 'look up the first argument in the parent context to know that it is a list.'; */
        this.Has_Arguments = this.Listargs.length > 0;
        if (this.Has_Arguments)
        {
            var Argument = this.Listargs.shift();
            /* comment "TODO:" 'this must be a token'; */
            if (!(Argument instanceof Token))
            {
                throw this.Failure_Message("Property name must be a token");
            }
            var Property = Argument.Input;
            var Definition = this.Lookup(Property);
            if (!(Definition))
            {
                return;
            }
            var Data_Type = Definition.Data_Type;
            if (!(Data_Type))
            {
                return;
            }
            Argument.Data_Type = Data_Type;
            this.Data_Type = Data_Type;
        }
    }
    Fallback_Generate()
    {
        var Argument;
        if (this.Has_Arguments)
        {
            var Gal_Code = '[. [self]';
            for (Argument of this.Arguments)
            {
                Gal_Code += ' ' + Argument.Fallback;
            }
            Gal_Code += ']';
            this.Fallback = Gal_Code;
        }
        else
        {
            this.Fallback = '[self]';
        }
    }
    Python_Generate()
    {
        /* comment 'debug'; */
        this.Python = 'self';
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'this';
        this.Javascript = Javascript_Code;
    }
}
class Operation_Begins  extends Operation {
    static Gal_Keyword = 'begins';
    static Gs_Keyword = 'begins';
    constructor()
    {
        super();
        this.String_Value = undefined;
        this.Begin_Value = undefined;
    }
    /* comment 'fallback(substring  [my String_Value Fallback] 0 (string.length  [my Begin_Value Fallback]))'; */
    Python_Generate()
    {
        var Python_Code = this.String_Value.Python + '[:len(' + this.Begin_Value.Python + ')] == ' + this.Begin_Value.Python;
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.String_Value.Javascript + '.substr(0,' + this.Begin_Value.Javascript + '.length) == ' + this.Begin_Value.Javascript;
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument String_Value';
        }
        this.String_Value = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Begin_Value';
        }
        this.Begin_Value = this.Listargs.shift();
    }
}
class Operation_Firstchar  extends Unary_Operation {
    static Gal_Keyword = 'firstchar';
    static Gs_Keyword = 'firstchar';
    constructor()
    {
        super();
        this.String_Value = undefined;
    }
    /* comment 'fallback(substring  [my String_Value Fallback] 0 1)'; */
    Python_Generate()
    {
        var Python_Code = this.String_Value.Python + '[0]';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.String_Value.Javascript + '.charAt(0)';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument String_Value';
        }
        this.String_Value = this.Listargs.shift();
    }
}
class Operation_Lastchar  extends Unary_Operation {
    static Gal_Keyword = 'lastchar';
    static Gs_Keyword = 'lastchar';
    constructor()
    {
        super();
        this.String_Value = undefined;
    }
    /* comment 'fallback(substring  [my String_Value Fallback] (- (length  [my String_Value Fallback])) 1)'; */
    Python_Generate()
    {
        var Python_Code = this.String_Value.Python + '[-1]';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.String_Value.Javascript + '.charAt(' + this.String_Value.Javascript + '.length-1)';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument String_Value';
        }
        this.String_Value = this.Listargs.shift();
    }
}
class Operation_I  extends Invocation_Operation {
    static Gal_Keyword = 'i';
    static Gs_Keyword = 'i';
    static Aliases = " self me this ";
    constructor()
    {
        super();
        this.Method = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(. [self]' + this.Fallback_Arguments() + ')';
        this.Fallback = Gal_Code;
    }
    Python_Generate()
    {
        var Python_Code = 'self.' + this.Method.Python + '(' + this.Python_Args(',') + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'this.' + this.Method.Javascript + '(' + this.Javascript_Args(',') + ')';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Method';
        }
        this.Method = this.Listargs.shift();
    }
}
class Operation_Key_Get  extends Operation {
    static Gal_Keyword = 'key.get';
    static Gs_Keyword = 'key.get';
    constructor()
    {
        super();
        this.Dictionary = undefined;
        this.Key = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '[key ' + this.Dictionary.Fallback + ' ' + this.Key.Fallback + ']';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Dictionary';
        }
        this.Dictionary = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Key';
        }
        this.Key = this.Listargs.shift();
    }
}
class Statement_I  extends Invocation_Statement {
    static Gal_Keyword = 'i';
    static Gs_Keyword = 'i';
    static Aliases = " self this me my ";
    Fallback_Generate()
    {
        var Gal_Code = '. [self]' + this.Fallback_Arguments() + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_We  extends Invocation_Statement {
    static Gal_Keyword = 'we';
    static Gs_Keyword = 'we';
    static Aliases = " us ";
    Fallback_Generate()
    {
        var Gal_Code = '. [class]' + this.Fallback_Arguments() + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Myclass  extends Invocation_Statement {
    static Gal_Keyword = 'myclass';
    static Gs_Keyword = 'myclass';
    static Aliases = " my.class ";
    Fallback_Generate()
    {
        var Gal_Code = '. [my.class]' + this.Fallback_Arguments() + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Entity_New  extends Declare_Statement {
    static Gal_Keyword = 'entity.new';
    static Gs_Keyword = 'entity.new';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Class = undefined;
    }
    Fallback_Generate()
    {
        var Argument;
        var Gal_Code = 'entity ' + this.Variable.Fallback + ' (new ' + this.Class.Fallback;
        for (Argument of this.Listargs)
        {
            Gal_Code += ' ' + Argument.Fallback;
        }
        Gal_Code += ');';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class';
        }
        this.Class = this.Listargs.shift();
    }
}
class Statement_Entity_My_Class  extends Declare_Statement {
    static Gal_Keyword = 'entity.my.class';
    static Gs_Keyword = 'entity.my.class';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Fallback_Generate()
    {
        var Argument;
        var Gal_Code = 'entity ' + this.Variable.Fallback + ' (new [my.class]';
        for (Argument of this.Listargs)
        {
            Gal_Code += ' ' + Argument.Fallback;
        }
        Gal_Code += ');';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}
class Statement_Contif  extends Line_Statement {
    static Gal_Keyword = 'continue.if';
    static Gs_Keyword = 'continue.if';
    static Aliases = " contif ";
    constructor()
    {
        super();
        this.Condition = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'if ' + this.Condition.Fallback + "\n" + '{' + "\n" + "    " + 'continue;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Condition';
        }
        this.Condition = this.Listargs.shift();
    }
}
class Statement_Breakif  extends Line_Statement {
    static Gal_Keyword = 'break.if';
    static Gs_Keyword = 'break.if';
    static Aliases = " breakif ";
    constructor()
    {
        super();
        this.Condition = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'if ' + this.Condition.Fallback + "\n" + '{' + "\n" + "    " + 'break;' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Condition';
        }
        this.Condition = this.Listargs.shift();
    }
}
class Statement_Alias  extends Line_Statement {
    static Gal_Keyword = 'alias';
    static Gs_Keyword = 'alias';
    Fallback_Generate()
    {
        var Code = 'class.property string Aliases "';
        var Argument;
        for (Argument of this.Arguments)
        {
            Code += ' ' + Argument.Fallback;
        }
        Code += ' ";';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Operation_Dictionary_Default  extends Operation {
    static Gal_Keyword = 'dict.default';
    static Gs_Keyword = 'dict.default';
    constructor()
    {
        super();
        this.Dictionary = undefined;
        this.Key = undefined;
        this.Default = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(. [: Runtime] Dict_Default ' + this.Dictionary.Fallback + ' ' + this.Key.Fallback + ' ' + this.Default.Fallback + ')';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Dictionary';
        }
        this.Dictionary = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Key';
        }
        this.Key = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Default';
        }
        this.Default = this.Listargs.shift();
    }
}
class Operation_Dictionary_Defined  extends Operation {
    static Gal_Keyword = 'dict.defined';
    static Gs_Keyword = 'dict.defined';
    constructor()
    {
        super();
        this.Dictionary = undefined;
        this.Key = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(. [: Runtime] Dict_Defined ' + this.Dictionary.Fallback + ' ' + this.Key.Fallback + ' ' + this.Default.Fallback + ')';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Dictionary';
        }
        this.Dictionary = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Key';
        }
        this.Key = this.Listargs.shift();
    }
}
class Statement_Entities  extends Line_Statement {
    static Gal_Keyword = 'entities';
    static Gs_Keyword = 'entities';
    Fallback_Generate()
    {
        var Gal_Code = '';
        var Between = '';
        var Keyword = 'entities';
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += Between + Keyword + ' ' + Argument.Fallback + ';';
            Between = "\n";
        }
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_My_Equal  extends Assign_Statement {
    static Gal_Keyword = 'my=';
    static Gs_Keyword = 'my=';
    static Aliases = " self.= i.= ";
    constructor()
    {
        super();
        this.Property = undefined;
        this.Value = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '.= [self] ' + this.Property.Fallback + ' ' + this.Value.Fallback + ';';
        this.Fallback = Gal_Code;
    }
    Python_Generate()
    {
        var Python_Code = 'self.' + this.Property.Python + ' = ' + this.Value.Python + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'this.' + this.Property.Javascript + ' = ' + this.Value.Javascript + ';' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Property';
        }
        this.Property = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Value';
        }
        this.Value = this.Listargs.shift();
    }
}
class Statement_Integers  extends Line_Statement {
    static Gal_Keyword = 'integers';
    static Gs_Keyword = 'integers';
    Fallback_Generate()
    {
        var Gal_Code = '';
        var Between = '';
        var Keyword = 'integer';
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += Between + Keyword + ' ' + Argument.Fallback + ';';
            Between = "\n";
        }
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Numbers  extends Line_Statement {
    static Gal_Keyword = 'numbers';
    static Gs_Keyword = 'numbers';
    Fallback_Generate()
    {
        var Gal_Code = '';
        var Between = '';
        var Keyword = 'number';
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += Between + Keyword + ' ' + Argument.Fallback + ';';
            Between = "\n";
        }
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Strings  extends Line_Statement {
    static Gal_Keyword = 'strings';
    static Gs_Keyword = 'strings';
    Fallback_Generate()
    {
        var Gal_Code = '';
        var Between = '';
        var Keyword = 'string';
        var Argument;
        for (Argument of this.Arguments)
        {
            Gal_Code += Between + Keyword + ' ' + Argument.Fallback + ';';
            Between = "\n";
        }
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Return_If  extends Line_Statement {
    static Gal_Keyword = 'returnif';
    static Gs_Keyword = 'returnif';
    static Aliases = " return.if ";
    constructor()
    {
        super();
        this.Condition = undefined;
        this.Return_Value = undefined;
    }
    Fallback_Generate()
    {
        var Code = 'if ' + this.Condition.Fallback + "\n" + '{' + "\n" + "    " + 'return';
        if (this.Return_Value !== undefined)
        {
            Code += ' ' + this.Return_Value.Fallback;
        }
        Code += ';' + "\n" + '}' + "\n";
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Condition';
        }
        this.Condition = this.Listargs.shift();
        this.Condition.Usage = 'value';
        if (this.Listargs.length > 0)
        {
            this.Return_Value = this.Listargs.shift();
            this.Return_Value.Usage = 'value';
        }
    }
}
class Statement_Ifdef  extends Scoped_Statement {
    static Gal_Keyword = 'ifdef';
    static Gs_Keyword = 'ifdef';
    Python_Generate()
    {
        var Ifargs = "";
        var Argument;
        for (Argument of this.Listargs)
        {
            Ifargs += "ifdef = " + Argument.Python + "\n";
        }
        Ifargs = this.Indent(Ifargs);
        var Block = this.Python_Statements();
        var Code = "try:" + "\n" + Ifargs + Block;
        Code += "except ValueError:" + "\n" + "    " + "pass" + "\n";
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Ifargs = "";
        var Between = "";
        var Argument;
        for (Argument of this.Listargs)
        {
            Ifargs += Between + Argument.Javascript + "!= null";
            Between = " && ";
        }
        var Block = this.Javascript_Block();
        var Code = "if (" + Ifargs + ")" + Block;
        this.Javascript = Code;
    }
    Attributes()
    {
    }
}
class Statement_Undef  extends Scoped_Statement {
    static Gal_Keyword = 'undef';
    static Gs_Keyword = 'undef';
    Python_Generate()
    {
        var Ifargs = "";
        var Argument;
        for (Argument of this.Listargs)
        {
            Ifargs += "undef = " + Argument.Python + "\n";
        }
        Ifargs = this.Indent(Ifargs);
        var Block = this.Python_Block();
        var Code = "try:" + "\n" + Ifargs;
        Code += "except (ValueError, AttributeError)" + Block;
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Ifargs = "";
        var Between = "";
        var Argument;
        for (Argument of this.Listargs)
        {
            Ifargs += Between + Argument.Javascript + " == null";
            Between = " || ";
        }
        var Block = this.Javascript_Block();
        var Code = "if (" + Ifargs + ")" + Block;
        this.Javascript = Code;
    }
    Attributes()
    {
    }
}
class Statement_New  extends Line_Statement {
    static Gal_Keyword = 'new';
    static Gs_Keyword = 'new';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Class = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Variable.Python + ' = ' + this.Class.Python + '(' + this.Python_Args(', ') + ')' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Variable.Javascript + ' = new ' + this.Class.Javascript + '(' + this.Javascript_Args(', ') + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class';
        }
        this.Class = this.Listargs.shift();
    }
}
class Statement_Verbose  extends Line_Statement {
    static Gal_Keyword = 'verbose';
    static Gs_Keyword = 'verbose';
    Fallback_Generate()
    {
        var Gal_Code = 'if Verbose { writeline' + this.Fallback_Arguments() + '; }';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Verbosity  extends Line_Statement {
    static Gal_Keyword = 'verbosity';
    static Gs_Keyword = 'verbosity';
    constructor()
    {
        super();
        this.Setting = undefined;
    }
    Fallback_Generate()
    {
        var Setting = '[false]';
        if (this.Setting !== undefined)
        {
            Setting = this.Setting.Fallback;
        }
        var Code = 'flag Verbose ' + Setting + ';';
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length > 0)
        {
            this.Setting = this.Listargs.shift();
        }
    }
}
class Statement_Todo  extends Comment_Statement {
    static Gal_Keyword = 'todo';
    static Gs_Keyword = 'todo';
    Fallback_Generate()
    {
        var Gal_Code = 'comment "TODO:" ' + this.Enquote(this.Argument_String()) + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Flowerbox  extends Comment_Statement {
    static Gal_Keyword = 'flowerbox';
    static Gs_Keyword = 'flowerbox';
    Fallback_Generate()
    {
        var Gal_Code = 'comment "**** " ' + this.Enquote(this.Argument_String()) + '" ****";';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Question  extends Comment_Statement {
    static Gal_Keyword = 'question';
    static Gs_Keyword = 'question';
    Fallback_Generate()
    {
        var Gal_Code = 'comment "QUESTION:" ' + this.Enquote(this.Argument_String()) + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Answer  extends Comment_Statement {
    static Gal_Keyword = 'question';
    static Gs_Keyword = 'question';
    Fallback_Generate()
    {
        var Gal_Code = 'comment "ANSWER:" ' + this.Enquote(this.Argument_String()) + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Write_Line  extends Append_Args_Statement {
    static Gal_Keyword = 'writeline';
    static Gs_Keyword = 'writeline';
    Python_Generate()
    {
        var Code = 'print(' + this.Python_Args(', ');
        if (this.Listargs.length > 1)
        {
            Code += ", sep=''";
        }
        Code += ")" + "\n";
        this.Python = Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'console.log(' + this.Javascript_Args(', ') + ');' + "\n";
        this.Javascript = Javascript_Code;
    }
    Mumps_Generate()
    {
        var Mumps_Code = ' write ' + this.Mumps_Args(',') + ',!';
        this.Mumps = Mumps_Code;
    }
    Attributes()
    {
    }
}
class Operation_M_Atom  extends Invocation_Operation {
    static Gal_Keyword = 'm.atom';
    static Gs_Keyword = 'm.atom';
    constructor()
    {
        super();
        this.Element = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(. ' + this.Element.Fallback + ' M_Atom)';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Element';
        }
        this.Element = this.Listargs.shift();
    }
}
class Operation_M_Expr  extends Invocation_Operation {
    static Gal_Keyword = 'm.expr';
    static Gs_Keyword = 'm.expr';
    constructor()
    {
        super();
        this.Element = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(. ' + this.Element.Fallback + ' M_Expr)';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Element';
        }
        this.Element = this.Listargs.shift();
    }
}
class Operation_Mumps  extends Invocation_Operation {
    static Gal_Keyword = 'mumps';
    static Gs_Keyword = 'mumps';
    constructor()
    {
        super();
        this.Element = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(. ' + this.Element.Fallback + ' Mumps)';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Element';
        }
        this.Element = this.Listargs.shift();
    }
}
class Statement_M_Atom  extends Invocation_Statement {
    static Gal_Keyword = 'm.atom';
    static Gs_Keyword = 'm.atom';
    constructor()
    {
        super();
        this.Element = undefined;
        this.Value = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '.= ' + this.Element.Fallback + ' M_Atom ' + this.Value.Fallback + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Element';
        }
        this.Element = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Value';
        }
        this.Value = this.Listargs.shift();
    }
}
class Statement_M_Expr  extends Invocation_Statement {
    static Gal_Keyword = 'm.expr';
    static Gs_Keyword = 'm.expr';
    constructor()
    {
        super();
        this.Element = undefined;
        this.Value = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '.= ' + this.Element.Fallback + ' M_Expr ' + this.Value.Fallback + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Element';
        }
        this.Element = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Value';
        }
        this.Value = this.Listargs.shift();
    }
}
class Statement_M  extends Invocation_Statement {
    static Gal_Keyword = 'm';
    static Gs_Keyword = 'm';
    constructor()
    {
        super();
        this.Element = undefined;
        this.Value = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '.= ' + this.Element.Fallback + ' Mumps ' + this.Value.Fallback + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Element';
        }
        this.Element = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Value';
        }
        this.Value = this.Listargs.shift();
    }
}
class Statement_Unless  extends If_Statement {
    static Gal_Keyword = 'unless';
    static Gs_Keyword = 'unless';
    constructor()
    {
        super();
        this.Condition = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'if (not ' + this.Condition.Fallback + ')' + this.Fallback_Block();
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Condition';
        }
        this.Condition = this.Listargs.shift();
    }
}

class Statement_Parser  extends Class_Statement {
    static Gal_Keyword = 'parser';
    static Gs_Keyword = 'parser';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'class ' + this.Class_Name.Fallback + '_Parser' + ' [is Parser]' + this.Fallback_Args() + this.Fallback_Block();
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Statement_Sequence  extends Method_Statement {
    static Gal_Keyword = 'sequence';
    static Gs_Keyword = 'sequence';
    constructor()
    {
        super();
        this.Rule_Name = undefined;
    }
    Fallback_Generate()
    {
        var Body = 'comment "sequence ' + this.Rule_Name.Fallback + '";' + "\n" + 'integer Start [my Position];' + "\n" + 'list My_Elements;' + "\n";
        var Argument;
        for (Argument of this.Listargs)
        {
            if (Argument instanceof Quote || Argument instanceof Syntax_Line)
            {
                var Text = Argument.Fallback;
                Body += 'if (not (i Parse_Token My_Elements ' + Text + ')) { i Rollback Start (append "' + this.Rule_Name.Fallback + ' expected "' + Text + '"."); return [false]; }' + "\n";
            }
            else if (Argument instanceof Token)
            {
                var Name = Argument.Fallback;
                Body += '= Last Start;' + "\n" + 'if (not (. [self] Parse_' + Name + ' My_Elements)) {' + "\n" + "    " + 'i Rollback Start "Sequence ' + this.Rule_Name.Fallback + ' expected ' + Name + '.";' + "\n" + "    " + 'return [false];' + "\n" + '}' + "\n";
            }
            else
            {
                Body += Argument.Fallback;
            }
        }
        Body += 'integer End [my Position];' + "\n" + 'entity Element (new ' + this.Rule_Name.Fallback + ');' + "\n" + '.= Element Start_Position Start;' + "\n" + '.= Element End_Position End;' + "\n" + '.= Element Document [self];' + "\n" + '.= Element Elements My_Elements;' + "\n" + 'i Add_Element Element;' + "\n" + 'list.append Parent_Elements Element;' + "\n" + 'return [true];' + "\n";
        Body = this.Indent(Body);
        var Code = 'method flag Parse_' + this.Rule_Name.Fallback + ' [list Parent_Elements]' + "\n" + '{' + "\n" + Body + '}';
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Rule_Name';
        }
        this.Rule_Name = this.Listargs.shift();
    }
}
class Statement_Either  extends Method_Statement {
    static Gal_Keyword = 'either';
    static Gs_Keyword = 'either';
    constructor()
    {
        super();
        this.Rule_Name = undefined;
    }
    Fallback_Generate()
    {
        var Body = 'comment "either ' + this.Rule_Name.Fallback + '";' + "\n";
        var Argument;
        for (Argument of this.Listargs)
        {
            if (Argument instanceof Token)
            {
                Body += 'returnif (. [self] Parse_' + Argument.Fallback + ' Parent_Elements) [true];' + "\n";
            }
            else
            {
                Body += Argument.Fallback;
            }
        }
        Body = this.Indent(Body);
        var Code = 'method flag Parse_' + this.Rule_Name.Fallback + ' [list Parent_Elements]' + "\n" + '{' + "\n" + Body + "    " + 'return [false];' + "\n" + '}';
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Rule_Name';
        }
        this.Rule_Name = this.Listargs.shift();
    }
}
class Statement_Token  extends Method_Statement {
    static Gal_Keyword = 'token';
    static Gs_Keyword = 'token';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        var Name = this.Class_Name.Fallback;
        var Code = 'method flag Parse_' + Name + ' [list Parent_Elements]' + "\n" + '{' + "\n" + "    " + 'entity Top_Token (. [self] Top_Token);' + "\n" + "    " + 'returnif (not (isa Top_Token ' + Name + ')) [false];' + "\n" + "    " + 'list.append Parent_Elements Top_Token;' + "\n" + "    " + 'i Consume_Token;' + "\n" + "    " + 'return [true];' + "\n" + '}';
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Statement_Tokens  extends Method_Statement {
    static Gal_Keyword = 'tokens';
    static Gs_Keyword = 'tokens';
    Fallback_Generate()
    {
        var Code = '';
        var Argument;
        var Between = '';
        for (Argument of this.Arguments)
        {
            var Name = Argument.Fallback;
            Code += Between + 'method flag Parse_' + Name + ' [list Parent_Elements]' + "\n" + '{' + "\n" + "    " + 'entity Top_Token (. [self] Top_Token);' + "\n" + "    " + 'returnif (not (isa Top_Token ' + Name + ')) [false];' + "\n" + "    " + 'list.append Parent_Elements Top_Token;' + "\n" + "    " + 'i Consume_Token;' + "\n" + "    " + 'return [true];' + "\n" + '}';
            Between = "\n";
        }
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Syntax_Repeating  extends Syntax {
    static Gal_Keyword = 'repeating';
    static Gs_Keyword = 'repeating';
    static Aliases = " required.repeating ";
    constructor()
    {
        super();
        this.Rule = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'comment "repeating ' + this.Rule.Fallback + '";' + "\n" + 'if (not (. [self] Parse_' + this.Rule.Fallback + ' My_Elements))' + "\n" + '{' + "\n" + "    " + 'i Rollback Start "Required at least one ' + this.Rule.Fallback + '." ;' + "\n" + "    " + 'return [false];' + "\n" + '}' + "\n" + 'forever' + "\n" + '{' + "\n" + "    " + 'breakif (not (. [self] Parse_' + this.Rule.Fallback + ' My_Elements));' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Rule';
        }
        this.Rule = this.Listargs.shift();
    }
}
class Syntax_Optional  extends Syntax {
    static Gal_Keyword = 'optional';
    static Gs_Keyword = 'optional';
    constructor()
    {
        super();
        this.Rule = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'comment "optional ' + this.Rule.Fallback + '";' + "\n" + 'i Parse_' + this.Rule.Fallback + '  My_Elements;';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Rule';
        }
        this.Rule = this.Listargs.shift();
    }
}
class Syntax_Optrep  extends Syntax {
    static Gal_Keyword = 'optrep';
    static Gs_Keyword = 'optrep';
    static Aliases = " optional.repeating ";
    constructor()
    {
        super();
        this.Rule = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'comment "optional.repeating ' + this.Rule.Fallback + '";' + "\n" + 'forever' + "\n" + '{' + "\n" + "    " + 'breakif (not (. [self] Parse_' + this.Rule.Fallback + ' My_Elements));' + "\n" + '}' + "\n";
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Rule';
        }
        this.Rule = this.Listargs.shift();
    }
}
class Syntax_Exclude  extends Syntax {
    static Gal_Keyword = 'exclude';
    static Gs_Keyword = 'exclude';
    static Aliases = " except ";
    Fallback_Generate()
    {
        var Code = 'comment "[exclude ' + this.Fallback_Args() + ']";' + "\n" + 'list Excluded;' + "\n";
        var Argument;
        for (Argument of this.Arguments)
        {
            /* comment 'rule name tokens are required, right?'; */
            Code += 'if (. [self] Parse_' + Argument.Fallback + ' Excluded)' + "\n" + '{' + "\n" + "    " + 'i Rollback Start "Excluded ' + Argument.Fallback + ' encountered.";' + "\n" + "    " + 'return [false];' + "\n" + '}' + "\n";
        }
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Task  extends Statement {
    static Gal_Keyword = 'task';
    static Gs_Keyword = 'task';
    constructor()
    {
        super();
        this.Task_Id = undefined;
    }
    Fallback_Generate()
    {
        var Task_Id = this.Task_Id.Fallback;
        var Code = 'entity Task_' + Task_Id + ' (new Task);' + "\n";
        var Argument;
        var Odd = true;
        var Property;
        var Value;
        for (Argument of this.Listargs)
        {
            if (Argument instanceof Token_Comma)
            {
                Odd = true;
                continue;
            }
            /* comment "TODO:" 'do this with keyvalues instead?'; */
            if (Odd)
            {
                Property = this.Pascal_Case(Argument.Fallback);
            }
            else
            {
                Value = Argument.Fallback;
                Code += '.= Task_' + Task_Id + ' ' + Property + ' ' + Value + ';' + "\n";
            }
            Odd = !(Odd);
        }
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Task_Id';
        }
        this.Task_Id = this.Listargs.shift();
    }
}
class Statement_Subtask  extends Statement {
    static Gal_Keyword = 'subtask';
    static Gs_Keyword = 'subtask';
    constructor()
    {
        super();
        this.Headline = undefined;
    }
    Fallback_Generate()
    {
        var Variable = this.Parent.Variable;
        var Code = '. ' + Variable + ' Add_Subtask ' + this.Headline.Fallback + ';';
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Headline';
        }
        this.Headline = this.Listargs.shift();
    }
}
class Statement_Book_Gal  extends Statement {
    static Gal_Keyword = 'book.gal';
    static Gs_Keyword = 'book.gal';
    Fallback_Generate()
    {
        var Code = 'my= Gal';
        var Argument;
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Token_Name)
            {
                Code += ' [my ' + Argument.Fallback + ' Fallback]';
            }
            else
            {
                Code += ' ' + Argument.Fallback;
            }
        }
        if (this.Arguments.length > 1)
        {
            Code = '(append '  +  Code  +  ')';
        }
        Code += ';';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Book_Fallback  extends Statement {
    static Gal_Keyword = 'book.fallback';
    static Gs_Keyword = 'book.fallback';
    Fallback_Generate()
    {
        var Code = 'my= Fallback';
        var Argument;
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Token_Name)
            {
                Code += ' [my ' + Argument.Fallback + ' Fallback]';
            }
            else
            {
                Code += ' ' + Argument.Fallback;
            }
        }
        if (this.Arguments.length > 1)
        {
            Code = '(append '  +  Code  +  ')';
        }
        Code += ';';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Book_Raku  extends Statement {
    static Gal_Keyword = 'book.raku';
    static Gs_Keyword = 'book.raku';
    Fallback_Generate()
    {
        var Code = 'my= Raku';
        var Argument;
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Token_Name)
            {
                Code += ' [my ' + Argument.Fallback + ' Fallback]';
            }
            else
            {
                Code += ' ' + Argument.Fallback;
            }
        }
        if (this.Arguments.length > 1)
        {
            Code = '(append '  +  Code  +  ')';
        }
        Code += ';';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Book_Python  extends Statement {
    static Gal_Keyword = 'book.python';
    static Gs_Keyword = 'book.python';
    Fallback_Generate()
    {
        var Code = 'my= Python';
        var Argument;
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Token_Name)
            {
                Code += ' [my ' + Argument.Fallback + ' Fallback]';
            }
            else
            {
                Code += ' ' + Argument.Fallback;
            }
        }
        if (this.Arguments.length > 1)
        {
            Code = '(append '  +  Code  +  ')';
        }
        Code += ';';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Book_Javascript  extends Statement {
    static Gal_Keyword = 'book.javascript';
    static Gs_Keyword = 'book.javascript';
    Fallback_Generate()
    {
        var Code = 'my= Javascript';
        var Argument;
        for (Argument of this.Arguments)
        {
            if (Argument instanceof Token_Name)
            {
                Code += ' [my ' + Argument.Fallback + ' Fallback]';
            }
            else
            {
                Code += ' ' + Argument.Fallback;
            }
        }
        if (this.Arguments.length > 1)
        {
            Code = '(append '  +  Code  +  ')';
        }
        Code += ';';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Book  extends Statement {
    static Gal_Keyword = 'book';
    static Gs_Keyword = 'book';
    Attributes()
    {
    }
}
class Statement_Chapter  extends Statement {
    static Gal_Keyword = 'chapter';
    static Gs_Keyword = 'chapter';
    static Aliases = " chap ";
    Attributes()
    {
    }
}
class Statement_Section  extends Statement {
    static Gal_Keyword = 'section';
    static Gs_Keyword = 'section';
    Attributes()
    {
    }
}
class Statement_Overview  extends Statement {
    static Gal_Keyword = 'overview';
    static Gs_Keyword = 'overview';
    Attributes()
    {
    }
}
class Statement_Expository  extends Statement {
    static Gal_Keyword = 'expository';
    static Gs_Keyword = 'expository';
    static Aliases = " exposition expo ";
    Attributes()
    {
    }
}
class Statement_Paragraph  extends Statement {
    static Gal_Keyword = 'paragraph';
    static Gs_Keyword = 'paragraph';
    static Aliases = " p ";
    Attributes()
    {
    }
}
class Statement_Shell  extends Statement {
    static Gal_Keyword = 'shell';
    static Gs_Keyword = 'shell';
    static Aliases = " linux ";
    Attributes()
    {
    }
}
class Statement_Summary  extends Statement {
    static Gal_Keyword = 'summary';
    static Gs_Keyword = 'summary';
    Attributes()
    {
    }
}
class Statement_Title  extends Statement {
    static Gal_Keyword = 'title';
    static Gs_Keyword = 'title';
    Attributes()
    {
    }
}
class Statement_Description  extends Statement {
    static Gal_Keyword = 'description';
    static Gs_Keyword = 'description';
    static Aliases = " desc ";
    Attributes()
    {
    }
}
class Statement_Codefile  extends Statement {
    static Gal_Keyword = 'codefile';
    static Gs_Keyword = 'codefile';
    static Aliases = " code ";
    constructor()
    {
        super();
        this.Equal = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'Code = ' + this.Python_Args(' + ') + "\n";
        this.Python = Python_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Equal';
        }
        this.Equal = this.Listargs.shift();
    }
}
class Syntax_Italic  extends Syntax {
    static Gal_Keyword = 'italic';
    static Gs_Keyword = 'italic';
    Attributes()
    {
    }
}
class Statement_Definition  extends Comment_Statement {
    static Gal_Keyword = 'definition';
    static Gs_Keyword = 'definition';
    Fallback_Generate()
    {
        var Gal_Code = 'comment "DEFINITION: "' + this.Fallback_Args() + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Token_Mode  extends Line_Statement {
    static Gal_Keyword = 'tokenmode';
    static Gs_Keyword = 'tokenmode';
    constructor()
    {
        super();
        this.Mode_Name = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '= Mode ' + this.Enquote(this.Mode_Name.Fallback) + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Mode_Name';
        }
        this.Mode_Name = this.Listargs.shift();
    }
}
class Operation_Token_Mode  extends Operation {
    static Gal_Keyword = 'tokenmode';
    static Gs_Keyword = 'tokenmode';
    constructor()
    {
        super();
        this.Mode_Name = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(s= Mode ' + this.Enquote(this.Mode_Name.Fallback) + ')';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Mode_Name';
        }
        this.Mode_Name = this.Listargs.shift();
    }
}
class Operation_Is_Ident  extends Operation {
    static Gal_Keyword = 'isident';
    static Gs_Keyword = 'isident';
    constructor()
    {
        super();
        this.Character = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(or (isalpha ' + this.Character.Fallback + ') (contains "0123456789_" ' + this.Character.Fallback + '))';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Character';
        }
        this.Character = this.Listargs.shift();
    }
}
class Statement_Token_Append  extends Line_Statement {
    static Gal_Keyword = 'token.append';
    static Gs_Keyword = 'token.append';
    constructor()
    {
        super();
        this.Token_Entity = undefined;
        this.Character = undefined;
        this.Position = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'append [. ' + this.Token_Entity.Fallback + ' Input] ' + this.Character.Fallback + ';' + "\n" + '= [. ' + this.Token_Entity.Fallback + ' Location End_Position] ' + this.Position.Fallback + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Token_Entity';
        }
        this.Token_Entity = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Character';
        }
        this.Character = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Position';
        }
        this.Position = this.Listargs.shift();
    }
}
class Statement_New_Token  extends Line_Statement {
    static Gal_Keyword = 'newtoken';
    static Gs_Keyword = 'newtoken';
    constructor()
    {
        super();
        this.Token_Entity = undefined;
        this.Class = undefined;
        this.Mode = undefined;
        this.Character = undefined;
        this.Start = undefined;
        this.End = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '= ' + this.Token_Entity.Fallback + ' (new Token_' + this.Class.Fallback + ' [self] ' + this.Character.Fallback + ' ' + this.Start.Fallback + ' ' + this.End.Fallback + ');' + "\n" + 'list.append [my Tokens Symbol_Value] ' + this.Token_Entity.Fallback + ';' + "\n" + '= Mode ' + this.Enquote(this.Mode.Fallback) + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Token_Entity';
        }
        this.Token_Entity = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class';
        }
        this.Class = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Mode';
        }
        this.Mode = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Character';
        }
        this.Character = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Start';
        }
        this.Start = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument End';
        }
        this.End = this.Listargs.shift();
    }
}
class Statement_Skip_Token  extends Line_Statement {
    static Gal_Keyword = 'skiptoken';
    static Gs_Keyword = 'skiptoken';
    constructor()
    {
        super();
        this.Token_Entity = undefined;
        this.Class = undefined;
        this.Mode = undefined;
        this.Character = undefined;
        this.Start = undefined;
        this.End = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '= ' + this.Token_Entity.Fallback + ' (new Token_' + this.Class.Fallback + ' [self] ' + this.Character.Fallback + ' ' + this.Start.Fallback + ' ' + this.End.Fallback + ');' + "\n" + 'comment `' + this.Class.Fallback + ' tokens are not appended to the token list.`' + "\n" + '= Mode ' + this.Enquote(this.Mode.Fallback) + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Token_Entity';
        }
        this.Token_Entity = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class';
        }
        this.Class = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Mode';
        }
        this.Mode = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Character';
        }
        this.Character = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Start';
        }
        this.Start = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument End';
        }
        this.End = this.Listargs.shift();
    }
}
class Statement_Generate  extends Method_Statement {
    static Gal_Keyword = 'generate';
    static Gs_Keyword = 'generate';
    constructor()
    {
        super();
        this.Class_Name = undefined;
        this.Method_Name = undefined;
        this.Verb_Owner = undefined;
        this.Method_Context = undefined;
        this.Variable_Context = undefined;
        this.Class_Name = undefined;
        this.Method_Signature = undefined;
        this.Property_Name = undefined;
    }
    Attributes()
    {
        this.Class_Name = this.Listargs.shift();
    }
    Fallback_Generate()
    {
        var Context = this.Inference_Context();
        var Property_Name = Context.Property_Name;
        var Header = this.Parent.Method_Signature;
        var Append_To = this.Class_Name.Fallback;
        var Args_Code = '';
        var Argument;
        for (Argument of this.Listargs)
        {
            if (Argument instanceof Token_Name)
            {
                Args_Code += ' [. [self] ' + Argument.Fallback + ' ' + Property_Name + ']';
            }
            else
            {
                Args_Code += ' ' + Argument.Fallback;
            }
        }
        if (Args_Code > '          ')
        {
            Args_Code = 'string Gen '  +  Args_Code  +  ';'  +  "\n"  +  '.= [self] '  +  Property_Name  +  ' Gen;'  +  "\n";
            Args_Code = this.Indent(Args_Code);
        }
        var Statements = '';
        if (this.Block.Fallback_Statements !== undefined && this.Block.Fallback_Statements > '')
        {
            Statements = this.Block.Fallback_Statements;
        }
        var Method_Code = Header + "\n" + '{' + "\n" + Statements + Args_Code + "    " + 'return [true];' + "\n" + '}' + "\n";
        Method_Code = this.Indent(Method_Code);
        var Code = 'class.append ' + Append_To + "\n" + '{' + "\n" + Method_Code + '}';
        this.Fallback = Code;
    }
}
class Statement_I_Equal  extends Assign_Statement {
    static Gal_Keyword = 'i=';
    static Gs_Keyword = 'i=';
    static Aliases = " self= ";
    constructor()
    {
        super();
        this.Value = undefined;
        this.Certainty = undefined;
    }
    Fallback_Generate()
    {
        var Context = this.Inference_Context();
        var Property_Name = Context.Property_Name;
        /* comment 'writelineProperty Name  Property_Name'; */
        var Code = 'my= ' + Property_Name + ' ' + this.Value.Fallback + ';';
        /* comment 'append Code [line]writeline "properrty  Property_Name: <" [my  Property_Name] ">";'; */
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Value';
        }
        this.Value = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Certainty = this.Listargs.shift();
        }
    }
}
class Statement_Arguments  extends Scoped_Statement {
    static Gal_Keyword = 'arguments';
    static Gs_Keyword = 'arguments';
    Fallback_Generate()
    {
        var Gal_Code = 'method void Process_Arguments' + this.Fallback_Block();
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Symbol  extends Class_Statement {
    static Gal_Keyword = 'symbol';
    static Gs_Keyword = 'symbol';
    constructor()
    {
        super();
        this.Value_Type = undefined;
        this.Class_Name = undefined;
        this.Property_Name = undefined;
    }
    Process_Arguments()
    {
        this.Property_Name = this.Class_Name.Input;
    }
    Fallback_Generate()
    {
        var Class_Name = this.Class_Name.Fallback;
        var Statements = '';
        if (this.Block.Fallback_Statements !== undefined && this.Block.Fallback_Statements > '')
        {
            Statements = this.Block.Fallback_Statements;
        }
        var Ancestor_Name = 'Symbol';
        var Type = this.Value_Type.Fallback;
        var Body = `{` + "\n" + "    " + `property entity Symbol_Object;` + "\n" + "    " + `property ` + Type + ` Symbol_Value;` + "\n" + "    " + `constructor [entity Object]` + "\n" + "    " + `{` + "\n" + "    ".repeat(2) + `my= Symbol_Object Object;` + "\n" + "    " + `}` + "\n" + Statements + `}`;
        var Code = 'class ' + Class_Name + ' [is ' + Ancestor_Name + ']' + Body;
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Value_Type';
        }
        this.Value_Type = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Statement_Contest  extends Class_Statement {
    static Gal_Keyword = 'contest';
    static Gs_Keyword = 'contest';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        var Class_Name = 'Contest_' + this.Class_Name.Fallback;
        var Statements = '';
        if (this.Block.Fallback_Statements !== undefined && this.Block.Fallback_Statements > '')
        {
            Statements = this.Block.Fallback_Statements;
        }
        var Ancestor_Name = 'Contest';
        var Body = `{` + "\n" + "    " + `attribute number Score;` + "\n" + "    " + `attribute entity Winner;` + "\n" + Statements + `}`;
        var Code = 'class ' + Class_Name + ' [is ' + Ancestor_Name + ']' + Body;
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Statement_Currency  extends Class_Statement {
    static Gal_Keyword = 'currency';
    static Gs_Keyword = 'currency';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        var Class_Name = 'Currency_' + this.Class_Name.Fallback;
        var Statements = '';
        if (this.Block.Fallback_Statements !== undefined && this.Block.Fallback_Statements > '')
        {
            Statements = this.Block.Fallback_Statements;
        }
        var Ancestor_Name = 'Currency';
        var Body = `{` + "\n" + "    " + `class.attribute list Instances;` + "\n" + "    " + `attribute number Amount;` + "\n" + "    " + `attribute entity Owner;` + "\n" + "    " + `constructor` + "\n" + "    " + `{` + "\n" + "    ".repeat(2) + `list.append [. [my.class] Instances] [self];` + "\n" + "    ".repeat(2) + `` + "\n" + "    " + `}` + "\n" + Statements + `}`;
        var Code = 'class ' + Class_Name + ' [is ' + Ancestor_Name + ']' + Body;
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Statement_Principle  extends Scoped_Statement {
    static Gal_Keyword = 'principle';
    static Gs_Keyword = 'principle';
    constructor()
    {
        super();
        this.Name = undefined;
    }
    Gal_Generate()
    {
        var Body_Code = '';
        var Class_Code = '';
        var Statement;
        for (Statement of this.Block.Statements)
        {
            if (Statement instanceof Class_Statement)
            {
                Class_Code += Statement.Gal + "\n";
            }
            else
            {
                Body_Code += Statement.Gal + "\n";
            }
        }
        /* comment 'separation due to apparent bug in bootstrap compiler.'; */
        var Code = "\n" + 'class Principle_' + this.Name.Gal + "\n" + '{' + "\n";
        Code += Body_Code + '}' + "\n".repeat(2);
        Code += Class_Code + "\n";
        Code += 'comment "Principle ' + this.Name.Gal + ' ends.";' + "\n".repeat(2);
        this.Gal_Statements = Code;
        this.Gal = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
    }
}
class Statement_English  extends Line_Statement {
    static Gal_Keyword = 'english';
    static Gs_Keyword = 'english';
    Fallback_Generate()
    {
        var Args = this.Fallback_Arguments();
        if (this.Arguments.length > 1)
        {
            Args = '(append '  +  Args  +  ')';
        }
        var Code = 'class.property string English ' + Args + ';';
        this.Fallback = '';
        this.Fallback_Declaration = Code;
    }
    Attributes()
    {
    }
}
class Statement_Require_That  extends Line_Statement {
    static Gal_Keyword = 'require.that';
    static Gs_Keyword = 'require.that';
    constructor()
    {
        super();
        this.Condition = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'returnif (not ' + this.Condition.Fallback + ') [false];';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Condition';
        }
        this.Condition = this.Listargs.shift();
    }
}
class Statement_Require_That_I  extends Line_Statement {
    static Gal_Keyword = 'require.that.i';
    static Gs_Keyword = 'require.that.i';
    Fallback_Generate()
    {
        var Gal_Code = 'returnif (not (i ' + this.Fallback_Arguments() + ')) [false];';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Dialect  extends Scoped_Statement {
    static Gal_Keyword = 'dialect';
    static Gs_Keyword = 'dialect';
    constructor()
    {
        super();
        this.Name = undefined;
        this.English = undefined;
    }
    Fallback_Generate()
    {
        var Name = this.Name.Fallback;
        var Body = '';
        var Fback = '';
        if (this.English !== undefined)
        {
            Body += 'property string English ' + this.English.Fallback + ';' + "\n";
        }
        var Statement;
        for (Statement of this.Block.Statements)
        {
            if (Statement.Fallback_Declaration !== undefined)
            {
                Body += Statement.Fallback_Declaration + "\n";
            }
            if (Statement.Fallback !== undefined)
            {
                Fback += Statement.Fallback + "\n";
            }
        }
        var Method = 'method flag Initialize' + "\n" + '{' + "\n" + this.Indent(Fback) + "\n" + "    " + 'return [true];' + "\n" + '}';
        Body = this.Indent(Body);
        Method = this.Indent(Method);
        var Code = 'class Dialect_' + Name + ' [is Dialect]' + "\n" + '{' + "\n" + this.Indent(Method) + this.Indent(Body) + '}' + "\n";
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
        this.Name.Usage = 'string';
        if (this.Listargs.length > 0)
        {
            this.English = this.Listargs.shift();
            this.English.Usage = 'string';
        }
    }
}
class Statement_Statements  extends Line_Statement {
    static Gal_Keyword = 'statements';
    static Gs_Keyword = 'statements';
    Fallback_Generate()
    {
        var Arg;
        var Statement = 'ERROR_UNKNOWN_STATEMENT';
        var Keyword = 'ERROR_UNKNOWN_KEYWORD';
        var Code = '';
        for (Arg of this.Arguments)
        {
            if (Arg instanceof Token_Comma)
            {
                continue;
            }
            if (Arg instanceof Quote)
            {
                Keyword = Arg.Fallback;
                Code += 'dict.= [my Statements] ' + Keyword + ' (new ' + Statement + ');' + "\n";
            }
            else if (Arg instanceof Token_Name)
            {
                Statement = Arg.Fallback;
            }
            else
            {
                throw 'unexpected statements argument';
            }
        }
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Operations  extends Line_Statement {
    static Gal_Keyword = 'operations';
    static Gs_Keyword = 'operations';
    Fallback_Generate()
    {
        var Arg;
        var Operation = 'ERROR_UNKNOWN_OPERATION';
        var Keyword = 'ERROR_UNKNOWN_KEYWORD';
        var Code = '';
        for (Arg of this.Arguments)
        {
            if (Arg instanceof Token_Comma)
            {
                continue;
            }
            if (Arg instanceof Quote)
            {
                Keyword = Arg.Fallback;
                Code += 'dict.= [my Operations] ' + Keyword + ' (new ' + Operation + ');' + "\n";
            }
            else if (Arg instanceof Token_Name)
            {
                Operation = Arg.Fallback;
            }
            else
            {
                throw 'unexpected operations argument';
            }
        }
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Syntaxes  extends Line_Statement {
    static Gal_Keyword = 'syntaxes';
    static Gs_Keyword = 'syntaxes';
    Fallback_Generate()
    {
        var Arg;
        var Syntax = 'ERROR_UNKNOWN_SYNTAX';
        var Keyword = 'ERROR_UNKNOWN_KEYWORD';
        var Code = '';
        for (Arg of this.Arguments)
        {
            if (Arg instanceof Token_Comma)
            {
                continue;
            }
            if (Arg instanceof Quote)
            {
                Keyword = Arg.Fallback;
                Code += 'dict.= [my Syntaxes] ' + Keyword + ' (new ' + Syntax + ');' + "\n";
            }
            else if (Arg instanceof Token_Name)
            {
                Syntax = Arg.Fallback;
            }
            else
            {
                throw 'unexpected syntaxes argument';
            }
        }
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Requirement  extends Scoped_Statement {
    static Gal_Keyword = 'requirement';
    static Gs_Keyword = 'requirement';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        var Name = this.Class_Name.Fallback;
        var Full_Name = 'Requirement_' + Name;
        var Fallback_Lines = '';
        var Fallback_Declarations = '';
        var Statement;
        for (Statement of this.Block.Statements)
        {
            Fallback_Lines += Statement.Fallback + "\n";
            if (Statement.Fallback_Declaration !== undefined)
            {
                /* comment 'append Fallback_Declarations [. Statement Fallback_Declaration] [line]'; */
            }
        }
        var Fallback_Block = "\n" + '{' + "\n" + this.Indent(Fallback_Declarations) + '}';
        var Code = 'class ' + Full_Name + ' [is Requirement]' + Fallback_Block;
        Code += Fallback_Lines;
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Statement_Spell  extends Scoped_Statement {
    static Gal_Keyword = 'spell';
    static Gs_Keyword = 'spell';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        var Name = this.Class_Name.Fallback;
        var Full_Name = 'Spell_' + Name;
        var Fallback_Lines = '';
        var Fallback_Declarations = '';
        var Statement;
        for (Statement of this.Block.Statements)
        {
            Fallback_Lines += Statement.Fallback + "\n";
            if (Statement.Fallback_Declaration !== undefined)
            {
                /* comment 'append Fallback_Declarations [. Statement Fallback_Declaration] [line]'; */
            }
        }
        var Fallback_Block = "\n" + '{' + "\n" + this.Indent(Fallback_Declarations) + '}';
        var Code = 'class ' + Full_Name + ' [is Spell]' + Fallback_Block;
        Code += Fallback_Lines;
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Statement_Goal  extends Scoped_Statement {
    static Gal_Keyword = 'goal';
    static Gs_Keyword = 'goal';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        var Name = this.Class_Name.Fallback;
        var Full_Name = 'Goal_' + Name;
        var Fallback_Lines = '';
        var Fallback_Declarations = '';
        var Statement;
        for (Statement of this.Block.Statements)
        {
            Fallback_Lines += Statement.Fallback + "\n";
            if (Statement.Fallback_Declaration !== undefined)
            {
                /* comment 'append Fallback_Declarations [. Statement Fallback_Declaration] [line]'; */
            }
        }
        var Fallback_Block = "\n" + '{' + "\n" + this.Indent(Fallback_Declarations) + '}';
        var Code = 'class ' + Full_Name + ' [is Goal]' + Fallback_Block;
        Code += Fallback_Lines;
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Syntax_Class_Lookup  extends Syntax {
    static Gal_Keyword = 'lookup';
    static Gs_Keyword = 'lookup';
    constructor()
    {
        super();
        this.Name = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(. [: Compiler Instance] Get_Class ' + this.Name.Fallback + ')';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
    }
}
class Statement_File_Copy  extends Line_Statement {
    static Gal_Keyword = 'file.copy';
    static Gs_Keyword = 'file.copy';
    constructor()
    {
        super();
        this.Source_File = undefined;
        this.Target_File = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = `shell 'cp "` + this.Source_File.Unquoted() + `" "` + this.Target_File.Unquoted() + `"';`;
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Source_File';
        }
        this.Source_File = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Target_File';
        }
        this.Target_File = this.Listargs.shift();
    }
}
class Statement_File_Append_File  extends Line_Statement {
    static Gal_Keyword = 'file.append.file';
    static Gs_Keyword = 'file.append.file';
    constructor()
    {
        super();
        this.Source_File = undefined;
        this.Target_File = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = `shell 'cat "` + this.Source_File.Unquoted() + `">>"` + this.Target_File.Unquoted() + `"';`;
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Source_File';
        }
        this.Source_File = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Target_File';
        }
        this.Target_File = this.Listargs.shift();
    }
}
class Operation_File_Exists  extends Operation {
    static Gal_Keyword = 'file.exists';
    static Gs_Keyword = 'file.exists';
    constructor()
    {
        super();
        this.File_Name = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'gal.file_exists(' + this.File_Name.Python + ')';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'gal.file_exists(' + this.File_Name.Javascript + ');';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument File_Name';
        }
        this.File_Name = this.Listargs.shift();
    }
}
class Statement_Infers  extends Line_Statement {
    static Gal_Keyword = 'infers';
    static Gs_Keyword = 'infers';
    constructor()
    {
        super();
        this.Inference = undefined;
    }
    Model()
    {
        var Inference_Name = this.Inference.Input;
        var Class_Name = 'Unknown';
        if (this.Class_Context !== undefined)
        {
            Class_Name = this.Class_Context.Class_Name.Input;
        }
        else if (this.Parent !== undefined && this.Parent.Class_Name !== undefined)
        {
            Class_Name = this.Parent.Class_Name.Input;
        }
        var Owner_Class = Compiler.Instance.Get_Class(Class_Name);
        if (Owner_Class && Owner_Class.Infer_Inits !== undefined)
        {
            Owner_Class.Infer_Inits += 'list.append [my Inferences Symbol_Value] (new Inference_' + Inference_Name + ' [self]);' + "\n";
        }
    }
    Fallback_Generate()
    {
        this.Fallback = '';
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Inference';
        }
        this.Inference = this.Listargs.shift();
    }
}
class Statement_Infer_Inits  extends Line_Statement {
    static Gal_Keyword = 'infer.inits';
    static Gs_Keyword = 'infer.inits';
    Fallback_Generate()
    {
        var Class_Name = this.Class_Context.Class_Name.Fallback;
        var Owner_Class = Compiler.Instance.Get_Class(Class_Name);
        this.Fallback = Owner_Class.Infer_Inits;
    }
    Attributes()
    {
    }
}
class Syntax_Symbol  extends Syntax {
    static Gal_Keyword = 'attribute';
    static Gs_Keyword = 'attribute';
    Fallback_Generate()
    {
        var Arg;
        var Code = '[. ';
        for (Arg of this.Arguments)
        {
            Code += ' ' + Arg.Fallback;
        }
        Code += ' Symbol_Value]';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Syntax_Class_Symbol  extends Syntax {
    static Gal_Keyword = 'class.attribute';
    static Gs_Keyword = 'class.attribute';
    Fallback_Generate()
    {
        var Arg;
        var Code = '[: ';
        for (Arg of this.Arguments)
        {
            Code += ' ' + Arg.Fallback;
        }
        Code += ' Symbol_Value]';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Syntax_My_Symbol  extends Syntax {
    static Gal_Keyword = 'my.attribute';
    static Gs_Keyword = 'my.attribute';
    Fallback_Generate()
    {
        var Arg;
        var Code = '[my ';
        for (Arg of this.Arguments)
        {
            Code += ' ' + Arg.Fallback;
        }
        Code += ' Symbol_Value]';
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Statement_Goalspell  extends Scoped_Statement {
    static Gal_Keyword = 'goal.spell';
    static Gs_Keyword = 'goal.spell';
    constructor()
    {
        super();
        this.Name = undefined;
        this.Description = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = 'goal ' + this.Name.Fallback + ' ' + this.Description.Fallback + ';' + "\n" + 'spell ' + this.Name.Fallback + this.Fallback_Block();
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Description';
        }
        this.Description = this.Listargs.shift();
    }
}
class Statement_Read_Character  extends Line_Statement {
    static Gal_Keyword = 'read.char';
    static Goalspell_Keyword = 'read.char';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Variable.Python + ' = gal.read_char()' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = this.Variable.Javascript + ' = gal.read_char();' + "\n";
        this.Javascript = Javascript_Code;
    }
    /* comment "c '// TODO: read character ' Variable [line];"; */
    Mumps_Generate()
    {
        var Mumps_Code = 'read *' + this.Variable.Mumps + "\n";
        this.Mumps = Mumps_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}
class Statement_Read_Character_Timed  extends Line_Statement {
    static Gal_Keyword = 'read.char.timed';
    static Goalspell_Keyword = 'read.char.timed';
    constructor()
    {
        super();
        this.Variable = undefined;
        this.Timeout = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Variable.Python + ' = gal.read_char_timed(' + this.Timeout.Python + ')' + "\n";
        this.Python = Python_Code;
    }
    /* comment "c '// TODO: read character ' Variable ' timeout ' Timeout [line];"; */
    Mumps_Generate()
    {
        var Mumps_Code = "    " + 'read *' + this.Variable.Mumps + ':' + this.Timeout.Mumps + "\n" + "    " + 'set ' + this.Variable.Mumps + '=$char(' + this.Variable.Mumps + ')' + "\n";
        this.Mumps = Mumps_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required Variable';
        }
        this.Variable = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required Timeout';
        }
        this.Timeout = this.Listargs.shift();
    }
}
class Statement_Feature  extends Symbol_Statement {
    static Gal_Keyword = 'feature';
    static Gs_Keyword = 'feature';
    constructor()
    {
        super();
        this.Type = undefined;
        this.Name = undefined;
        this.Keyword = undefined;
        this.Symbol_Class = undefined;
    }
    Fallback_Generate()
    {
        var Type = this.Type.Fallback;
        var Name = this.Name.Fallback;
        var Keyword = this.Keyword.Fallback;
        var Symbol_Class = this.Symbol_Class.Fallback;
        var Code = 'attribute ' + Type + ' ' + Name + ' ' + Symbol_Class + ';';
        var Declaration = 'symbol ' + Type + ' ' + Name + ' ' + Symbol_Class + this.Fallback_Block() + "\n" + 'statement ' + Name + ' ' + Keyword + ' Feature_Assignment' + "\n" + '{' + "\n" + "    " + 'property string Property_Name ' + this.Enquote(Name) + ';' + "\n" + "    " + `fallback 'entity.new ' ` + Name + ` ' ' ` + Symbol_Class + ` (i Fallback_Args) ';' [line]` + "\n" + "    ".repeat(2) + `[my Block Fallback_Statements];` + "\n" + '}' + "\n";
        this.Fallback = Declaration;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Type';
        }
        this.Type = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Keyword';
        }
        this.Keyword = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Symbol_Class';
        }
        this.Symbol_Class = this.Listargs.shift();
    }
}
class Statement_Thing  extends Symbol_Statement {
    static Gal_Keyword = 'thing';
    static Gs_Keyword = 'thing';
    constructor()
    {
        super();
        this.Name = undefined;
        this.Keyword = undefined;
    }
    Fallback_Generate()
    {
        var Name = this.Name.Fallback;
        var Keyword = this.Keyword.Fallback;
        var Declaration = '';
        var Statement;
        for (Statement of this.Block.Statements)
        {
            if (Statement.Fallback_Declaration !== undefined)
            {
                Declaration += Statement.Fallback_Declaration + "\n";
            }
        }
        var Code = 'class Thing_' + Name + "\n" + '{' + "\n" + Declaration + this.Block.Fallback_Statements + '}' + 'statement ' + Name + ' ' + Keyword + ' Object_Definition' + "\n" + '{' + "\n" + "    " + `fallback 'entity.new ' ` + Name + ` ' ' Thing_` + Name + ` (i Fallback_Args) ';' [line]` + "\n" + "    ".repeat(2) + `[my Block Fallback_Statements];` + "\n" + '}' + "\n";
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Keyword';
        }
        this.Keyword = this.Listargs.shift();
    }
}
class Statement_Camera  extends Entity_Definition_Statement {
    static Gal_Keyword = 'camera';
    static Gs_Keyword = 'camera';
    constructor()
    {
        super();
        this.Class_Name = 'Camera';
        this.Name = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
    }
}
class Statement_Scene  extends Entity_Definition_Statement {
    static Gal_Keyword = 'scene';
    static Gs_Keyword = 'scene';
    constructor()
    {
        super();
        this.Class_Name = 'Scene';
        this.Name = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
    }
}
class Statement_Box  extends Entity_Definition_Statement {
    static Gal_Keyword = 'box';
    static Gs_Keyword = 'box';
    constructor()
    {
        super();
        this.Class_Name = 'Box';
        this.Name = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
    }
}
class Statement_Position  extends Entity_Definition_Statement {
    static Gal_Keyword = 'position';
    static Gs_Keyword = 'position';
    constructor()
    {
        super();
        this.Class_Name = 'Position';
        this.Name = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
    }
}
class Statement_Animation  extends Entity_Definition_Statement {
    static Gal_Keyword = 'animation';
    static Gs_Keyword = 'animation';
    constructor()
    {
        super();
        this.Class_Name = 'Animation';
        this.Name = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
    }
}
class Statement_Center  extends List_Feature_Statement {
    static Gal_Keyword = 'center';
    static Gs_Keyword = 'center';
    constructor()
    {
        super();
        this.Property_Name = 'Center';
        this.Class_Name = 'List';
    }
    Attributes()
    {
    }
}
class Statement_Color  extends List_Feature_Statement {
    static Gal_Keyword = 'color';
    static Gs_Keyword = 'color';
    constructor()
    {
        super();
        this.Property_Name = 'Color';
        this.Class_Name = 'List';
    }
    Attributes()
    {
    }
}
class Statement_Rotation  extends List_Feature_Statement {
    static Gal_Keyword = 'rotation';
    static Gs_Keyword = 'rotation';
    constructor()
    {
        super();
        this.Property_Name = 'Rotation';
        this.Class_Name = 'List';
    }
    Attributes()
    {
    }
}
class Statement_Size  extends List_Feature_Statement {
    static Gal_Keyword = 'size';
    static Gs_Keyword = 'size';
    constructor()
    {
        super();
        this.Property_Name = 'Size';
        this.Class_Name = 'List';
    }
    Attributes()
    {
    }
}
class Statement_Texture  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'texture';
    static Gs_Keyword = 'texture';
    constructor()
    {
        super();
        this.Property_Name = 'Texture';
        this.Class_Name = 'String';
    }
    Attributes()
    {
    }
}
class Statement_X  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'x';
    static Gs_Keyword = 'x';
    constructor()
    {
        super();
        this.Property_Name = 'X';
        this.Class_Name = 'Number';
    }
    Attributes()
    {
    }
}
class Statement_Y  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'y';
    static Gs_Keyword = 'y';
    constructor()
    {
        super();
        this.Property_Name = 'Y';
        this.Class_Name = 'Number';
    }
    Attributes()
    {
    }
}
class Statement_Z  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'z';
    static Gs_Keyword = 'z';
    constructor()
    {
        super();
        this.Property_Name = 'Z';
        this.Class_Name = 'Number';
    }
    Attributes()
    {
    }
}
class Syntax_Red  extends Syntax {
    static Gal_Keyword = 'red';
    static Gs_Keyword = 'red';
    Javascript_Generate()
    {
        debugger;
        console.log('Generate Javascript for red');
    }
    Attributes()
    {
    }
}
class Statement_Resource  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'resource';
    static Gs_Keyword = 'resource';
    constructor()
    {
        super();
        this.Property_Name = 'Resource';
        this.Class_Name = 'String';
    }
    Attributes()
    {
    }
}
class Statement_Workaround  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'workaround';
    static Gs_Keyword = 'workaround';
    constructor()
    {
        super();
        this.Property_Name = 'Workaround';
        this.Class_Name = 'String';
    }
    Attributes()
    {
    }
}
class Statement_Status  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'status';
    static Gs_Keyword = 'status';
    constructor()
    {
        super();
        this.Property_Name = 'Status';
        this.Class_Name = 'String';
    }
    Attributes()
    {
    }
}
class Statement_Start  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'start';
    static Gs_Keyword = 'start';
    constructor()
    {
        super();
        this.Property_Name = 'Start';
        this.Class_Name = 'Date';
    }
    Attributes()
    {
    }
}
class Statement_End  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'end';
    static Gs_Keyword = 'end';
    constructor()
    {
        super();
        this.Property_Name = 'End';
        this.Class_Name = 'Date';
    }
    Attributes()
    {
    }
}
class Statement_Foo  extends Entity_Definition_Statement {
    static Gal_Keyword = 'foo';
    static Gs_Keyword = 'foo';
    constructor()
    {
        super();
        this.Class_Name = 'Foo';
        this.Name = undefined;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Name';
        }
        this.Name = this.Listargs.shift();
    }
}
class Statement_Bar  extends Feature_Assignment_Statement {
    static Gal_Keyword = 'bar';
    static Gs_Keyword = 'bar';
    constructor()
    {
        super();
        this.Property_Name = 'Bar';
        this.Class_Name = 'String';
    }
    Attributes()
    {
    }
}
class Statement_Uuid  extends Line_Statement {
    static Gal_Keyword = 'uuid';
    static Gs_Keyword = 'uuid';
    constructor()
    {
        super();
        this.Variable = undefined;
    }
    Python_Generate()
    {
        var Python_Code = this.Variable.Python + ' = uuid.uuid4().hex' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'var ' + this.Variable.Javascript + ' = self.crypto.randomUUID();' + "\n";
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Variable';
        }
        this.Variable = this.Listargs.shift();
    }
}
class Statement_Author  extends Line_Statement {
    static Gal_Keyword = 'author';
    static Gs_Keyword = 'author';
    Fallback_Generate()
    {
        var Gal_Code = 'comment Author:' + this.Fallback_Arguments() + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Syntax_Generator  extends Syntax {
    static Gal_Keyword = 'generator';
    static Gs_Keyword = 'generator';
    Python_Generate()
    {
        var Python_Code = 'Python_Generator';
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'Javascript_Generator';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Execute  extends Statement {
    static Gal_Keyword = 'execute';
    static Gs_Keyword = 'execute';
    constructor()
    {
        super();
        this.Target = undefined;
    }
    Python_Generate()
    {
        var Python_Code = 'exec(' + this.Target.Python + ', globals())' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = 'eval(' + this.Target.Javascript + ');';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Target';
        }
        this.Target = this.Listargs.shift();
    }
}
class Statement_Prompt_Context  extends Statement {
    static Gal_Keyword = 'prompt.context';
    static Gs_Keyword = 'prompt.context';
    Python_Generate()
    {
        var Python_Code = 'global INPUT' + "\n" + 'global OUTPUT' + "\n";
        this.Python = Python_Code;
    }
    Javascript_Generate()
    {
        var Javascript_Code = '';
        this.Javascript = Javascript_Code;
    }
    Attributes()
    {
    }
}
class Statement_Element  extends Statement {
    static Gal_Keyword = 'element';
    static Gs_Keyword = 'element';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        if (!(this.Class_Name !== undefined))
        {
            debugger;
        }
        var Code = 'push [my Elements] (new ' + this.Class_Name.Fallback + ');';
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}

/* comment 'Goal.gal'; */
class Statement_Tilda  extends Invocation_Statement {
    static Gal_Keyword = '~';
    static Gs_Keyword = '~';
    constructor()
    {
        super();
        this.Definition = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '. [. ' + this.Definition.Fallback + ' Implementor]' + this.Fallback_Args() + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Definition';
        }
        this.Definition = this.Listargs.shift();
        this.Definition.Usage = 'entity';
    }
}
class Operation_Tilda  extends Invocation_Operation {
    static Gal_Keyword = '~';
    static Gs_Keyword = '~';
    constructor()
    {
        super();
        this.Definition = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(. [. ' + this.Definition.Fallback + ' Implementor]' + this.Fallback_Args() + ')';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Definition';
        }
        this.Definition = this.Listargs.shift();
        this.Definition.Usage = 'entity';
    }
}
class Syntax_Tilda  extends Syntax {
    static Gal_Keyword = '~';
    static Gs_Keyword = '~';
    constructor()
    {
        super();
        this.Definition = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '[. ' + this.Definition.Fallback + ' Implemetor' + this.Fallback_Args() + ']';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Definition';
        }
        this.Definition = this.Listargs.shift();
        this.Definition.Usage = 'entity';
    }
}
class Statement_TildaI  extends Invocation_Statement {
    static Gal_Keyword = '~i';
    static Gs_Keyword = '~i';
    constructor()
    {
        super();
        this.Method = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '. [. [self] Implementor] ' + this.Method.Fallback + this.Fallback_Args() + ';';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Method';
        }
        this.Method = this.Listargs.shift();
        this.Method.Usage = 'method';
    }
}
class Operation_TildaI  extends Invocation_Operation {
    static Gal_Keyword = '~i';
    static Gs_Keyword = '~i';
    constructor()
    {
        super();
        this.Method = undefined;
    }
    Fallback_Generate()
    {
        var Gal_Code = '(. [. [self] Implementor] ' + this.Method.Fallback + this.Fallback_Args() + ')';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Method';
        }
        this.Method = this.Listargs.shift();
        this.Method.Usage = 'method';
    }
}
class Syntax_TildaI  extends Syntax {
    static Gal_Keyword = '~i';
    static Gs_Keyword = '~i';
    Fallback_Generate()
    {
        var Gal_Code = '[. [. [self] Implementor] ' + this.Fallback_Args() + ']';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Interface  extends Interface_Statement {
    static Gal_Keyword = 'interface';
    static Gs_Keyword = 'interface';
    constructor()
    {
        super();
        this.Interface_Name = undefined;
    }
    Fallback_Generate()
    {
        var Owner_Class = this.Class_Context.Class_Name;
        Owner_Class = Owner_Class.replaceAll(':', '');
        var Class_Name = this.Interface_Name.Fallback;
        Class_Name = Class_Name.replaceAll(':', '');
        var Interface_Name = "'" + Class_Name + "'";
        /* comment '= Class_Name (append ":Interface_" Owner_Class "_" Class_Name)'; */
        var Kludge = ":Interface_" + Owner_Class;
        Kludge += "_" + Class_Name;
        Class_Name = Kludge;
        /* comment 'Generate the interface class as specified.'; */
        var Class_Args = this.Fallback_Args();
        var Class_Body = this.Fallback_Block();
        var Class_Code = 'class ' + Class_Name + Class_Args + ' [is Interface]' + Class_Body;
        /* comment 'Generate goal interface class property assignment.'; */
        var Interface_Assignment = 'class.property ' + Interface_Name + ' [: ' + Class_Name + '];' + "\n";
        this.Fallback_Declaration = Interface_Assignment;
        this.Fallback = Class_Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Interface_Name';
        }
        this.Interface_Name = this.Listargs.shift();
    }
}
class Statement_Implementor  extends Line_Statement {
    static Gal_Keyword = 'implementor';
    static Gs_Keyword = 'implementor';
    constructor()
    {
        super();
        this.Interface = undefined;
        this.Implementor = undefined;
    }
    Fallback_Generate()
    {
        var Interface_Fallback = "'" + this.Interface.Fallback + "'";
        var Implementor_Fallback = this.Implementor.Fallback;
        var Interface_Assignment = 'dict.assign [classprop Interfaces] ' + Interface_Fallback + ' ' + Implementor_Fallback + ';';
        this.Fallback = Interface_Assignment;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Interface';
        }
        this.Interface = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Implementor';
        }
        this.Implementor = this.Listargs.shift();
    }
}
class Statement_Attribute  extends Property_Statement {
    static Gal_Keyword = 'attribute';
    static Gs_Keyword = 'attribute';
    constructor()
    {
        super();
        this.Data_Type = undefined;
        this.Property_Name = undefined;
        this.Class_Name = undefined;
    }
    Inference_Context()
    {
        return this;
    }
    Fallback_Generate()
    {
        var Property_Fallback = this.Property_Name.Fallback;
        var Type_Fallback = this.Data_Type.Fallback;
        var Ancestor_Fallback = 'Attribute';
        var Class_Fallback;
        if (this.Class_Name !== undefined)
        {
            Class_Fallback = this.Class_Name.Fallback;
        }
        else
        {
            var Type_Name = Type_Fallback.charAt(0).toUpperCase() + Type_Fallback.substr(1);
            if (Type_Name == 'Entity')
            {
                Type_Name = 'Object';
            }
            Class_Fallback = Type_Name;
        }
        var Code = 'property entity ' + Property_Fallback + ' (new ' + Class_Fallback + ' [self]);' + "\n";
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Data_Type';
        }
        this.Data_Type = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Property_Name';
        }
        this.Property_Name = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Class_Name = this.Listargs.shift();
        }
    }
}
class Statement_Class_Attribute  extends Property_Statement {
    static Gal_Keyword = 'class.attribute';
    static Gs_Keyword = 'class.attribute';
    constructor()
    {
        super();
        this.Data_Type = undefined;
        this.Property_Name = undefined;
        this.Class_Name = undefined;
    }
    Inference_Context()
    {
        return this;
    }
    Fallback_Generate()
    {
        var Property_Fallback = this.Property_Name.Fallback;
        var Type_Fallback = this.Data_Type.Fallback;
        var Ancestor_Fallback = 'Attribute';
        var Class_Fallback;
        if (this.Class_Name !== undefined)
        {
            Class_Fallback = this.Class_Name.Fallback;
        }
        else
        {
            var Type_Name = Type_Fallback.charAt(0).toUpperCase() + Type_Fallback.substr(1);
            Class_Fallback = Type_Name;
        }
        /* comment "Class Property entities don't know their owner!"; */
        var Code = 'class.property entity ' + Property_Fallback + ' (new Class_' + Class_Fallback + ');' + "\n";
        this.Fallback = Code;
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Data_Type';
        }
        this.Data_Type = this.Listargs.shift();
        if (this.Listargs.length == 0)
        {
            throw 'missing required argument Property_Name';
        }
        this.Property_Name = this.Listargs.shift();
        if (this.Listargs.length > 0)
        {
            this.Class_Name = this.Listargs.shift();
        }
    }
}
class Statement_Behavior  extends Method_Statement {
    static Gal_Keyword = 'behavior';
    static Gs_Keyword = 'behavior';
    Fallback_Generate()
    {
        var Code = 'method' + this.Fallback_Args() + this.Fallback_Block();
        this.Fallback = Code;
    }
    Attributes()
    {
    }
}
class Syntax_Attribute  extends Syntax {
    static Gal_Keyword = 'attribute';
    static Gs_Keyword = 'attribute';
    static Aliases = " att get value ";
    Fallback_Generate()
    {
        var Gal_Code = '[. ' + this.Fallback_Args() + ' Attribute_Value]';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Syntax_Certainty  extends Syntax {
    static Gal_Keyword = 'certainty';
    static Gs_Keyword = 'certainty';
    static Aliases = " cert ";
    Fallback_Generate()
    {
        var Gal_Code = '[. ' + this.Fallback_Args() + ' Attribute_Certainty]';
        this.Fallback = Gal_Code;
    }
    Attributes()
    {
    }
}
class Statement_Old_Goal  extends Goal_Statement {
    static Gal_Keyword = 'goal';
    static Gs_Keyword = 'goal';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        var Name = this.Class_Name.Fallback;
        var Definitions = '';
        var Subgoals = '';
        var Statement;
        for (Statement of this.Block.Statements)
        {
            var Definition = Statement.Fallback_Declaration;
            var Subgoal = Statement.Fallback;
            if ((Definition !== undefined && Definition > ""))
            {
                Definitions += Definition + "\n";
            }
            if ((Subgoal !== undefined && Subgoal > ""))
            {
                Subgoals += Subgoal + "\n";
            }
        }
        var Code = 'class Goal_' + Name + ' [is Goal]' + "\n" + '{' + "\n" + this.Indent(Definitions) + '}' + this.Indent(Subgoals) + 'comment `End of Goal_' + Name + ' scope.`;' + "\n".repeat(2);
        this.Fallback = Code;
        this.Fallback_Declaration = 'property entity Goal_'  +  Name  +  ' (new Goal_'  +  Name  +  ');';
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}
class Statement_Test  extends Goal_Statement {
    static Gal_Keyword = 'test';
    static Gs_Keyword = 'test';
    constructor()
    {
        super();
        this.Class_Name = undefined;
    }
    Fallback_Generate()
    {
        var Name = this.Class_Name.Fallback;
        var Definitions = '';
        var Subgoals = '';
        var Statement;
        for (Statement of this.Block.Statements)
        {
            var Definition = Statement.Fallback_Declaration;
            var Subgoal = Statement.Fallback;
            if ((Definition !== undefined && Definition > ""))
            {
                Definitions += Definition + "\n";
            }
            if ((Subgoal !== undefined && Subgoal > ""))
            {
                Subgoals += Subgoal + "\n";
            }
        }
        var Args = this.Fallback_Args();
        var Code = 'goal Test_' + Name + ' ' + Args + "\n" + '{' + "\n" + this.Indent(Definitions) + '}' + this.Indent(Subgoals) + 'comment `End of Test_' + Name + ' scope.`;' + "\n".repeat(2);
        this.Fallback = Code;
        this.Fallback_Declaration = 'property entity Goal_'  +  Name  +  ' (new Goal_'  +  Name  +  ');';
    }
    Attributes()
    {
        if (this.Listargs.length == 0)
        {
            throw 'missing required Class_Name';
        }
        this.Class_Name = this.Listargs.shift();
    }
}

/* comment 'Factory.gal'; */
class Factory extends gal {
    static Element_Index = {};
    static Add_Index(Element)
    {
        try
        {
            this.Element_Index[Element.constructor.name]++;
        }
        catch
        {
            this.Element_Index[Element.constructor.name] = 1;
        }
    }
    static Create_Token(Char, Next, Position)
    {
        var New_Token;
        if (Token_Operation_Start.Predict(Char, Next))
        {
            New_Token = new Token_Operation_Start();
        }
        else if (Token_Operation_End.Predict(Char, Next))
        {
            New_Token = new Token_Operation_End();
        }
        else if (Token_Syntax_Start.Predict(Char, Next))
        {
            New_Token = new Token_Syntax_Start();
        }
        else if (Token_Syntax_End.Predict(Char, Next))
        {
            New_Token = new Token_Syntax_End();
        }
        else if (Token_Block_Start.Predict(Char, Next))
        {
            New_Token = new Token_Block_Start();
        }
        else if (Token_Block_End.Predict(Char, Next))
        {
            New_Token = new Token_Block_End();
        }
        else if (Token_Semi.Predict(Char, Next))
        {
            New_Token = new Token_Semi();
        }
        else if (Token_Comma.Predict(Char, Next))
        {
            New_Token = new Token_Comma();
        }
        else if (Token_Class_Name.Predict(Char, Next))
        {
            New_Token = new Token_Class_Name();
        }
        else if (Token_Name.Predict(Char, Next))
        {
            New_Token = new Token_Name();
        }
        else if (Token_Keyvalue_Start.Predict(Char, Next))
        {
            New_Token = new Token_Keyvalue_Start();
        }
        else if (Token_Keyvalue_End.Predict(Char, Next))
        {
            New_Token = new Token_Keyvalue_End();
        }
        else if (Quote.Predict(Char, Next))
        {
            New_Token = new Quote();
        }
        else if (Token_Space.Predict(Char, Next))
        {
            New_Token = new Token_Space();
        }
        else if (Number.Predict(Char, Next))
        {
            New_Token = new Number();
        }
        else
        {
            New_Token = new Token_Name();
        }
        New_Token.Input = Char;
        New_Token.Start_Position = Position;
        New_Token.End_Position = Position;
        Factory.Add_Index(New_Token);
        return New_Token;
    }
    static Create_Statement(Input_Token, Next, Document, Parent_Element)
    {
        var Verb = ' ' + Input_Token.Input.toLowerCase() + ' ';
        var Element;
        if (' = assign '.includes(Verb))
        {
            Element = new Statement_Assign();
        }
        else if (' . call '.includes(Verb))
        {
            Element = new Statement_Call();
        }
        else if (' : c. '.includes(Verb))
        {
            Element = new Statement_Colon();
        }
        else if (' .= property.assign property.set propset '.includes(Verb))
        {
            Element = new Statement_Propset();
        }
        else if (' := cp.= classpropset '.includes(Verb))
        {
            Element = new Statement_Classpropset();
        }
        else if (' ~ tilda '.includes(Verb))
        {
            Element = new Statement_Tilda();
        }
        else if (' ~i tildai '.includes(Verb))
        {
            Element = new Statement_TildaI();
        }
        else if (' add + += '.includes(Verb))
        {
            Element = new Statement_Add();
        }
        else if (' and & &= '.includes(Verb))
        {
            Element = new Statement_And();
        }
        else if (' alias '.includes(Verb))
        {
            Element = new Statement_Alias();
        }
        else if (' answer '.includes(Verb))
        {
            Element = new Statement_Answer();
        }
        else if (' append string.append s+ '.includes(Verb))
        {
            Element = new Statement_Append();
        }
        else if (' argument '.includes(Verb))
        {
            Element = new Statement_Argument();
        }
        else if (' arguments '.includes(Verb))
        {
            Element = new Statement_Arguments();
        }
        else if (' atomic '.includes(Verb))
        {
            Element = new Statement_Atomic();
        }
        else if (' attribute '.includes(Verb))
        {
            Element = new Statement_Attribute();
        }
        else if (' author '.includes(Verb))
        {
            Element = new Statement_Author();
        }
        else if (' behavior '.includes(Verb))
        {
            Element = new Statement_Behavior();
        }
        else if (' break '.includes(Verb))
        {
            Element = new Statement_Break();
        }
        else if (' break.if breakif '.includes(Verb))
        {
            Element = new Statement_Breakif();
        }
        else if (' catch '.includes(Verb))
        {
            Element = new Statement_Catch();
        }
        else if (' class class.append class.addendum '.includes(Verb))
        {
            Element = new Statement_Class();
        }
        else if (' class.attribute '.includes(Verb))
        {
            Element = new Statement_Class_Attribute();
        }
        else if (' class.method classmethod '.includes(Verb))
        {
            Element = new Statement_Class_Method();
        }
        else if (' class.property classprop setting our '.includes(Verb))
        {
            Element = new Statement_Class_Property();
        }
        else if (' comment '.includes(Verb))
        {
            Element = new Statement_Comment();
        }
        else if (' constructor '.includes(Verb))
        {
            Element = new Statement_Constructor();
        }
        else if (' contest '.includes(Verb))
        {
            Element = new Statement_Contest();
        }
        else if (' continue '.includes(Verb))
        {
            Element = new Statement_Continue();
        }
        else if (' continue.if contif '.includes(Verb))
        {
            Element = new Statement_Contif();
        }
        else if (' currency '.includes(Verb))
        {
            Element = new Statement_Currency();
        }
        else if (' debug d debugger; '.includes(Verb))
        {
            Element = new Statement_Debug();
        }
        else if (' debugif di '.includes(Verb))
        {
            Element = new Statement_Debug_If();
        }
        else if (' debug.stack ds '.includes(Verb))
        {
            Element = new Statement_Debug_Stack();
        }
        else if (' debug.variable dv '.includes(Verb))
        {
            Element = new Statement_Debug_Variable();
        }
        else if (' definition '.includes(Verb))
        {
            Element = new Statement_Definition();
        }
        else if (' dialect '.includes(Verb))
        {
            Element = new Statement_Dialect();
        }
        else if (' dictionary dict hash '.includes(Verb))
        {
            Element = new Statement_Dictionary();
        }
        else if (' dictionary.= dict.= hash.= dictionary.assign dict.assign hash.assign '.includes(Verb))
        {
            Element = new Statement_Dictionary_Assign();
        }
        else if (' either '.includes(Verb))
        {
            Element = new Statement_Either();
        }
        else if (' element '.includes(Verb))
        {
            Element = new Statement_Element();
        }
        else if (' else '.includes(Verb))
        {
            Element = new Statement_Else();
        }
        else if (' else.if elsif elseif '.includes(Verb))
        {
            Element = new Statement_Else_If();
        }
        else if (' english '.includes(Verb))
        {
            Element = new Statement_English();
        }
        else if (' entities '.includes(Verb))
        {
            Element = new Statement_Entities();
        }
        else if (' entity object '.includes(Verb))
        {
            Element = new Statement_Entity();
        }
        else if (' entity.my.class entity.myclass entity.self.class entity.selfclass object.my.class object.myclass object.self.class object.selfclass '.includes(Verb))
        {
            Element = new Statement_Entity_My_Class();
        }
        else if (' entity.new new.entity object.new new.object '.includes(Verb))
        {
            Element = new Statement_Entity_New();
        }
        else if (' error raise throw '.includes(Verb))
        {
            Element = new Statement_Error();
        }
        else if (' either '.includes(Verb))
        {
            Element = new Statement_Either();
        }
        else if (' execute '.includes(Verb))
        {
            Element = new Statement_Execute();
        }
        else if (' fallback '.includes(Verb))
        {
            Element = new Statement_Fallback();
        }
        else if (' infer.inits '.includes(Verb))
        {
            Element = new Statement_Infer_Inits();
        }
        else if (' flag boolean bool '.includes(Verb))
        {
            Element = new Statement_Flag();
        }
        else if (' file.append '.includes(Verb))
        {
            Element = new Statement_File_Append();
        }
        else if (' file.append.file '.includes(Verb))
        {
            Element = new Statement_File_Append_File();
        }
        else if (' file.copy.file file.copy '.includes(Verb))
        {
            Element = new Statement_File_Copy();
        }
        else if (' file.readall readall '.includes(Verb))
        {
            Element = new Statement_File_Readall();
        }
        else if (' file.dump '.includes(Verb))
        {
            Element = new Statement_File_Dump();
        }
        else if (' for.range '.includes(Verb))
        {
            Element = new Statement_For_Range();
        }
        else if (' foreach list.foreach '.includes(Verb))
        {
            Element = new Statement_Foreach();
        }
        else if (' forever '.includes(Verb))
        {
            Element = new Statement_Forever();
        }
        else if (' forgive '.includes(Verb))
        {
            Element = new Statement_Forgive();
        }
        else if (' forward '.includes(Verb))
        {
            Element = new Statement_Forward();
        }
        else if (' gal general.abstract.language general_abstract_language '.includes(Verb))
        {
            Element = new Statement_Gal();
        }
        else if (' generate '.includes(Verb))
        {
            Element = new Statement_Generate();
        }
        else if (' goalspell goal.spell '.includes(Verb))
        {
            Element = new Statement_Goalspell();
        }
        else if (' gs '.includes(Verb))
        {
            Element = new Statement_Gs();
        }
        else if (' isa is_a handle classify '.includes(Verb))
        {
            Element = new Statement_Classify();
        }
        else if (' i self me this '.includes(Verb))
        {
            Element = new Statement_I();
        }
        else if (' if '.includes(Verb))
        {
            Element = new Statement_If();
        }
        else if (' ifdef '.includes(Verb))
        {
            Element = new Statement_Ifdef();
        }
        else if (' infer '.includes(Verb))
        {
            Element = new Statement_Infer();
        }
        else if (' flowerbox '.includes(Verb))
        {
            Element = new Statement_Flowerbox();
        }
        else if (' increment ++ '.includes(Verb))
        {
            Element = new Statement_Increment();
        }
        else if (' integer int '.includes(Verb))
        {
            Element = new Statement_Integer();
        }
        else if (' inference '.includes(Verb))
        {
            Element = new Statement_Inference();
        }
        else if (' infers '.includes(Verb))
        {
            Element = new Statement_Infers();
        }
        else if (' integers ints '.includes(Verb))
        {
            Element = new Statement_Integers();
        }
        else if (' iterate dict.iterate dictionary.iterate hash.iterate '.includes(Verb))
        {
            Element = new Statement_Iterate();
        }
        else if (' javascript '.includes(Verb))
        {
            Element = new Statement_Javascript();
        }
        else if (' join list.join '.includes(Verb))
        {
            Element = new Statement_Join();
        }
        else if (' keyword '.includes(Verb))
        {
            Element = new Statement_Keyword();
        }
        else if (' know import use include '.includes(Verb))
        {
            Element = new Statement_Know();
        }
        else if (' gal.language '.includes(Verb))
        {
            Element = new Statement_Gal_Language();
        }
        else if (' list '.includes(Verb))
        {
            Element = new Statement_List();
        }
        else if (' list.append push list.push '.includes(Verb))
        {
            Element = new Statement_List_Append();
        }
        else if (' list.delete list.remove list.splice '.includes(Verb))
        {
            Element = new Statement_List_Delete();
        }
        else if (' list.copy '.includes(Verb))
        {
            Element = new Statement_List_Copy();
        }
        else if (' list.clear '.includes(Verb))
        {
            Element = new Statement_List_Clear();
        }
        else if (' main '.includes(Verb))
        {
            Element = new Statement_Main();
        }
        else if (' method '.includes(Verb))
        {
            Element = new Statement_Method();
        }
        else if (' module '.includes(Verb))
        {
            Element = new Statement_Module();
        }
        else if (' mumps '.includes(Verb))
        {
            Element = new Statement_Mumps();
        }
        else if (' my= my.= self.= '.includes(Verb))
        {
            Element = new Statement_My_Equal();
        }
        else if (' i= it= self= '.includes(Verb))
        {
            Element = new Statement_I_Equal();
        }
        else if (' new '.includes(Verb))
        {
            Element = new Statement_New();
        }
        else if (' number '.includes(Verb))
        {
            Element = new Statement_Number();
        }
        else if (' numbers '.includes(Verb))
        {
            Element = new Statement_Numbers();
        }
        else if (' oho optimize.human.outcome optimize_human_outcome'.includes(Verb))
        {
            Element = new Statement_Oho();
        }
        else if (' operation '.includes(Verb))
        {
            Element = new Statement_Operation();
        }
        else if (' operations '.includes(Verb))
        {
            Element = new Statement_Operations();
        }
        else if (' optional '.includes(Verb))
        {
            Element = new Statement_Optional();
        }
        else if (' our.= our= us.= us= '.includes(Verb))
        {
            Element = new Statement_Our_Equal();
        }
        else if (' parser '.includes(Verb))
        {
            Element = new Statement_Parser();
        }
        else if (' principle '.includes(Verb))
        {
            Element = new Statement_Principle();
        }
        else if (' prompt.context '.includes(Verb))
        {
            Element = new Statement_Prompt_Context();
        }
        else if (' property my '.includes(Verb))
        {
            Element = new Statement_Property();
        }
        else if (' python '.includes(Verb))
        {
            Element = new Statement_Python();
        }
        else if (' question '.includes(Verb))
        {
            Element = new Statement_Question();
        }
        else if (' readline read.line '.includes(Verb))
        {
            Element = new Statement_Read_Line();
        }
        else if (' replace string.replace '.includes(Verb))
        {
            Element = new Statement_Replace();
        }
        else if (' requirement '.includes(Verb))
        {
            Element = new Statement_Requirement();
        }
        else if (' spell '.includes(Verb))
        {
            Element = new Statement_Spell();
        }
        else if (' goal '.includes(Verb))
        {
            Element = new Statement_Goal();
        }
        else if (' read.char '.includes(Verb))
        {
            Element = new Statement_Read_Character();
        }
        else if (' read.char.timed '.includes(Verb))
        {
            Element = new Statement_Read_Character_Timed();
        }
        else if (' return '.includes(Verb))
        {
            Element = new Statement_Return();
        }
        else if (' require.that '.includes(Verb))
        {
            Element = new Statement_Require_That();
        }
        else if (' require.that.i '.includes(Verb))
        {
            Element = new Statement_Require_That_I();
        }
        else if (' return.if returnif '.includes(Verb))
        {
            Element = new Statement_Return_If();
        }
        else if (' sequence '.includes(Verb))
        {
            Element = new Statement_Sequence();
        }
        else if (' sort '.includes(Verb))
        {
            Element = new Statement_Sort();
        }
        else if (' protocol '.includes(Verb))
        {
            Element = new Statement_Old_Goal();
        }
        else if (' skiptoken skip.token '.includes(Verb))
        {
            Element = new Statement_Skip_Token();
        }
        else if (' statement '.includes(Verb))
        {
            Element = new Statement_Statement();
        }
        else if (' statements '.includes(Verb))
        {
            Element = new Statement_Statements();
        }
        else if (' string '.includes(Verb))
        {
            Element = new Statement_String();
        }
        else if (' strings '.includes(Verb))
        {
            Element = new Statement_Strings();
        }
        else if (' symbol '.includes(Verb))
        {
            Element = new Statement_Symbol();
        }
        else if (' syntax '.includes(Verb))
        {
            Element = new Statement_Syntax();
        }
        else if (' syntaxes '.includes(Verb))
        {
            Element = new Statement_Syntaxes();
        }
        else if (' test '.includes(Verb))
        {
            Element = new Statement_Test();
        }
        else if (' todo '.includes(Verb))
        {
            Element = new Statement_Todo();
        }
        else if (' token '.includes(Verb))
        {
            Element = new Statement_Token();
        }
        else if (' token.append '.includes(Verb))
        {
            Element = new Statement_Token_Append();
        }
        else if (' newtoken '.includes(Verb))
        {
            Element = new Statement_New_Token();
        }
        else if (' tokenmode '.includes(Verb))
        {
            Element = new Statement_Token_Mode();
        }
        else if (' tokens '.includes(Verb))
        {
            Element = new Statement_Tokens();
        }
        else if (' try '.includes(Verb))
        {
            Element = new Statement_Try();
        }
        else if (' undef undefined '.includes(Verb))
        {
            Element = new Statement_Undef();
        }
        else if (' unless '.includes(Verb))
        {
            Element = new Statement_Unless();
        }
        else if (' variant '.includes(Verb))
        {
            Element = new Statement_Variant();
        }
        else if (' verb polymorph '.includes(Verb))
        {
            Element = new Statement_Verb();
        }
        else if (' verbose '.includes(Verb))
        {
            Element = new Statement_Verbose();
        }
        else if (' verbosity '.includes(Verb))
        {
            Element = new Statement_Verbosity();
        }
        else if (' we us '.includes(Verb))
        {
            Element = new Statement_We();
        }
        else if (' myclass '.includes(Verb))
        {
            Element = new Statement_Myclass();
        }
        else if (' while '.includes(Verb))
        {
            Element = new Statement_While();
        }
        else if (' write '.includes(Verb))
        {
            Element = new Statement_Write();
        }
        else if (' writeline say write.line '.includes(Verb))
        {
            Element = new Statement_Write_Line();
        }
        else if (' raku '.includes(Verb))
        {
            Element = new Statement_Raku();
        }
        /* comment 'Book Dialect'; */
        else if (' book '.includes(Verb))
        {
            Element = new Statement_Book();
        }
        else if (' chapter chap '.includes(Verb))
        {
            Element = new Statement_Chapter();
        }
        else if (' section '.includes(Verb))
        {
            Element = new Statement_Section();
        }
        else if (' overview '.includes(Verb))
        {
            Element = new Statement_Overview();
        }
        else if (' expository exposition expo '.includes(Verb))
        {
            Element = new Statement_Expository();
        }
        else if (' paragraph p '.includes(Verb))
        {
            Element = new Statement_Paragraph();
        }
        else if (' linux shell '.includes(Verb))
        {
            Element = new Statement_Shell();
        }
        else if (' summary summ '.includes(Verb))
        {
            Element = new Statement_Summary();
        }
        else if (' title '.includes(Verb))
        {
            Element = new Statement_Title();
        }
        else if (' description desc '.includes(Verb))
        {
            Element = new Statement_Description();
        }
        else if (' codefile code '.includes(Verb))
        {
            Element = new Statement_Codefile();
        }
        else if (' book.gal '.includes(Verb))
        {
            Element = new Statement_Book_Gal();
        }
        else if (' book.raku '.includes(Verb))
        {
            Element = new Statement_Book_Raku();
        }
        else if (' book.fallback '.includes(Verb))
        {
            Element = new Statement_Book_Fallback();
        }
        else if (' book.python '.includes(Verb))
        {
            Element = new Statement_Book_Python();
        }
        else if (' book.javascript '.includes(Verb))
        {
            Element = new Statement_Book_Javascript();
        }
        else if (' feature '.includes(Verb))
        {
            Element = new Statement_Feature();
        }
        else if (' thing '.includes(Verb))
        {
            Element = new Statement_Thing();
        }
        else if (' resource '.includes(Verb))
        {
            Element = new Statement_Resource();
        }
        else if (' task '.includes(Verb))
        {
            Element = new Statement_Task();
        }
        else if (' subtask '.includes(Verb))
        {
            Element = new Statement_Subtask();
        }
        else if (' workaround '.includes(Verb))
        {
            Element = new Statement_Workaround();
        }
        else if (' status '.includes(Verb))
        {
            Element = new Statement_Status();
        }
        else if (' start '.includes(Verb))
        {
            Element = new Statement_Start();
        }
        else if (' end '.includes(Verb))
        {
            Element = new Statement_End();
        }
        else if (' scene '.includes(Verb))
        {
            Element = new Statement_Scene();
        }
        else if (' camera '.includes(Verb))
        {
            Element = new Statement_Camera();
        }
        else if (' box '.includes(Verb))
        {
            Element = new Statement_Box();
        }
        else if (' position '.includes(Verb))
        {
            Element = new Statement_Position();
        }
        else if (' animation '.includes(Verb))
        {
            Element = new Statement_Animation();
        }
        else if (' center '.includes(Verb))
        {
            Element = new Statement_Center();
        }
        else if (' color '.includes(Verb))
        {
            Element = new Statement_Color();
        }
        else if (' rotation '.includes(Verb))
        {
            Element = new Statement_Rotation();
        }
        else if (' size '.includes(Verb))
        {
            Element = new Statement_Size();
        }
        else if (' texture '.includes(Verb))
        {
            Element = new Statement_Texture();
        }
        else if (' x '.includes(Verb))
        {
            Element = new Statement_X();
        }
        else if (' y '.includes(Verb))
        {
            Element = new Statement_Y();
        }
        else if (' z '.includes(Verb))
        {
            Element = new Statement_Z();
        }
        else if (' uuid '.includes(Verb))
        {
            Element = new Statement_Uuid();
        }
        else
        {
            throw "Unknown Statement '" + Input_Token.Input + "'";
        }
        Element.Elements.push(Input_Token);
        Element.Verb = Next.Input;
        Element.Start_Position = Input_Token.Start_Position;
        Element.End_Position = Input_Token.End_Position;
        Element.Document = Document;
        Element.Parent = Parent_Element;
        Element.Block = new Block();
        Element.Ensure_Block();
        return Element;
    }
    static Create_Operation(Input_Token, Next, Document, Parent_Element)
    {
        var Verb = ' ' + Next.Input.toLowerCase() + ' ';
        var Element;
        /* comment 'Numeric Operations'; */
        if (' + add '.includes(Verb))
        {
            Element = new Operation_Add();
        }
        else if (' greater gt '.includes(Verb))
        {
            Element = new Operation_Greater();
        }
        else if (' greater.equal ge '.includes(Verb))
        {
            Element = new Operation_Greater_Equal();
        }
        else if (' divide div / '.includes(Verb))
        {
            Element = new Operation_Divide();
        }
        else if (' less lt '.includes(Verb))
        {
            Element = new Operation_Less();
        }
        else if (' less.equal le '.includes(Verb))
        {
            Element = new Operation_Less_Equal();
        }
        else if (' multiply mult * '.includes(Verb))
        {
            Element = new Operation_Multiply();
        }
        else if (' round '.includes(Verb))
        {
            Element = new Operation_Round();
        }
        else if (' subtract - '.includes(Verb))
        {
            Element = new Operation_Subtract();
        }
        /* comment 'Logical Operations'; */
        else if (' & and '.includes(Verb))
        {
            Element = new Operation_And();
        }
        else if (' equal = '.includes(Verb))
        {
            Element = new Operation_Equal();
        }
        else if (' != ne not.= not.equal '.includes(Verb))
        {
            Element = new Operation_Not_Equal();
        }
        else if (' not ! '.includes(Verb))
        {
            Element = new Operation_Not();
        }
        else if (' or | '.includes(Verb))
        {
            Element = new Operation_Or();
        }
        /* comment 'Invocation Operations'; */
        else if (' . call '.includes(Verb))
        {
            Element = new Operation_Call();
        }
        else if (' : cm class.method '.includes(Verb))
        {
            Element = new Operation_Colon();
        }
        else if (' i self me this '.includes(Verb))
        {
            Element = new Operation_I();
        }
        else if (' we '.includes(Verb))
        {
            Element = new Operation_We();
        }
        /* comment 'Class Operations'; */
        else if (' classpropget '.includes(Verb))
        {
            Element = new Operation_Classpropget();
        }
        else if (' new '.includes(Verb))
        {
            Element = new Operation_New();
        }
        /* comment 'Variable Operations'; */
        else if (' defined '.includes(Verb))
        {
            Element = new Operation_Defined();
        }
        else if (' isnull is.null '.includes(Verb))
        {
            Element = new Operation_Is_Null();
        }
        else if (' notnull not.null '.includes(Verb))
        {
            Element = new Operation_Not_Null();
        }
        else if (' env environ environment '.includes(Verb))
        {
            Element = new Operation_Environment();
        }
        /* comment 'Dictionary/Hash Operations'; */
        else if (' key.get dict.get dictionary.get hash.get '.includes(Verb))
        {
            Element = new Operation_Key_Get();
        }
        else if (' key.exists dict.exists dictionary.exists hash.exists '.includes(Verb))
        {
            Element = new Operation_Key_Exists();
        }
        /* comment 'String Operations'; */
        else if (' firstchar '.includes(Verb))
        {
            Element = new Operation_Firstchar();
        }
        else if (' is.whitespace whitespace '.includes(Verb))
        {
            Element = new Operation_Whitespace();
        }
        else if (' lastchar '.includes(Verb))
        {
            Element = new Operation_Lastchar();
        }
        else if (' lowercase lower '.includes(Verb))
        {
            Element = new Operation_Lowercase();
        }
        else if (' startswith starts.with starts begins beginswith begins.with '.includes(Verb))
        {
            Element = new Operation_Begins();
        }
        else if (' string '.includes(Verb))
        {
            Element = new Operation_String();
        }
        else if (' string.append append s.append s+ '.includes(Verb))
        {
            Element = new Operation_Append();
        }
        else if (' string.contains contains s.contains '.includes(Verb))
        {
            Element = new Operation_Contains();
        }
        else if (' string.equal string.eq seq s= s.= '.includes(Verb))
        {
            Element = new Operation_String_Equal();
        }
        else if (' string.greater string.gt s.gt sgt '.includes(Verb))
        {
            Element = new Operation_String_Greater();
        }
        else if (' string.greater.equal string.ge s.ge sge '.includes(Verb))
        {
            Element = new Operation_String_Greater_Equal();
        }
        else if (' string.length length s.length s.len len '.includes(Verb))
        {
            Element = new Operation_String_Length();
        }
        else if (' string.less string.lt s.lt slt '.includes(Verb))
        {
            Element = new Operation_String_Less();
        }
        else if (' string.less.equal string.le s.le sle '.includes(Verb))
        {
            Element = new Operation_String_Less_Equal();
        }
        else if (' string.not.equal string.ne s.ne sne s!= '.includes(Verb))
        {
            Element = new Operation_String_Not_Equal();
        }
        else if (' substring '.includes(Verb))
        {
            Element = new Operation_Substring();
        }
        else if (' uppercase upper '.includes(Verb))
        {
            Element = new Operation_Uppercase();
        }
        else if (' is.lowercase is.lower islower '.includes(Verb))
        {
            Element = new Operation_Is_Lowercase();
        }
        else if (' is.uppercase is.upper isupper '.includes(Verb))
        {
            Element = new Operation_Is_Uppercase();
        }
        else if (' isalpha '.includes(Verb))
        {
            Element = new Operation_Is_Alpha();
        }
        else if (' isident '.includes(Verb))
        {
            Element = new Operation_Is_Ident();
        }
        else if (' title.case titlecase '.includes(Verb))
        {
            Element = new Operation_Titlecase();
        }
        /* comment 'Communication Operations'; */
        else if (' http.fetch fetch '.includes(Verb))
        {
            Element = new Operation_Http_Fetch();
        }
        /* comment 'Instance Operations'; */
        else if (' isa is.a '.includes(Verb))
        {
            Element = new Operation_Isa();
        }
        /* comment 'List Operations'; */
        else if (' list.get '.includes(Verb))
        {
            Element = new Operation_List_Get();
        }
        else if (' list.last '.includes(Verb))
        {
            Element = new Operation_List_Last();
        }
        else if (' list.length '.includes(Verb))
        {
            Element = new Operation_List_Length();
        }
        else if (' list.pop pop '.includes(Verb))
        {
            Element = new Operation_List_Pop();
        }
        else if (' list.shift shift '.includes(Verb))
        {
            Element = new Operation_List_Shift();
        }
        else if (' list.split split '.includes(Verb))
        {
            Element = new Operation_List_Split();
        }
        /* comment 'Database Operations'; */
        else if (' sql.escape '.includes(Verb))
        {
            Element = new Operation_Sql_Escape();
        }
        else if (' sql.query query '.includes(Verb))
        {
            Element = new Operation_Sql_Query();
        }
        /* comment 'time operations'; */
        else if (' time.string '.includes(Verb))
        {
            Element = new Operation_Time_String();
        }
        /* comment 'oho compiler operations'; */
        else if (' tokenmode '.includes(Verb))
        {
            Element = new Operation_Token_Mode();
        }
        else if (' file.exists '.includes(Verb))
        {
            Element = new Operation_File_Exists();
        }
        else if (' char2int '.includes(Verb))
        {
            Element = new Operation_Char2int();
        }
        else if (' int2char '.includes(Verb))
        {
            Element = new Operation_Int2char();
        }
        else
        {
            throw "Unknown Operation '" + Verb + "' '" + Next.Input + "'";
        }
        Element.Elements.push(Input_Token);
        Element.Start_Position = Input_Token.Start_Position;
        Element.End_Position = Input_Token.End_Position;
        Element.Document = Document;
        Element.Parent = Parent_Element;
        Factory.Add_Index(Element);
        return Element;
    }
    static Create_Syntax(Input_Token, Next, Document, Parent_Element)
    {
        var Verb = ' ' + Next.Input.toLowerCase() + ' ';
        var Element;
        if (' . property prop p '.includes(Verb))
        {
            Element = new Syntax_Dot();
        }
        else if (' ~ attribute att symbol '.includes(Verb))
        {
            Element = new Syntax_Symbol();
        }
        else if (' backslash '.includes(Verb))
        {
            Element = new Syntax_Backslash();
        }
        else if (' : '.includes(Verb))
        {
            Element = new Syntax_Colon();
        }
        else if (' class '.includes(Verb))
        {
            Element = new Syntax_Class();
        }
        else if (' class.attribute class.att classatt '.includes(Verb))
        {
            Element = new Syntax_Class_Symbol();
        }
        else if (' class.lookup lookup '.includes(Verb))
        {
            Element = new Syntax_Class_Lookup();
        }
        else if (' class.name classname '.includes(Verb))
        {
            Element = new Syntax_Class_Name();
        }
        else if (' class.property classprop cp our their '.includes(Verb))
        {
            Element = new Syntax_Class_Property();
        }
        else if (' dictionary dict hash '.includes(Verb))
        {
            Element = new Syntax_Dictionary();
        }
        else if (' entity '.includes(Verb))
        {
            Element = new Syntax_Entity();
        }
        else if (' exclude '.includes(Verb))
        {
            Element = new Syntax_Exclude();
        }
        else if (' false '.includes(Verb))
        {
            Element = new Syntax_False();
        }
        else if (' flag '.includes(Verb))
        {
            Element = new Syntax_Flag();
        }
        else if (' generator '.includes(Verb))
        {
            Element = new Syntax_Generator();
        }
        else if (' key '.includes(Verb))
        {
            Element = new Syntax_Key();
        }
        else if (' indent '.includes(Verb))
        {
            Element = new Syntax_Indent();
        }
        else if (' infinity '.includes(Verb))
        {
            Element = new Syntax_Infinity();
        }
        else if (' -infinity '.includes(Verb))
        {
            Element = new Syntax_Negative_Infinity();
        }
        else if (' integer '.includes(Verb))
        {
            Element = new Syntax_Integer();
        }
        else if (' is extends '.includes(Verb))
        {
            Element = new Syntax_Is();
        }
        else if (' italic '.includes(Verb))
        {
            Element = new Syntax_Italic();
        }
        else if (' line newline '.includes(Verb))
        {
            Element = new Syntax_Line();
        }
        else if (' list '.includes(Verb))
        {
            Element = new Syntax_List();
        }
        else if (' my self this me i '.includes(Verb))
        {
            Element = new Syntax_My();
        }
        else if (' my.attribute my.symbol '.includes(Verb))
        {
            Element = new Syntax_My_Symbol();
        }
        else if (' my.class self.class me.class us '.includes(Verb))
        {
            Element = new Syntax_My_Class();
        }
        else if (' node '.includes(Verb))
        {
            Element = new Syntax_Node();
        }
        else if (' null '.includes(Verb))
        {
            Element = new Syntax_Null();
        }
        else if (' number '.includes(Verb))
        {
            Element = new Syntax_Number();
        }
        else if (' optional '.includes(Verb))
        {
            Element = new Syntax_Optional();
        }
        else if (' optional.repeating optrep '.includes(Verb))
        {
            Element = new Syntax_Optrep();
        }
        else if (' repeating '.includes(Verb))
        {
            Element = new Syntax_Repeating();
        }
        else if (' string '.includes(Verb))
        {
            Element = new Syntax_String();
        }
        else if (' tab '.includes(Verb))
        {
            Element = new Syntax_Tab();
        }
        else if (' true '.includes(Verb))
        {
            Element = new Syntax_True();
        }
        else if (' variant '.includes(Verb))
        {
            Element = new Syntax_Variant();
        }
        else if (' red '.includes(Verb))
        {
            Element = new Syntax_Red();
        }
        else
        {
            throw "Unknown Syntax '" + Next.Input + "'";
        }
        Element.Elements.push(Input_Token);
        Element.Start_Position = Input_Token.Start_Position;
        Element.End_Position = Input_Token.End_Position;
        Element.Document = Document;
        Element.Parent = Parent_Element;
        Factory.Add_Index(Element);
        return Element;
    }
    static Create_Keyvalue(Input_Token, Next, Document, Parent_Element)
    {
        console.log('Creating Keyvalue from input token: ', Input_Token.To_String());
        var Element = new Keyvalue();
        Element.Elements.push(Input_Token);
        Element.Start_Position = Input_Token.Start_Position;
        Element.End_Position = Input_Token.End_Position;
        Element.Document = Document;
        Element.Parent = Parent_Element;
        return Element;
    }
    static Create_Element(Input_Token, Next, Document, Parent_Element, Comma_Mode)
    {
        var Element;
        if (Input_Token instanceof Token_Operation_Start || Input_Token instanceof Token_Comma && Comma_Mode == 'operation')
        {
            Element = Factory.Create_Operation(Input_Token, Next, Document, Parent_Element);
        }
        else if (Input_Token instanceof Token_Syntax_Start || Input_Token instanceof Token_Comma && Comma_Mode == 'syntax')
        {
            Element = Factory.Create_Syntax(Input_Token, Next, Document, Parent_Element);
        }
        else if (Input_Token instanceof Token_Keyvalue_Start || Input_Token instanceof Token_Comma && Comma_Mode == 'keyvalue')
        {
            Element = Factory.Create_Keyvalue(Input_Token, Next, Document, Parent_Element);
        }
        else
        {
            Element = Factory.Create_Statement(Input_Token, Next, Document, Parent_Element);
        }
        /* comment 'string Elem_String (. Element To_String)'; */
        /* comment 'string Parent_String (. Parent_Element To_String)'; */
        /* comment 'writelinecreated  Elem_String with parent  Parent_String'; */
        return Element;
    }
}

/* comment 'Compiler.gal'; */
class Compiler extends gal {
    static Instance = undefined;
    constructor()
    {
        super();
        this.Token_Dialect = false;
        this.Element_Dialect = false;
        this.Token_List = false;
        this.Element_List = false;
        this.Show_Output = false;
        this.Verbose = false;
        this.Test_Errors = [];
        this.Generate_Gal = false;
        this.Generate_Fallback = false;
        this.Sideways = false;
        this.Class_Export = false;
        this.Verb_Export = false;
        this.Class_Keep_Verbs = true;
        this.Verb_Keep_Handlers = true;
        this.Language = undefined;
        this.Verb_Index = {};
        this.Class_Index = {};
        this.Statements = [];
        this.Operations = [];
        this.Syntaxes = [];
        this.Statement_Index = [];
        this.Operation_Index = [];
        this.Syntax_Index = [];
    }
    Test()
    {
        var Element;
        var Test_Count = 0;
        var Errors = [];
        /* comment "TODO:" 'my.verbose statement'; */
        if (this.Verbose)
        {
            console.log('Testing Operations');
        }
        for (Element of this.Operations)
        {
            Element.Test(Errors, this.Verbose);
            Test_Count++;
        }
        if (this.Verbose)
        {
            console.log('Testing Statements');
        }
        for (Element of this.Statements)
        {
            Element.Test(Errors, this.Verbose);
            Test_Count++;
        }
        if (this.Verbose)
        {
            console.log('Testing Syntaxes');
        }
        for (Element of this.Syntaxes)
        {
            Element.Test(Errors, this.Verbose);
            Test_Count++;
        }
        if (this.Verbose)
        {
            console.log('Tests: ', Test_Count);
            console.log('Errors: ', Errors.length);
        }
        /* comment "TODO:" 'our= Test_Errors Errors'; */
    }
    Add_Verb(Statement)
    {
        var Signature = Statement.Method_Signature;
        this.Verb_Index[Signature] = Statement;
        /* comment "writeline 'Successfully added ' Signature ' to verb index.';"; */
    }
    Get_Verb(Name)
    {
        try
        {
            return this.Verb_Index[Name];
        }
        catch
        {
            return undefined;
        }
    }
    Add_Class(Statement)
    {
        var Name = Statement.Name_Prefix + Statement.Class_Name.Input;
        if (Name in this.Class_Index)
        {
            var Existing = this.Class_Index[Name];
            if (Existing.Am_Earlier(this))
            {
                return;
            }
        }
        this.Class_Index[Name] = Statement;
        /* comment 'writelineSuccessfully added  Name to class index.'; */
    }
    Get_Class(Name)
    {
        try
        {
            return this.Class_Index[Name];
        }
        catch
        {
            return undefined;
        }
    }
    Add_Definition(Element)
    {
        if (Element instanceof Statement_Statement)
        {
            this.Statements.push(Element);
        }
        else if (Element instanceof Statement_Operation)
        {
            this.Operations.push(Element);
        }
        else if (Element instanceof Statement_Syntax)
        {
            this.Syntaxes.push(Element);
        }
    }
    Generate_Factory()
    {
        var Definition_Methods = 'todo "Tokens";' + "\n";
        Definition_Methods += this.constructor.Generate_Factory_Method('Statement', this.Statements);
        Definition_Methods += this.constructor.Generate_Factory_Method('Operation', this.Operations);
        Definition_Methods += this.constructor.Generate_Factory_Method('Syntax', this.Syntaxes);
        /* comment "TODO:" 'Indent Definition Methods'; */
        var Factory_Code = 'class Factory' + "\n" + '{' + "\n" + Definition_Methods + '}' + "\n";
        return Factory_Code;
    }
    Generate_Factory_Method(Type, Definition_List)
    {
        var Header = 'method entity Create_' + Type + ` [entity Input_Token, entity Next, entity Document, entity Parent_Element]`  +  "\n"  +  `{`  +  "\n"  +  `    string Verb ' ' (lowercase [. Input_Token Input]) ' ';`  +  "\n"  +  `    entity Element;`  +  "\n"  +  ``;
        var Tail = `    else`  +  "\n"  +  `    {`  +  "\n"  +  `        error "Unknown ` + Type + ` '" [. Input_Token Input] "'";`  +  "\n"  +  `    }`  +  "\n"  +  `    list.append [. Element Elements] Input_Token;`  +  "\n"  +  `    .= Element Verb [. Next Input];`  +  "\n"  +  `    .= Element Start_Position [. Input_Token Start_Position];`  +  "\n"  +  `    .= Element End_Position [. Input_Token End_Position];`  +  "\n"  +  `    .= Element Document Document;`  +  "\n"  +  `    .= Element Parent Parent_Element;`  +  "\n"  +  `    : Factory Add_Index Element;`  +  "\n"  +  `    return Element;`  +  "\n"  +  `}`;
        var Else = '';
        var Definition;
        var Class_Name;
        var Declaration = '';
        for (Definition of Definition_List)
        {
            Class_Name = Definition.Class_Name.Input;
            var Aliases = Definition.Aliases;
            var Options = ' ' + Class_Name + ' ' + Aliases + ' ';
            Declaration += '    ' + Else;
            Declaration += 'if (contains "' + Options + '" Verb) { new Element ' + Class_Name + '; }' + "\n";
            Else = 'else.';
        }
        var Code = Header + Declaration + Tail;
        return Code;
    }
    Error_Check(This_Document, Context)
    {
        var Error_Report = '';
        var Element_Number = 0;
        var This_Element;
        for (This_Element of This_Document.Document_Body)
        {
            Element_Number++;
            if (This_Element.Error !== undefined)
            {
                if (This_Element.Error > '')
                {
                    Error_Report += Element_Number + ' ' + This_Element.To_String() + "\n";
                }
            }
        }
        if (Error_Report > '')
        {
            console.log("ERROR REPORT in ", Context);
            console.log(Error_Report);
            throw "EXITING due to error in " + Context;
        }
    }
    Show_Tokens(Parser)
    {
        console.log('Tokens:');
        var Item;
        var Item_Number = 0;
        for (Item of Parser.Tokens)
        {
            Item_Number++;
            if (Item instanceof Token)
            {
                console.log(Item_Number, ' ', Item.To_String());
            }
            else
            {
                console.log(Item_Number, ': "', Item, '"');
            }
        }
    }
    Show_Elements(Parser)
    {
        var This_Element;
        var Element_Number = 0;
        console.log('Elements:');
        for (This_Element of Parser.Document_Body)
        {
            Element_Number++;
            if (This_Element instanceof Token || This_Element instanceof Element)
            {
                console.log(Element_Number, ' ', This_Element.To_String());
            }
            else
            {
                console.log(Element_Number, ': "', This_Element, '"');
            }
        }
        console.log('');
    }
    Export_Tokens(Parser)
    {
        var Item;
        for (Item of Parser.Tokens)
        {
            console.log('element ', Item.constructor.name, ';');
        }
    }
    Export_Elements(Parser)
    {
        var This_Element;
        for (This_Element of Parser.Document_Body)
        {
            if (This_Element instanceof Named_Element)
            {
                console.log(This_Element.constructor.name, " '", This_Element.Gs_Keyword, "',");
            }
            else
            {
                console.log('element ', This_Element.constructor.name, ';');
            }
        }
        console.log('');
    }
    Translate(Translation, Source, Target)
    {
        if (this.Verbose)
        {
            console.log('translating ', Translation, ' file ', Source, ' to ', Target);
        }
        var Parser;
        var Generator;
        if (Translation == 'gal')
        {
            Parser = new Gal_Input();
            Generator = new Gal_Output();
            this.Class_Export = true;
        }
        else if (Translation == 'fallback')
        {
            Parser = new Gal_Input();
            Generator = new Fallback_Output();
        }
        else if (Translation == 'python')
        {
            Parser = new Gal_Input();
            Generator = new Python_Output();
        }
        else if (Translation == 'javascript')
        {
            Parser = new Gal_Input();
            Generator = new Javascript_Output();
        }
        else
        {
            throw "Unsupported translation '" + Translation + "'.";
        }
        Parser.File_Name = Source;
        Generator.File_Name = Target;
        /* comment ". [class] Oho;"; */
        if (this.Verbose)
        {
            console.log('    reading ', Source);
        }
        Parser.Read();
        if (this.Verbose)
        {
            console.log('    read complete');
        }
        this.Error_Check(Parser, 'reading');
        if (this.Verbose)
        {
            console.log('    tokenizing ', Source);
        }
        Parser.Tokenize();
        if (this.Token_List)
        {
            this.Show_Tokens(Parser);
        }
        if (this.Token_Dialect)
        {
            this.Export_Tokens(Parser);
        }
        this.Error_Check(Parser, 'tokenizing');
        if (this.Verbose)
        {
            console.log('    parsing ', Source);
        }
        Parser.Parse();
        this.Error_Check(Parser, 'parsing');
        if (this.Verbose)
        {
            console.log('    attributes ', Source);
        }
        Parser.Child_Attributes();
        this.Error_Check(Parser, 'attributes');
        if (this.Verbose)
        {
            console.log('    structure ', Source);
        }
        Parser.Structure();
        this.Error_Check(Parser, 'structure');
        if (this.Verbose)
        {
            console.log('    model ', Source);
        }
        Parser.Base_Model();
        this.Error_Check(Parser, 'model');
        if (this.Verbose)
        {
            console.log('    generating ', Target);
        }
        Generator.Generate(Parser);
        this.Error_Check(Parser, 'generate');
        if (this.Element_List)
        {
            this.Show_Elements(Parser);
        }
        if (this.Element_Dialect)
        {
            this.Export_Elements(Parser);
        }
        var Output_Code = Generator.Get(Parser);
        if (this.Show_Output)
        {
            console.log(Output_Code);
        }
        Generator.Input = Output_Code;
        Generator.File_Name = Target;
        if (this.Verbose)
        {
            console.log('    write ', Target);
        }
        Generator.Write();
        var Test_Target = Target + '.gs';
        var Test_Gen;
        Test_Gen = new Test_Output();
        Test_Gen.Generate(Parser);
        var Test_Code = Test_Gen.Get(Parser);
        Test_Gen.Input = Test_Code;
        Test_Gen.File_Name = Test_Target;
        Test_Gen.Write();
    }
}
class Dialect extends gal {
    constructor()
    {
        super();
        this.Name_Prefix = undefined;
        this.Statements = [];
        this.Operations = [];
        this.Syntaxes = [];
    }
    /* comment "TODO:" 'Operations, Syntaxes and Elements are lists, not dictionaries.'; */
    Import()
    {
        var Element;
        var Name;
        for (Element of this.Statements)
        {
            for (Name of Element.Names)
            {
                this.Statements[Name] = Element;
            }
        }
        for (Element of this.Operations)
        {
            for (Name of Element.Names)
            {
                this.Operations[Name] = Element;
            }
        }
        for (Element of this.Operations)
        {
            for (Name of Element.Names)
            {
                this.Operations[Name] = Element;
            }
        }
    }
    Know()
    {
        var Element;
        var Prefix = this.Name_Prefix + '.';
        var Name;
        var Full_Name;
        for (Element of this.Statements)
        {
            for (Name of Element.Names)
            {
                Full_Name = Prefix  +  Name;
                this.Statement_Index[Full_Name] = Element;
            }
        }
        for (Element of this.Operations)
        {
            for (Name of Element.Names)
            {
                Full_Name = Prefix  +  Name;
                this.Operation_Index[Full_Name] = Element;
            }
        }
        for (Element of this.Syntaxes)
        {
            for (Name of Element.Names)
            {
                Full_Name = Prefix  +  Name;
                this.Syntax_Index[Full_Name] = Element;
            }
        }
    }
}
/* Main Program Body */
let [_node, _code, Translation, Source, Target] = process.argv;
var Comp_Instance;
Comp_Instance = new Compiler();
Compiler.Instance = Comp_Instance;
Comp_Instance.Translate(Translation, Source, Target);

