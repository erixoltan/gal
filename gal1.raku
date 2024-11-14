use fatal;

class Gal_Class
{
} 
class Symbol is Gal_Class
{
    has $.Symbol_Owner is rw;
    has $.Symbol_Value is rw;
} 
class Number_Symbol is Symbol
{
    has Real $.Symbol_Value is rw;
} 
class String_Symbol is Symbol
{
    has Str $.Symbol_Value is rw;
} 
class Entity_Symbol is Symbol
{
    has $.Symbol_Value is rw;
} 
class Flag_Symbol is Symbol
{
    has Bool $.Symbol_Value is rw;
} 
class Attribute is Symbol
{
    has Real $.Attribute_Certainty is rw = 0;
    has $.Attribute_Entity is rw;
    has $.Attribute_Value is rw;
    method Assign($Value, Real $Certainty = 0)
    {
        $.Attribute_Value = $Value;
        $.Attribute_Certainty = $Certainty;
    }
    method Get_Certainty()
    {
        return $.Attribute_Certainty;
    }
    method Get_Value()
    {
        return $.Attribute_Value;
    }
} 
# "Token\.gal"
class Factory {...}
class Block {...}
class Statement {...}
class Operation {...}
class Syntax {...}
class Keyvalue {...}
class Compiler {...}
class Token
{
    has $.Class_Owner is rw;
    has Str $.Debug is rw;
    has $.Document is rw;
    has Int $.End_Position is rw;
    has Str $.Error is rw;
    has Str $.Fallback is rw;
    has Str $.Gal is rw;
    has Str $.Input is rw;
    has Bool $.Is_Verb is rw = False;
    has Str $.Javascript is rw;
    has $.Method_Context is rw;
    has $.Method_Name is rw;
    has Str $.Mumps is rw;
    has $.Parent is rw;
    has Str $.Python is rw;
    has Int $.Start_Position is rw;
    has Str $.Test_Case is rw;
    has Str $.Usage is rw;
    has $.Variable_Context is rw;
    method Append(Str $Character, Str $Next)
    {
        return False if !self.Predict($Character, $Next);
        $.Input ~= $Character;
        $.End_Position++;
        return True;
    }
    method Attributes() { } 
    method Class_Export() { } 
    method Compare($Element)
    {
        my Int $My_End = $.End_Position;
        my Int $Elem_End = $Element.End_Position;
        return 1 if $My_End > $Elem_End;
        return -1 if $My_End < $Elem_End;
        my Int $My_Start = $.Start_Position;
        my Int $Elem_Start = $Element.Start_Position;
        return -1 if $My_Start > $Elem_Start;
        return 1 if $My_Start < $Elem_Start;
        return 0;
    }
    method Debug_Generate()
    {
        $.Debug = $.Input;
    }
    method Enquote(Str $Text)
    {
        return "'$Text'" if !($Text.contains("'"));
        return "\"$Text\"" if !($Text.contains("\""));
        return "`$Text`" if !($Text.contains("`"));
        return "“$Text”" if (!($Text.contains("“"))) && (!($Text.contains("”")));
        return "‘$Text’" if (!($Text.contains("‘"))) && (!($Text.contains("’")));
        return "«$Text»" if (!($Text.contains("«"))) && (!($Text.contains("»")));
        return "‹$Text›" if (!($Text.contains("‹"))) && (!($Text.contains("›")));
        return "'ERROR gal token DEEPLY ENQUOTED STRING FAILED HERE'";
    }
    method Fallback_Generate()
    {
        $.Fallback = $.Input;
    }
    method Gal_Code()
    {
        return $.Input;
    }
    method Gal_Generate()
    {
        $.Gal = $.Input;
    }
    method Get_Input()
    {
        return $.Input;
    }
    method Javascript_Atom(Int $Precedence)
    {
        my Str $Code = $.Javascript;
        return $Code;
    }
    method Javascript_Generate()
    {
        $.Javascript = $.Input;
    }
    method Model() { } 
    method Mumps_Generate()
    {
        $.Mumps = $.Input;
    }
    method Predict(Str $Character, Str $Next)
    {
        return False;
    }
    method Process_Arguments() { } 
    method Python_Atom(Int $Precedence)
    {
        return $.Python;
    }
    method Python_Generate()
    {
        $.Python = $.Input;
    }
    method Structure() { } 
    method Test_Generate()
    {
        my Str $Code = "";
        if defined($.Gal)
        {
            $Code ~= "    gal = " ~ self.Enquote($.Gal) ~ ";\n";
        }
        if defined($.Fallback)
        {
            $Code ~= "    fallback = " ~ self.Enquote($.Fallback) ~ ";\n";
        }
        if defined($.Python)
        {
            $Code ~= "    python = " ~ self.Enquote($.Python) ~ ";\n";
        }
        if defined($.Javascript)
        {
            $Code ~= "    javascript = " ~ self.Enquote($.Javascript) ~ ";\n";
        }
        if $Code gt ""
        {
            my Str $Full_Code = "test case " ~ self.^name ~ " \{\n$Code\}\n";
            $.Test_Case = $Full_Code;
        }
    }
    method To_String()
    {
        my Str $String = $.^name ~ " " ~ $.Input ~ " " ~ $.Start_Position ~ "-" ~ $.End_Position;
        if defined($.Error)
        {
            $String ~= " ERROR<" ~ $.Error ~ ">";
        }
        return $String;
    }
    method Verb_Export() { } 
} 
class Token_Space is Token
{
    method Predict(Str $Character, Str $Next)
    {
        return ($Character ~~ m/\s/);
    }
} 
class Value_Token is Token { } 
class Token_Name is Value_Token
{
    method Append(Str $Character, Str $Next)
    {
        return False if ($Character ~~ m/\s/);
        return False if "\[\]\{\}<>\(\);,\"`".contains($Character);
        return False if $Character eq "'";
        $.Input ~= $Character;
        $.End_Position++;
        return True;
    }
    method Javascript_Generate()
    {
        my Str $Code = $.Input;
        if $Code.contains(":")
        {
            if ($Code.substr(0, 1)) eq ":"
            {
                $Code = $Code.substr(1);
            }
            $Code = $Code.subst(":", "_", :g);
        }
        $.Javascript = $Code;
    }
    method Predict(Str $Character, Str $Next)
    {
        return False if ($Character ~~ m/\s/);
        return False if "\[\]\{\}<>\(\);,\"`".contains($Character);
        return False if $Character eq "'";
        return True;
    }
    method Python_Generate()
    {
        my Str $Code = $.Input;
        if $Code.contains(":")
        {
            if ($Code.substr(0, 1)) eq ":"
            {
                $Code = $Code.substr(1);
            }
            $Code = $Code.subst(":", "_", :g);
            # $writeline "Token\.Name " $.Input "-->" $Code
        }
        $.Python = $Code;
    }
    method Unquoted()
    {
        my Str $Text = $.Input;
        return $Text;
    }
} 
class Token_Class_Name is Token_Name
{
    method Predict(Str $Character, Str $Next)
    {
        return False if ($Character ~~ m/\s/);
        return False if $Character ne ":";
        return False if ($Next ~~ m/\s/);
        return True;
    }
} 
class Number is Value_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return "0123456789\.-".contains($Character);
    }
} 
class Quote is Value_Token
{
    method Append(Str $Character, Str $Next)
    {
        my Str $Text = $.Input;
        my Str $First = $Text.substr(0, 1);
        my Str $Last = $Text.substr(*-1);
        return False if ($First eq $Last) && (($Text.chars()) > 1);
        $.Input ~= $Character;
        $.End_Position++;
        return True;
    }
    method Fallback_Generate()
    {
        my Str $Code = $.Input;
        if $.Input.contains("\n")
        {
            my Str $Line;
            my Str $Expressions = "";
            my Str $Q = $Code.substr(0, 1);
            $Code = $Code.substr(1, ($Code.chars()) - 2);
            for split("\n", $Code) -> $Line
            {
                if $Expressions ne ""
                {
                    $Expressions ~= " \[line\] ";
                }
                $Expressions ~= $Q ~ $Line ~ $Q;
            }
            $Code = "\(append $Expressions\)";
        }
        $.Fallback = $Code;
    }
    method Gal_Generate()
    {
        my Str $Code = $.Input;
        if $.Input.contains("\n")
        {
            my Str $Line;
            my Str $Expressions = "";
            my Str $Q = $Code.substr(0, 1);
            $Code = $Code.substr(1, ($Code.chars()) - 2);
            for split("\n", $Code) -> $Line
            {
                if $Expressions ne ""
                {
                    $Expressions ~= " \[line\] ";
                }
                $Expressions ~= $Q ~ $Line ~ $Q;
            }
            $Code = "\(append $Expressions\)";
        }
        $.Gal = $Code;
    }
    method Javascript_Generate()
    {
        my Str $Input = $.Input;
        if $Input.contains("\\")
        {
            $Input = $Input.subst("\\", "\\\\", :g);
        }
        $.Javascript = $Input;
    }
    method Predict(Str $Character, Str $Next)
    {
        return (($Character eq "\"") || ($Character eq "'")) || ($Character eq "`");
    }
    method Python_Generate()
    {
        my Str $Input = $.Input;
        if $Input.contains("\\")
        {
            $Input = $Input.subst("\\", "\\\\", :g);
        }
        my Str $Q = $Input.substr(0, 1);
        my Str $Middle = $Input.substr(1, ($Input.chars()) - 2);
        if ($Middle.contains("\n")) || ($Q eq "`")
        {
            $Q = "'''";
        }
        my Str $Code = $Q ~ $Middle ~ $Q;
        $.Python = $Code;
    }
    method Unquoted()
    {
        my Str $Text = $.Input;
        my Int $Length = $Text.chars();
        my Str $Middle = $Text.substr(1, $Length - 2);
        return $Middle;
    }
} 
class Boundary_Token is Token
{
    method Append(Str $Character, Str $Next)
    {
        return False;
    }
} 
class Start_Token is Boundary_Token { } 
class End_Token is Boundary_Token { } 
class Token_Semi is End_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq ";";
    }
} 
class Token_Block_Start is Start_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq "\{";
    }
} 
class Token_Block_End is End_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq "\}";
    }
} 
class Token_Operation_Start is Start_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq "\(";
    }
} 
class Token_Operation_End is End_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq "\)";
    }
} 
class Token_Syntax_Start is Start_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq "\[";
    }
} 
class Token_Syntax_End is End_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq "\]";
    }
} 
class Token_Keyvalue_Start is Start_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq "<";
    }
} 
class Token_Keyvalue_End is End_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq ">";
    }
} 
class Token_Comma is Boundary_Token
{
    method Predict(Str $Character, Str $Next)
    {
        return $Character eq ",";
    }
} 
# "Element\.gal"
class Gal {...}
class Python {...}
class Javascript {...}
class Sql {...}
class Element
{
    our $.Js_Precedence = 99;
    our $.Verbose = False;
    has $.Block is rw;
    has $.Class_Context is rw;
    has $.Class_Owner is rw;
    has Str $.Data_Type is rw;
    has Str $.Debug is rw;
    has Str $.Dialect is rw = "";
    has $.Document is rw;
    has @.Document_Body is rw;
    has @.Elements is rw;
    has Int $.End_Position is rw = -1;
    has Str $.Error is rw;
    has Str $.Fallback is rw;
    has Str $.Fallback_Declaration is rw;
    has Str $.Gal is rw;
    has Str $.Gal_Declaration is rw;
    has Str $.Input is rw = "";
    has Bool $.Is_Verb is rw = False;
    has Str $.Java is rw;
    has Str $.Javascript is rw;
    has $.Method_Context is rw;
    has $.Method_Name is rw;
    has Str $.Method_Signature is rw = "";
    has Str $.Mumps is rw;
    has $.Parent is rw;
    has Str $.Php is rw;
    has Str $.Python is rw;
    has Bool $.Re_Structure is rw = True;
    has Str $.Sql is rw;
    has Int $.Start_Position is rw = -1;
    has Str $.Test_Case is rw;
    has @.Tokens is rw;
    has Str $.Usage is rw = "";
    has $.Variable_Context is rw;
    method Am($Other)
    {
        my Str $My_Text = self.To_String();
        my Str $Other_Text = $Other.To_String();
        return $My_Text eq $Other_Text;
    }
    method Am_Earlier($Other)
    {
        return True if !(($Other ~~ Element));
        return True if $Other.Start_Position < 0;
        return False if $.Start_Position < 0;
        return $.Start_Position < $Other.Start_Position;
    }
    method Argument_String()
    {
        my $Argument;
        my Str $Args_Code = "";
        my Str $Between = "";
        for @.Arguments -> $Argument
        {
            if ($Argument ~~ Quote)
            {
                $Args_Code ~= $Argument.Unquoted();
            }
            else 
            {
                $Args_Code ~= $Between ~ $Argument.Gal_Code();
                $Between = " ";
            }
        }
        return $Args_Code;
    }
    method Attributes() { } 
    method Base_Model()
    {
        # $writeline "     Element Model " $.^name
        my $This_Element;
        for @.Document_Body -> $This_Element
        {
            # "writeline ' - model ' \(\. This_Element To_String\);"
            try {
                $This_Element.Model();
            
            CATCH { default {
                my $Error = .Str;
                 ;
                say "ERROR modeling " ~ $This_Element.To_String() ~ ": $Error";
                $This_Element.Error = $Error;
            } } }
        }
    }
    method Base_Structure() { } 
    method Child_Attributes()
    {
        my $Element;
        for @.Document_Body -> $Element
        {
            my Str $Error;
            try {
                $Element.Attributes();
                $Element.Process_Arguments();
            
            CATCH { default {
                my $Error = .Str;
                # $debug
                say "Child_Attributes error <$Error> on Element " ~ $Element.To_String();
                $Element.Error = $Error;
            } } }
        }
    }
    method Class_Export() { } 
    method Code_Context()
    {
        my Int $Start = $.Start_Position;
        my Int $End = $.End_Position;
        my Int $Length = ($End - $Start) + 1;
        my Int $Window = 50;
        my Int $Before = $Start - $Window;
        my Int $BL = $Window;
        if $Before < 0
        {
            $BL = $Window + $Before;
            $Before = 0;
        }
        my Str $Prefix = $.Document.Input.substr($Before, $BL);
        my Str $Middle = $.Document.Input.substr($Start, $Length);
        my Str $Suffix = $.Document.Input.substr($End + 1, $Window);
        my Str $Context = $Prefix ~ "<*$Middle*>$Suffix";
        return $Context;
    }
    method Compare($Element)
    {
        my Int $My_End = $.End_Position;
        my Int $Elem_End = $Element.End_Position;
        return 1 if $My_End > $Elem_End;
        return -1 if $My_End < $Elem_End;
        my Int $My_Start = $.Start_Position;
        my Int $Elem_Start = $Element.Start_Position;
        return -1 if $My_Start > $Elem_Start;
        return 1 if $My_Start < $Elem_Start;
        return 0;
    }
    method Debug_Generate()
    {
        die "Must Override Debug_Generate";
    }
    method Enquote(Str $Text)
    {
        return "'$Text'" if !($Text.contains("'"));
        return "\"$Text\"" if !($Text.contains("\""));
        return "`$Text`" if !($Text.contains("`"));
        return "“$Text”" if (!($Text.contains("“"))) && (!($Text.contains("”")));
        return "‘$Text’" if (!($Text.contains("‘"))) && (!($Text.contains("’")));
        return "«$Text»" if (!($Text.contains("«"))) && (!($Text.contains("»")));
        return "‹$Text›" if (!($Text.contains("‹"))) && (!($Text.contains("›")));
        return "'ERROR gal element DEEPLY ENQUOTED STRING FAILED HERE'";
    }
    method Failure_Message(Str $Problem_Desc)
    {
        my Str $Message = $Problem_Desc ~ "\. ";
        $Message ~= self.Gal_Code() ~ " ";
        $Message ~= self.Code_Context();
        return $Message;
    }
    method Fallback_Args()
    {
        my $Argument;
        my Str $Args_Gal = "";
        for @.Listargs -> $Argument
        {
            my Str $Arg_Gal = $Argument.Fallback;
            $Args_Gal ~= " $Arg_Gal";
        }
        return $Args_Gal;
    }
    method Fallback_Arguments()
    {
        my $Argument;
        my Str $Args_Code = "";
        for @.Arguments -> $Argument
        {
            $Args_Code ~= " " ~ $Argument.Fallback;
        }
        return $Args_Code;
    }
    method Fallback_Block()
    {
        return $.Block.Fallback if defined($.Block);
        return ";";
    }
    method Fallback_Generate()
    {
        $.Fallback = $.Gal;
    }
    method Gal_Add_Element($Child_Element)
    {
        # $writeline "append element " $.^name
        if $Child_Element.End_Position > $.End_Position
        {
            $.End_Position = $Child_Element.End_Position;
        }
        @.Elements.push($Child_Element);
    }
    method Gal_Add_Token($Token)
    {
        return -1;
    }
    method Gal_Block()
    {
        my Str $Gal_Code = ";";
        if (defined($.Block)) && (defined($.Block.Gal))
        {
            $Gal_Code = $.Block.Gal;
        }
        return $Gal_Code;
    }
    method Gal_Code()
    {
        my Int $Start = $.Start_Position;
        my Int $End = $.End_Position;
        my Int $Length = ($End - $Start) + 1;
        my Str $Code = $.Document.Input.substr($Start, $Length);
        return $Code;
    }
    method Gal_Generate()
    {
        die "Must Override Gal_Generate";
    }
    method Gal_Parse()
    {
        Gal.Parse_Element(self);
    }
    method Gal_Tokenize()
    {
        my Str $Text = $.Input;
        my Str $Char = $Text.substr(0, 1);
        my Str $Next = $Text.substr(1, 1);
        my Int $End = ($Text.chars()) - 1;
        my Int $Position = 0;
        my $Token = Factory.Create_Token($Char, $Next, $Position);
        if !(($Token ~~ Token_Space))
        {
            @.Tokens.push($Token);
        }
        for 1..$End -> $Position
        {
            $Char = $Text.substr($Position, 1);
            if $Position < $End
            {
                $Next = $Text.substr($Position + 1, 1);
            }
            else 
            {
                $Next = "";
            }
            next if $Token.Append($Char, $Next);
            $Token = Factory.Create_Token($Char, $Next, $Position);
            return False if !$Token;
            next if ($Token ~~ Token_Space);
            @.Tokens.push($Token);
        }
        return True;
    }
    method Get_Input()
    {
        return "<no document>" if !(defined($.Document));
        return "<negative start>" if $.Start_Position < 0;
        my Int $String_Length = ($.End_Position - $.Start_Position) + 1;
        my Str $Input = $.Document.Input;
        my Int $Start = $.Start_Position;
        my Str $Text = $Input.substr($Start, $String_Length);
        return $Text;
    }
    method Indent(Str $Input)
    {
        my @Lines = split("\n", $Input);
        my Str $Line;
        my Str $Indented = "";
        for @Lines -> $Line
        {
            if $Line gt ""
            {
                $Indented ~= "    $Line\n";
            }
        }
        return $Indented;
    }
    method Inference_Context()
    {
        return "" if !(defined($.Parent));
        return $.Parent.Inference_Context();
    }
    method Java_Generate()
    {
        die "Must Override Java_Generate";
    }
    method Javascript_Args(Str $Separator)
    {
        my $Argument;
        my Str $Args_Js = "";
        my Str $Between = "";
        for @.Listargs -> $Argument
        {
            if !(defined($Argument.Javascript))
            {
                die "Argument Javascript not defined: " ~ $Argument.Gal;
            }
            my Str $Arg_Js = $Argument.Javascript;
            $Args_Js ~= $Between ~ $Arg_Js;
            $Between = $Separator;
        }
        return $Args_Js;
    }
    method Javascript_Arguments(Str $Separator)
    {
        my $Argument;
        my Str $Args_Js = "";
        my Str $Between = "";
        for @.Arguments -> $Argument
        {
            my Str $Arg_Js = $Argument.Javascript;
            $Args_Js ~= $Between ~ $Arg_Js;
            $Between = $Separator;
        }
        return $Args_Js;
    }
    method Javascript_Atom(Int $Precedence)
    {
        my Str $Code = $.Javascript;
        try
        {
            if $Precedence > $.Js_Precedence
            {
                $Code = "\($Code\)";
            }
        }
        return $Code;
    }
    method Javascript_Block()
    {
        try
        {
            if (defined($.Block)) && (defined($.Block.Javascript))
            {
                return $.Block.Javascript if $.Block.Javascript gt "";
            }
        }
        return " \{ \} ";
    }
    method Javascript_Generate()
    {
        die $.^name ~ " must override Javascript_Generate";
    }
    method Javascript_Parse()
    {
        # TODO: Parse this element's tokens into Javascript language elements.
        Javascript.Parse_Element(self);
    }
    method Javascript_Statements()
    {
        try
        {
            if (defined($.Block)) && (defined($.Block.Javascript_Statements))
            {
                return $.Block.Javascript_Statements if $.Block.Javascript_Statements gt "";
            }
        }
        return "";
    }
    method Lookup(Str $Element_Name)
    {
        return $.Parent.Lookup($Element_Name) if $.Parent;
        return False;
    }
    method Model() { } 
    method Mumps_Args(Str $Separator)
    {
        my $Argument;
        my Str $Args_M = "";
        my Str $Between = "";
        for @.Listargs -> $Argument
        {
            my Str $Arg_M = $Argument.Mumps;
            $Args_M ~= $Between ~ $Arg_M;
            $Between = $Separator;
        }
        return $Args_M;
    }
    method Mumps_Arguments(Str $Separator)
    {
        my $Argument;
        my Str $Args_M = "";
        my Str $Between = "";
        for @.Arguments -> $Argument
        {
            my Str $Arg_M = $Argument.Mumps;
            $Args_M ~= $Between ~ $Arg_M;
            $Between = $Separator;
        }
        return $Args_M;
    }
    method Mumps_Generate()
    {
        die $.^name ~ " must override Mumps_Generate";
    }
    method Pascal_Case(Str $Input)
    {
        my Str $Name = $Input.lc();
        my @Words = split("_", $Name);
        my Str $Pascal = "";
        my Int $I;
        my Int $End = (@Words.elems) - 1;
        my Str $W;
        my Str $Between = "";
        my Str $One_Word;
        for 0..$End -> $I
        {
            $W = @Words[$I];
            $One_Word = "$W.substr(0, 1).uc()" ~ $W.substr(1);
            $Pascal ~= $Between ~ $One_Word;
            $Between = "_";
        }
        return $Pascal;
    }
    method Php_Generate()
    {
        die "Must Override Php_Generate";
    }
    method Pre_Fallback() { } 
    method Process_Arguments() { } 
    method Python_Args(Str $Separator)
    {
        my $Argument;
        my Str $Args_Py = "";
        my Str $Between = "";
        for @.Listargs -> $Argument
        {
            if !(defined($Argument.Python))
            {
                die "Argument Python not defined: " ~ $Argument.Gal;
            }
            my Str $Arg_Py = $Argument.Python;
            $Args_Py ~= $Between ~ $Arg_Py;
            $Between = $Separator;
        }
        return $Args_Py;
    }
    method Python_Arguments(Str $Separator)
    {
        my $Argument;
        my Str $Args_Py = "";
        my Str $Between = "";
        for @.Arguments -> $Argument
        {
            my Str $Arg_Py = $Argument.Python;
            $Args_Py ~= $Between ~ $Arg_Py;
            $Between = $Separator;
        }
        return $Args_Py;
    }
    method Python_Atom(Int $Precedence)
    {
        my Str $Code = $.Python;
        try
        {
            if $Precedence > $.Js_Precedence
            {
                $Code = "\($Code\)";
            }
        }
        return $Code;
    }
    method Python_Block()
    {
        try
        {
            if (defined($.Block)) && (defined($.Block.Python))
            {
                return $.Block.Python if $.Block.Python gt "";
            }
        }
        return ":\n    pass\n";
    }
    method Python_Generate()
    {
        die $.^name ~ " must override Python_Generate";
    }
    method Python_Parse()
    {
        # TODO: Parse this element's tokens into Python language elements.
        Python.Parse_Element(self);
    }
    method Python_Statements()
    {
        try
        {
            if (defined($.Block)) && (defined($.Block.Python_Statements))
            {
                return $.Block.Python_Statements if $.Block.Python_Statements gt "";
            }
        }
        return "";
    }
    method Python_String_Args(Str $Separator)
    {
        my $Argument;
        my Str $Args_Py = "";
        my Str $Between = "";
        for @.Listargs -> $Argument
        {
            if !(defined($Argument.Python))
            {
                die "Argument Python not defined: " ~ $Argument.Gal;
            }
            my Str $Arg_Py = $Argument.Python;
            if ($Argument ~~ Quote)
            {
                $Args_Py ~= $Between ~ $Arg_Py;
            }
            else 
            {
                $Args_Py ~= $Between ~ "str\($Arg_Py\)";
            }
            $Between = $Separator;
        }
        return $Args_Py;
    }
    method Sql_Generate()
    {
        die $.^name ~ " must override Sql_Generate";
    }
    method Sql_Parse()
    {
        # TODO: Parse this element's tokens into SQL language elements.
        Sql.Parse_Element(self);
    }
    method String_Info()
    {
        return "\.";
    }
    method Structure()
    {
        return if !$.Re_Structure;
        $.Re_Structure = False;
        # $writeline "     Element Structure " $.^name
        self.Base_Structure();
        my $Element;
        for @.Elements -> $Element
        {
            if (defined($.Method_Context)) && (!(defined($Element.Method_Context)))
            {
                $Element.Method_Context = $.Method_Context;
            }
            if (defined($.Variable_Context)) && (!(defined($Element.Variable_Context)))
            {
                $Element.Variable_Context = $.Variable_Context;
            }
            # $.= $Element $Parent self
            $Element.Structure();
        }
    }
    method Test(@Errors, Bool $Verbose)
    {
        my Str $Error_Message = $.^name ~ " does not override base Test method\.";
        @Errors.push($Error_Message);
        if $Verbose
        {
            say $Error_Message;
        }
    }
    method Test_Generate()
    {
        my Str $Child_Code = "";
        my $Element;
        for @.Elements -> $Element
        {
            next if !(defined($Element.Test_Case));
            $Child_Code ~= $Element.Test_Case ~ "\n";
        }
        my Str $Code = "";
        if defined($.Gal)
        {
            $Code ~= "gal = " ~ self.Enquote($.Gal) ~ ";\n";
        }
        if defined($.Fallback)
        {
            $Code ~= "fallback = " ~ self.Enquote($.Fallback) ~ ";\n";
        }
        if defined($.Python)
        {
            $Code ~= "python = " ~ self.Enquote($.Python) ~ ";\n";
        }
        if defined($.Javascript)
        {
            $Code ~= "javascript = " ~ self.Enquote($.Javascript) ~ ";\n";
        }
        if $Code gt ""
        {
            my Str $Full_Code = $Child_Code ~ "test case " ~ self.^name ~ "\n\{\n" ~ self.Indent($Code) ~ "\}\n";
            $.Test_Case = $Full_Code;
        }
    }
    method To_String()
    {
        my Str $String = $.^name ~ ": ";
        try {
            $String ~= $.Start_Position;
        
        CATCH { default {
            $String ~= "<Start?>";
        } } }
        try {
            $String ~= "-" ~ $.End_Position;
        
        CATCH { default {
            $String ~= "-<End?>";
        } } }
        try {
            if defined($.Error)
            {
                $String ~= " ERROR <" ~ $.Error ~ ">";
            }
        
        CATCH { default {
            $String ~= " ok";
        } } }
        $String ~= " <" ~ self.Get_Input() ~ "> ";
        return $String;
    }
    method Validate()
    {
        return True;
    }
    method Verb_Export() { } 
} 
class Named_Element is Element
{
    our $.Gal_Keyword;
    our $.Gs_Keyword;
    has @.Arguments is rw;
    has @.Listargs is rw;
    has Str $.Verb is rw;
    method Base_Structure()
    {
        my $Argument;
        my $Previous;
        for @.Arguments -> $Argument
        {
            if (($Argument ~~ Syntax)) && ((defined($Previous)) && (($Previous ~~ Syntax)))
            {
                $Previous.Chain_Forward = True;
                $Argument.Chain_Backward = True;
            }
            $Previous = $Argument;
        }
    }
    method Gal_Add_Element($Child_Element)
    {
        # $writeline "append element argument " $.^name
        if $Child_Element.End_Position > $.End_Position
        {
            $.End_Position = $Child_Element.End_Position;
        }
        @.Elements.push($Child_Element);
        @.Arguments.push($Child_Element);
        @.Listargs.push($Child_Element);
    }
    method String_Info()
    {
        my Str $String = "";
        try {
            my $Argument;
            for @.Arguments -> $Argument
            {
                my Str $Arg_Str = $Argument.^name;
                $String ~= " $Arg_Str";
            }
        
        CATCH { default {
            $String ~= "<invalid Arguments>";
        } } }
        $String ~= "\.";
        return $String;
    }
} 
# "Statement\.gal"
class Comment_Statement {...}
class Statement is Named_Element
{
    has $.Block is rw;
    has $.Class_Owner is rw;
    has Bool $.In_Block is rw = False;
    has Str $.Infer_Inits is rw = "";
    has $.Verb_Owner is rw;
    method Base_Structure()
    {
        my $Argument;
        my $Previous;
        for @.Arguments -> $Argument
        {
            if (($Argument ~~ Syntax)) && ((defined($Previous)) && (($Previous ~~ Syntax)))
            {
                $Previous.Chain_Forward = True;
                $Argument.Chain_Backward = True;
            }
            $Previous = $Argument;
        }
    }
    method Conditional_Debug()
    {
        my Str $Code = ": Debugger Conditional " ~ $.Start_Position ~ " " ~ $.End_Position ~ ";\n";
        return $Code;
    }
    method Debug_Generate()
    {
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        if defined($.Block)
        {
            $.Block.Debug_Generate();
            $Gal_Code ~= $.Block.Gal;
        }
        else 
        {
            $Gal_Code ~= ";";
        }
        $Gal_Code ~= self.Conditional_Debug();
        $.Debug = $Gal_Code;
    }
    method Ensure_Block()
    {
        return if defined($.Block);
        my $Block = Block.new();
        $Block.Document = $.Document;
        $Block.Start_Position = $.Start_Position;
        $Block.End_Position = $.End_Position;
        $.Block = $Block;
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Argument.Fallback_Generate();
            $Gal_Code ~= " " ~ $Argument.Fallback;
        }
        if defined($.Block)
        {
            $.Block.Fallback_Generate();
            $Gal_Code ~= self.Fallback_Block();
        }
        else 
        {
            $Gal_Code ~= ";";
        }
        $.Fallback = $Gal_Code;
    }
    method Gal_Add_Element($Child_Element)
    {
        # $writeline "Add element " $Child_Element.To_String() " to statement " self.To_String()
        if $Child_Element.End_Position > $.End_Position
        {
            $.End_Position = $Child_Element.End_Position;
        }
        if $.In_Block
        {
            $.Block.Gal_Add_Element($Child_Element);
        }
        else 
        {
            @.Elements.push($Child_Element);
            @.Arguments.push($Child_Element);
            @.Listargs.push($Child_Element);
        }
    }
    method Gal_Add_Token($Token)
    {
        # "Add token '" $Token.To_String() "' to statement '" self.To_String() "'"
        if (($Token ~~ Token_Semi)) || (($Token ~~ Token_Block_End))
        {
            # "Statement " self.To_String() " appends " $Token.To_String() " statement terminator"
            @.Elements.push($Token);
            $.End_Position = $Token.End_Position;
            if $.In_Block
            {
                $.Block.End_Position = $.End_Position;
            }
            return -1;
        }
        if ($Token ~~ Token_Block_Start)
        {
            # "Statement " self.To_String() " appends " $Token.To_String() " block start"
            @.Elements.push($Token);
            my Int $Here = $Token.End_Position;
            $.End_Position = $Here;
            $.Block = Block.new();
            $.Block.Document = $.Document;
            $.Block.Start_Position = $Here;
            $.Block.End_Position = $Here;
            $.In_Block = True;
            @.Elements.push($.Block);
            return 0;
        }
        return 1 if ($Token ~~ Start_Token);
        if ($Token ~~ End_Token)
        {
            # "Statement " self.To_String() " appends " $Token.To_String() " error end token"
            # TODO: log error here
            return -999;
        }
        @.Elements.push($Token);
        if $.In_Block
        {
            # "Statement " self.To_String() " appends " $Token.To_String() " in a block"
            return 1;
        }
        else 
        {
            # "Statement " self.To_String() " appends " $Token.To_String() " as argument"
            @.Arguments.push($Token);
            @.Listargs.push($Token);
        }
        $.End_Position = $Token.End_Position;
        return 0;
    }
    method Gal_Generate()
    {
        self.Ensure_Block();
        $.Block.Gal_Generate();
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            if ($Argument ~~ Token_Comma)
            {
                $Gal_Code ~= ",";
                next;
            }
            if !(defined($Argument.Gal))
            {
                $.Error = "Argument Error";
                $Gal_Code ~= "<Argument Error>";
                say $Argument.To_String() ~ ": Argument Error";
            }
            else 
            {
                $Gal_Code ~= " " ~ $Argument.Gal;
            }
        }
        $Gal_Code ~= $.Block.Gal;
        $.Gal = $Gal_Code;
    }
    method String_Info()
    {
        my Str $String = "";
        try {
            my $Argument;
            for @.Arguments -> $Argument
            {
                my Str $Arg_Str = $Argument.^name;
                $String ~= " $Arg_Str";
            }
        
        CATCH { default {
            $String ~= "<invalid Arguments>";
        } } }
        try {
            if defined($.Block)
            {
                $String ~= " " ~ $.Block.To_String();
            }
        
        CATCH { default {
            $String ~= "<invalid Block>";
        } } }
        $String ~= "\.";
        return $String;
    }
    method Structure()
    {
        return if !$.Re_Structure;
        $.Re_Structure = False;
        # $writeline "     Element Structure " $.^name
        self.Base_Structure();
        if defined($.Block)
        {
            if defined($.Class_Context)
            {
                $.Block.Class_Context = $.Class_Context;
            }
            if defined($.Method_Context)
            {
                $.Block.Method_Context = $.Method_Context;
            }
            if defined($.Variable_Context)
            {
                $.Block.Variable_Context = $.Variable_Context;
            }
            $.Block.Structure();
        }
        my $Element;
        for @.Elements -> $Element
        {
            # $.= $Element $Parent self
            if (defined($.Method_Context)) && 3
            {
                $Element.Method_Context = $.Method_Context;
            }
            $Element.Structure();
        }
    }
} 
class Block is Element
{
    has Str $.Fallback_Statements is rw;
    has Str $.Gal_Statements is rw;
    has Str $.Javascript_Statements is rw;
    has Str $.Python_Statements is rw;
    has @.Statements is rw;
    method Add_Statement($Statement)
    {
        @.Statements.push($Statement);
    }
    method Base_Structure()
    {
        if defined($.Method_Context)
        {
            # $writeline "Block Method Context"
        }
        else 
        {
            my Str $Message = "%% Block No Method Context in ";
            if defined($.Parent)
            {
                $Message ~= $.Parent.To_String();
            }
            $Message ~= " %%";
            # $writeline $Message
        }
        my $Statement;
        for @.Statements -> $Statement
        {
            if defined($.Class_Context)
            {
                # $writeline "    " $Statement.To_String()
                $Statement.Class_Context = $.Class_Context;
            }
            if defined($.Method_Context)
            {
                # $writeline "    " $Statement.To_String()
                $Statement.Method_Context = $.Method_Context;
            }
            if defined($.Variable_Context)
            {
                $Statement.Variable_Context = $.Variable_Context;
            }
            $Statement.Structure();
        }
    }
    method Debug_Generate()
    {
        my Str $Code = "\n\{\n";
        my Str $Block_Code = "";
        my $Statement;
        for @.Statements -> $Statement
        {
            $Block_Code ~= $Statement.Gal ~ "\n";
        }
        $Block_Code = self.Indent($Block_Code);
        $.Gal_Statements = $Block_Code;
        $Code ~= $Block_Code ~ "\}\n";
        $.Debug = $Code;
    }
    method Fallback_Generate()
    {
        my Str $Block_Code = "";
        my $Statement;
        for @.Statements -> $Statement
        {
            if !(defined($Statement.Fallback))
            {
                $Statement.Fallback_Generate();
            }
            $Block_Code ~= $Statement.Fallback ~ "\n";
        }
        my Str $Code = ";\n";
        if $Block_Code gt ""
        {
            $Block_Code = self.Indent($Block_Code);
            $Code = "\n\{\n$Block_Code\}\n";
        }
        $.Fallback_Statements = $Block_Code;
        $.Fallback = $Code;
    }
    method Gal_Add_Element($Child_Element)
    {
        # $writeline "block append element " $.^name
        if $Child_Element.End_Position > $.End_Position
        {
            $.End_Position = $Child_Element.End_Position;
        }
        @.Elements.push($Child_Element);
        @.Statements.push($Child_Element);
    }
    method Gal_Generate()
    {
        my Str $Block_Code = "";
        my $Statement;
        for @.Statements -> $Statement
        {
            if !(defined($Statement.Gal))
            {
                $Statement.Gal_Generate();
            }
            $Block_Code ~= $Statement.Gal ~ "\n";
        }
        my Str $Code = ";";
        if $Block_Code gt ""
        {
            $Block_Code = self.Indent($Block_Code);
            $Code = "\n\{\n$Block_Code\}\n";
        }
        $.Gal_Statements = $Block_Code;
        $.Gal = $Code;
    }
    method Javascript_Generate()
    {
        my Str $Block_Code = "";
        my $Statement;
        for @.Statements -> $Statement
        {
            my Str $Statement_JS = $Statement.Javascript;
            if defined($Statement_JS)
            {
                $Block_Code ~= $Statement_JS;
            }
            else 
            {
                $Block_Code ~= "// ERROR from " ~ $Statement.To_String() ~ "\n";
            }
        }
        # $writeline "block: " $Block_Code
        $Block_Code = self.Indent($Block_Code);
        # $writeline "indented block: " $Block_Code
        $.Javascript_Statements = $Block_Code;
        my Str $Code = "\n\{\n$Block_Code\}\n";
        # $writeline "code: " $Code
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Bool $Non_Comments = False;
        my Str $Stmt_Code = "";
        my $Statement;
        for @.Statements -> $Statement
        {
            my Str $Statement_Py = $Statement.Python;
            if defined($Statement_Py)
            {
                $Stmt_Code ~= $Statement_Py;
            }
            else 
            {
                $Stmt_Code ~= "# ERROR from " ~ $Statement.To_String();
            }
            if !(($Statement ~~ Comment_Statement))
            {
                $Non_Comments = True;
            }
        }
        if !$Non_Comments
        {
            $Stmt_Code ~= "pass\n";
        }
        $Stmt_Code = self.Indent($Stmt_Code);
        $.Python_Statements = $Stmt_Code;
        my Str $Code = ":\n$Stmt_Code";
        $.Python = $Code;
    }
    method String_Info()
    {
        my Str $String = $.^name ~ ": ";
        try {
            $String ~= $.Start_Position;
        
        CATCH { default {
            $String ~= "<Start?>";
        } } }
        try {
            $String ~= "-" ~ $.End_Position;
        
        CATCH { default {
            $String ~= "-<End?>";
        } } }
        $String ~= " \{";
        my $Statement;
        for @.Statements -> $Statement
        {
            my Str $Stmt_Str = $Statement.^name;
            $String ~= " $Stmt_Str";
        }
        $String ~= " \}";
        try {
            if defined($.Error)
            {
                $String ~= " ERROR <" ~ $.Error ~ ">";
            }
        
        CATCH { default {
            $String ~= " ok";
        } } }
        return $String;
    }
} 
class Line_Statement is Statement { } 
class Scoped_Statement is Statement { } 
class Declare_Statement is Line_Statement
{
    has $.Value is rw;
    has $.Variable is rw;
    method Javascript_Generate()
    {
        if !(defined($.Variable.Javascript))
        {
            die self.Failure_Message("Variable Javascript is undefined");
        }
        my Str $Variable_Javascript = $.Variable.Javascript;
        my Str $Value_Javascript = "";
        if defined($.Value)
        {
            $Value_Javascript = " = " ~ $.Value.Javascript;
        }
        my Str $Code = "var $Variable_Javascript$Value_Javascript;\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        if !(defined($.Variable.Python))
        {
            die self.Failure_Message("Variable Python is undefined");
        }
        my Str $Variable_Python = $.Variable.Python;
        my Str $Value_Python = "None";
        if defined($.Value)
        {
            if !(defined($.Value.Python))
            {
                die self.Failure_Message("Value Python is undefined");
            }
            $Value_Python = $.Value.Python;
        }
        my Str $Code = $Variable_Python ~ " = $Value_Python\n";
        $.Python = $Code;
    }
} 
class Method_Statement is Scoped_Statement
{
    has $.Method_Context is rw;
    has $.Method_Name is rw;
    has Str $.Method_Signature is rw;
    has Str $.Python_Class is rw = "cls";
    has $.Return_Type is rw;
    has $.Variable_Context is rw;
    method Attributes()
    {
        $.Return_Type = @.Listargs.shift();
        $.Method_Name = @.Listargs.shift();
        $.Method_Context = self;
        # TODO: add this to the compiled method list of the class.
        my Str $Header = "method";
        my $Argument;
        for @.Arguments -> $Argument
        {
            # "The arguments must be consistent, because we need to know the header before generation begins\."
            $Header ~= " " ~ $Argument.Get_Input();
        }
        $.Method_Signature = $Header;
    }
    method Debug_Generate()
    {
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        if defined($.Block)
        {
            $.Block.Debug_Generate();
            $Gal_Code ~= $.Block.Gal;
        }
        else 
        {
            $Gal_Code ~= ";";
        }
        $.Debug = $Gal_Code;
    }
    method Model()
    {
        return if !$.Class_Owner;
        my Str $Signature = "method";
        my $Argument;
        for @.Arguments -> $Argument
        {
            # "The arguments must be consistent, because we need to know the header before generation begins\."
            $Signature ~= " " ~ $Argument.Get_Input();
        }
        $.Method_Signature = $Signature;
        $.Class_Owner.Signatures{$Signature} = self;
    }
    method Verb_Export()
    {
        say "Method statement " ~ $.Method_Signature ~ " Verb_Export begin";
        return if !Compiler.Instance.Verb_Export;
        say "flag on";
        my $Verb = Compiler.Instance.Get_Verb($.Method_Signature);
        return if $Verb eq "";
        say "verb found";
        my Str $My_Class_Name = $.Class_Owner.Class_Name.Input;
        return if $Verb.Handler_Classes{$My_Class_Name}:exists;
        say "handler is new";
        # TODO: Generate a text copy of my gal code with the handler header.
        $.Block.End_Position = $.End_Position;
        $.Block.Document = $.Document;
        say "getting block";
        self.Ensure_Block();
        my Str $Gal_Block = self.Gal_Block();
        say "generating handler";
        my Str $Code = "handler $My_Class_Name$Gal_Block";
        # TODO: Add it as a text token to the verb's handler list.
        say "creating token";
        my $New_Token = Token.new();
        $New_Token.Input = $Code;
        $New_Token.Gal = $Code;
        $New_Token.Start_Position = $.Start_Position;
        $New_Token.End_Position = $.End_Position;
        say "adding to verb block";
        $Verb.Ensure_Block();
        $Verb.Block.Add_Statement($New_Token);
        $Verb.Handler_Classes{$My_Class_Name} = self;
        # TODO: Check Class_Keep_Verbs compiler switch. Exit if true.
        return if Compiler.Instance.Class_Keep_Verbs;
        # TODO: Delete this method from the class.
        $.Class_Owner.Delete_Method(self);
        say "Method statement " ~ $.Method_Signature ~ " Verb_Export end";
    }
} 
class Class_Method_Statement is Method_Statement { } 
class Property_Statement is Line_Statement
{
    method Debug_Generate()
    {
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        if defined($.Block)
        {
            $.Block.Debug_Generate();
            $Gal_Code ~= $.Block.Gal;
        }
        else 
        {
            $Gal_Code ~= ";";
        }
        $.Debug = $Gal_Code;
    }
} 
class Class_Property_Statement is Line_Statement { } 
class Constructor_Statement is Method_Statement
{
    method Attributes()
    {
    }
    method Debug_Generate()
    {
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        if defined($.Block)
        {
            $.Block.Debug_Generate();
            $Gal_Code ~= $.Block.Gal;
        }
        else 
        {
            $Gal_Code ~= ";";
        }
        $.Debug = $Gal_Code;
    }
} 
class If_Statement is Scoped_Statement
{
    method Debug_Generate()
    {
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        if defined($.Block)
        {
            $.Block.Debug_Generate();
            $Gal_Code ~= $.Block.Gal;
        }
        else 
        {
            $Gal_Code ~= ";";
        }
        $.Debug = $Gal_Code;
    }
} 
class Append_Args_Statement is Line_Statement { } 
class Assign_Statement is Line_Statement { } 
class Invocation_Statement is Line_Statement { } 
class Argument_Statement is Line_Statement
{
    method Debug_Generate()
    {
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        if defined($.Block)
        {
            $.Block.Debug_Generate();
            $Gal_Code ~= $.Block.Gal;
        }
        else 
        {
            $Gal_Code ~= ";";
        }
        $.Debug = $Gal_Code;
    }
} 
class Comment_Statement is Append_Args_Statement
{
    method Debug_Generate()
    {
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        if defined($.Block)
        {
            $.Block.Debug_Generate();
            $Gal_Code ~= $.Block.Gal;
        }
        else 
        {
            $Gal_Code ~= ";";
        }
        $.Debug = $Gal_Code;
    }
} 
class For_Statement is Scoped_Statement { } 
class Interface_Statement is Scoped_Statement { } 
class Statement_Classify {...}
class Verb_Statement is Scoped_Statement
{
    has %.Handler_Classes is rw;
    has Str $.Method_Signature is rw;
    method Base_Structure()
    {
        $.Class_Context = self;
        my $Statement;
        if (defined($.Block)) && (defined($.Block.Statements))
        {
            for $.Block.Statements -> $Statement
            {
                if ($Statement ~~ Statement_Classify)
                {
                    $Statement.Verb_Owner = self;
                    $Statement.Method_Signature = $.Method_Signature;
                }
            }
        }
    }
    method Delete_Handler($Handler)
    {
        my $Statement;
        my Int $I;
        my Int $L = ($.Block.Statements.elems) - 1;
        for 0..$L -> $I
        {
            $Statement = $.Block.Statements[$I];
            if ($Statement.Start_Position == $Handler.Start_Position) && ($Statement.End_Position == $Handler.End_Position)
            {
                $.Block.Statements.splice($I, 1);
                last;
            }
        }
    }
    method Model()
    {
        Compiler.Instance.Add_Verb(self);
        # "\. \[: Compiler Instance\] Add_Class \[me\];"
    }
} 
class Read_Statement is Line_Statement { } 
class Class_Statement is Scoped_Statement
{
    has Bool $.Base_Class is rw = False;
    has @.Class_Method_Statements is rw;
    has @.Class_Property_Statements is rw;
    has $.Constructor is rw;
    has Bool $.Generate_Constructor is rw = False;
    has @.Main_Body is rw;
    has @.Method_Statements is rw;
    has Str $.Name_Prefix is rw = "";
    has @.Property_Statements is rw;
    has %.Signatures is rw;
    method Append_Statement($Statement)
    {
        $Statement.Class_Owner = self;
        if ($Statement ~~ Constructor_Statement)
        {
            # $writeline "Class_Statement\.Append_Statement Constructor Statement Found"
            $.Constructor = $Statement;
        }
        elsif ($Statement ~~ Class_Property_Statement)
        {
            # $writeline "Class_Statement\.Append_Statement - Class Property Statement: " $Statement.To_String()
            @.Class_Property_Statements.push($Statement);
        }
        elsif ($Statement ~~ Property_Statement)
        {
            @.Property_Statements.push($Statement);
            $.Generate_Constructor = True;
        }
        elsif ($Statement ~~ Interface_Statement)
        {
            @.Interface_Statements.push($Statement);
        }
        else 
        {
            # $writeline "Class_Statement\.Append_Statement " $.Class_Name.Input " owns method " $Statement.Method_Name.Input
            @.Main_Body.push($Statement);
        }
    }
    method Base_Structure()
    {
        $.Class_Context = self;
        my $Statement;
        # $writeline "Class Add to Index: " $.Class_Name.Input
        if (defined($.Block)) && (defined($.Block.Statements))
        {
            for $.Block.Statements -> $Statement
            {
                # $writeline "i append statement"
                self.Append_Statement($Statement);
            }
        }
        Compiler.Instance.Add_Class(self);
    }
    method Model()
    {
        # $writeline "Model Class Statement " self.To_String()
        Compiler.Instance.Add_Class(self);
    }
} 
class Program is Element
{
    has Str $.Fallback_Statements is rw;
    has Str $.Gal_Statements is rw;
    has Str $.Javascript_Statements is rw;
    has Str $.Mumps_Statements is rw;
    has Str $.Python_Statements is rw;
    has @.Statements is rw;
    method Debug_Generate()
    {
        my Str $Code = "";
        my $Statement;
        for @.Statements -> $Statement
        {
            if $Statement.Gal
            {
                $Code ~= $Statement.Gal ~ "\n";
            }
            else 
            {
                $Code ~= "<Error no debug for " ~ $Statement.To_String() ~ ">";
            }
        }
        $.Gal_Statements = $Code;
        $.Debug = $Code;
    }
    method Fallback_Generate()
    {
        my Str $Code = "";
        my $Statement;
        for @.Statements -> $Statement
        {
            $Statement.Fallback_Generate();
            $Code ~= $Statement.Fallback ~ "\n";
        }
        $.Fallback_Statements = $Code;
        $.Fallback = $Code;
    }
    method Gal_Add_Element($Child_Element)
    {
        if $Child_Element.End_Position > $.End_Position
        {
            $.End_Position = $Child_Element.End_Position;
        }
        @.Elements.push($Child_Element);
        @.Statements.push($Child_Element);
    }
    method Gal_Generate()
    {
        my Str $Code = "";
        my $Statement;
        for @.Statements -> $Statement
        {
            if defined($Statement.Gal)
            {
                if $Statement.Gal gt ""
                {
                    $Code ~= $Statement.Gal ~ "\n";
                }
            }
            else 
            {
                $Code ~= "<Error no gal for " ~ $Statement.To_String() ~ ">";
                 ;
            }
        }
        $.Gal_Statements = $Code;
        $.Gal = $Code;
    }
    method Javascript_Generate()
    {
        my Str $Code = "\n";
        my $Statement;
        for @.Statements -> $Statement
        {
            $Code ~= $Statement.Javascript;
        }
        $.Javascript_Statements = $Code;
        $.Javascript = $Code;
    }
    method Mumps_Generate()
    {
        my Str $Code = "";
        my $Statement;
        for @.Statements -> $Statement
        {
            if $Statement.Mumps
            {
                $Code ~= $Statement.Mumps ~ "\n";
            }
            else 
            {
                $Code ~= "<Error no mumps for " ~ $Statement.To_String() ~ ">";
            }
        }
        $.Mumps_Statements = $Code;
        $.Mumps = $Code;
    }
    method Python_Generate()
    {
        my Str $Code = "\n";
        my $Statement;
        for @.Statements -> $Statement
        {
            # $dv "\$Statement"
            $Code ~= $Statement.Python;
        }
        $.Python_Statements = $Code;
        $.Python = $Code;
    }
} 
class Gal_File is Program
{
    has Int $.End_Position is rw = -1;
    has Str $.File_Name is rw;
    has Int $.Start_Position is rw = -1;
    method Read()
    {
        my Str $File_Name = $.File_Name;
        my Str $File_Text;
        $File_Text = $File_Name.IO.slurp();
        $.Input = $File_Text;
    }
    method Write()
    {
        my Str $File_Name = $.File_Name;
        my Str $File_Text = $.Input;
        spurt $File_Name, $File_Text;
    }
} 
class Goal_Statement is Class_Statement { } 
class Feature_Assignment_Statement is Line_Statement
{
    has Str $.Class_Name is rw;
    has Str $.Property_Name is rw;
    method Fallback_Generate()
    {
        my Str $Prop = $.Property_Name;
        my Str $Cls = $.Class_Name;
        my Str $Parent = "";
        if defined($.Parent.Name)
        {
            $Parent = $.Parent.Name.Fallback;
        }
        my Str $Code = "\.= $Parent $Prop \(new $Cls" ~ self.Fallback_Args() ~ "\);";
        $.Fallback = $Code;
    }
} 
class List_Feature_Statement is Feature_Assignment_Statement
{
    method Fallback_Generate()
    {
        my Str $Prop = $.Property_Name;
        my Str $Cls = $.Class_Name;
        my Str $Parent = "";
        if defined($.Parent.Name)
        {
            $Parent = $.Parent.Name.Fallback;
        }
        my Str $Code = "list List_$Prop" ~ self.Fallback_Args() ~ ";\n";
        if $Parent gt ""
        {
            $Code ~= "\.= $Parent $Prop List_$Prop;";
        }
        $.Fallback = $Code;
    }
} 
class Symbol_Statement is Scoped_Statement
{
} 
class Entity_Definition_Statement is Statement
{
    method Fallback_Generate()
    {
         ;
        my Str $Name = $.Name.Fallback;
        my Str $Parent = "";
        if defined($.Parent.Name)
        {
            $Parent = $.Parent.Name.Fallback;
        }
        my Str $Code = "entity\.new $Name " ~ $.Class_Name ~ self.Fallback_Args() ~ ";\n";
        if $Parent gt ""
        {
            $Code ~= "\.= $Parent $Name $Name;\n";
        }
        $Code ~= $.Block.Fallback_Statements;
        $.Fallback = $Code;
    }
} 
class Operation is Named_Element
{
    method Debug_Generate()
    {
        my Str $Gal_Code = "\(" ~ $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        $Gal_Code ~= "\)";
        $.Debug = $Gal_Code;
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(" ~ $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Fallback;
        }
        $Gal_Code ~= "\)";
        $.Fallback = $Gal_Code;
    }
    method Gal_Add_Token($Token)
    {
        return 1 if ($Token ~~ Start_Token);
        if ($Token ~~ Token_Operation_End)
        {
            @.Elements.push($Token);
            $.End_Position = $Token.End_Position;
            return -1;
        }
        if ($Token ~~ Token_Comma)
        {
            return -1;
        }
        if ($Token ~~ End_Token)
        {
            $.Error = "Expected end-operation token";
            return -999;
        }
        # TODO: handle comma here
        return 1 if ($Token ~~ Start_Token);
        @.Elements.push($Token);
        if defined($.Verb)
        {
            @.Arguments.push($Token);
            @.Listargs.push($Token);
        }
        else 
        {
            $.Verb = $Token.Input;
            $Token.Is_Verb = True;
        }
        $.End_Position = $Token.End_Position;
        return 0;
    }
    method Gal_Generate()
    {
        my Str $Gal_Code = "\(" ~ $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        $Gal_Code ~= "\)";
        $.Gal = $Gal_Code;
    }
} 
class Syntax is Named_Element
{
    has Bool $.Chain_Backward is rw = False;
    has Bool $.Chain_Forward is rw = False;
    method Debug_Generate()
    {
        my Str $First_Char = "\[";
        my Str $Last_Char = "\]";
        if $.Chain_Backward
        {
            $First_Char = "";
        }
        if $.Chain_Forward
        {
            $Last_Char = ",";
        }
        $First_Char = "\[";
        $Last_Char = "\]";
        my Str $Gal_Code = $First_Char ~ $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        $Gal_Code ~= $Last_Char;
        $.Debug = $Gal_Code;
    }
    method Fallback_Generate()
    {
        # $writeline "Syntax Fallback_Generate " self.To_String()
        my Str $First_Char = "\[";
        my Str $Last_Char = "\]";
        if $.Chain_Backward
        {
            $First_Char = "";
        }
        if $.Chain_Forward
        {
            $Last_Char = ",";
        }
        $First_Char = "\[";
        $Last_Char = "\]";
        my Str $Gal_Code = $First_Char ~ $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Fallback;
        }
        $Gal_Code ~= $Last_Char;
        $.Fallback = $Gal_Code;
    }
    method Gal_Add_Token($Token)
    {
        return 1 if ($Token ~~ Start_Token);
        if ($Token ~~ Token_Syntax_End)
        {
            @.Elements.push($Token);
            $.End_Position = $Token.End_Position;
            return -1;
        }
        if ($Token ~~ Token_Comma)
        {
            return -1;
        }
        if ($Token ~~ End_Token)
        {
            $.Error = "Expected syntax end token";
            return -999;
        }
        # TODO: handle comma here
        return 1 if ($Token ~~ Start_Token);
        @.Elements.push($Token);
        if defined($.Verb)
        {
            @.Arguments.push($Token);
            @.Listargs.push($Token);
        }
        else 
        {
            $.Verb = $Token.Input;
            $Token.Is_Verb = True;
        }
        $.End_Position = $Token.End_Position;
        return 0;
    }
    method Gal_Generate()
    {
        # $writeline "Syntax Gal_Generate " self.To_String()
        my Str $First_Char = "\[";
        my Str $Last_Char = "\]";
        if $.Chain_Backward
        {
            $First_Char = "";
        }
        if $.Chain_Forward
        {
            $Last_Char = ",";
        }
        $First_Char = "\[";
        $Last_Char = "\]";
        my Str $Gal_Code = $First_Char ~ $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        $Gal_Code ~= $Last_Char;
        $.Gal = $Gal_Code;
    }
} 
class Keyvalue is Named_Element
{
    method Debug_Generate()
    {
        my Str $Gal_Code = "<";
        my Str $Between = "";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= $Between ~ $Argument.Gal;
            $Between = " ";
        }
        $Gal_Code ~= ">";
        $.Debug = $Gal_Code;
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "<";
        my Str $Between = "";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= $Between ~ $Argument.Fallback;
            $Between = " ";
        }
        $Gal_Code ~= ">";
        $.Fallback = $Gal_Code;
    }
    method Gal_Add_Token($Token)
    {
        return 1 if ($Token ~~ Start_Token);
        if ($Token ~~ Token_Keyvalue_End)
        {
            @.Elements.push($Token);
            $.End_Position = $Token.End_Position;
            return -1;
        }
        if ($Token ~~ End_Token)
        {
            # TODO: log error here
            return -999;
        }
        @.Elements.push($Token);
        @.Arguments.push($Token);
        @.Listargs.push($Token);
        $.End_Position = $Token.End_Position;
        return 0;
    }
    method Gal_Generate()
    {
        my Str $Gal_Code = "<";
        my Str $Between = "";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= $Between ~ $Argument.Gal;
            $Between = " ";
        }
        $Gal_Code ~= ">";
        $.Gal = $Gal_Code;
    }
} 
class Repeating_Operation is Operation
{
    method Javascript_Generate()
    {
        my Str $Between = "";
        my Str $Operation = " " ~ $.Js_Operator ~ " ";
        my Str $Code = "";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Code ~= $Between ~ $Argument.Javascript_Atom($.Js_Precedence);
            $Between = $Operation;
        }
        $.Javascript = $Code;
    }
    method Mumps_Generate()
    {
        my Str $Between = "";
        my Str $Code = "";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Code ~= $Between ~ $Argument.Mumps_Atom();
            $Between = $.Mumps_Operator;
        }
        $.M_Expr = $Code;
    }
    method Python_Generate()
    {
        my Str $Between = "";
        my Str $Operation = " " ~ $.Py_Operator ~ " ";
        my Str $Code = "";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Code ~= $Between ~ $Argument.Python_Atom($.Py_Precedence);
            $Between = $Operation;
        }
        $.Python = $Code;
    }
} 
class Binary_Operation is Operation
{
    method Javascript_Generate()
    {
        my $First = @.Arguments[0];
        my $Second = @.Arguments[1];
        my Int $Precedence = $.Js_Precedence;
        my Str $First_Js = $First.Javascript_Atom($Precedence);
        my Str $Second_Js = $Second.Javascript_Atom($Precedence);
        my Str $Code = $First_Js ~ " " ~ $.Js_Operator ~ " $Second_Js";
        $.Javascript = $Code;
    }
    method Mumps_Generate()
    {
        my $First = @.Arguments[0];
        my $Second = @.Arguments[1];
        my Str $First_M = $First.M_Expression();
        my Str $Second_M = $Second.M_Atom();
        my Str $Code = $First_M ~ $.Mumps_Operator ~ $Second_M;
        $.M_Expr = $Code;
    }
    method Python_Generate()
    {
        my $First = @.Arguments[0];
        my $Second = @.Arguments[1];
        my Int $Precedence = $.Py_Precedence;
        my Str $First_Py = $First.Python_Atom($Precedence);
        my Str $Second_Py = $Second.Python_Atom($Precedence);
        my Str $Code = $First_Py ~ " " ~ $.Py_Operator ~ " $Second_Py";
        $.Python = $Code;
    }
} 
class String_Binary_Operation is Operation
{
    method Javascript_Generate()
    {
        my $First = @.Arguments[0];
        my $Second = @.Arguments[1];
        my Int $Precedence = $.Js_Precedence;
        my Str $First_Js = $First.Javascript_Atom($Precedence);
        my Str $Second_Js = $Second.Javascript_Atom($Precedence);
        my Str $Code = $First_Js ~ " " ~ $.Js_Operator ~ " $Second_Js";
        $.Javascript = $Code;
    }
    method Mumps_Generate()
    {
        my $First = @.Arguments[0];
        my $Second = @.Arguments[1];
        my Str $First_M = $First.M_Expression();
        my Str $Second_M = $Second.M_Atom();
        my Str $Code = $First_M ~ $.Mumps_Operator ~ $Second_M;
        $.M_Expr = $Code;
    }
    method Python_Generate()
    {
        my $First = @.Arguments[0];
        my $Second = @.Arguments[1];
        my Int $Precedence = $.Py_Precedence;
        my Str $First_Py = $First.Python_Atom($Precedence);
        my Str $Second_Py = $Second.Python_Atom($Precedence);
        if !(($First ~~ Quote))
        {
            $First_Py = "str\($First_Py\)";
        }
        if !(($Second ~~ Quote))
        {
            $Second_Py = "str\($Second_Py\)";
        }
        my Str $Code = $First_Py ~ " " ~ $.Py_Operator ~ " $Second_Py";
        $.Python = $Code;
    }
} 
class Invocation_Operation is Operation { } 
class Unary_Operation is Operation
{
    has $.First is rw;
    method Javascript_Generate()
    {
        my Int $Precedence = $.Js_Precedence;
        my Str $First_Js = $.First.Javascript_Atom($Precedence);
        my Str $Code = $.Js_Operator ~ "\($First_Js\)";
        $.Javascript = $Code;
    }
    method Mumps_Generate()
    {
        my Str $First_M = $.First.M_Atom();
        my Str $Code = $.Mumps_Operator ~ $First_M;
        $.M_Atom = $Code;
    }
    method Python_Generate()
    {
        my Int $Precedence = $.Py_Precedence;
        my Str $First_Py = $.First.Python_Atom($Precedence);
        my Str $Code = $.Py_Operator ~ " $First_Py";
        $.Python = $Code;
    }
} 
class String_Unary_Operation is Unary_Operation
{
    has $.First is rw;
    method Python_Generate()
    {
        my Int $Precedence = $.Py_Precedence;
        my Str $First_Py = $.First.Python_Atom($Precedence);
        if !(($.First ~~ Quote))
        {
             ;
            $First_Py = "str\($First_Py\)";
        }
        my Str $Code = $.Py_Operator ~ " $First_Py";
        $.Python = $Code;
    }
} 
class Append_Args_Operation is Repeating_Operation
{
    method Attributes()
    {
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Argument.Usge = "string";
        }
    }
} 
class Noun_Syntax is Syntax { } 
class Declare_Syntax is Syntax
{
    method Javascript_Generate()
    {
        my Str $Code = $.Variable.Javascript;
        if defined($.Value)
        {
            $Code ~= " = " ~ $.Value.Javascript;
        }
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Code = $.Variable.Python;
        if defined($.Value)
        {
            $Code ~= " = " ~ $.Value.Python;
        }
        $.Python = $Code;
    }
} 
# "Language\.gal"
class Language
{
    our $.Generator_Name;
    our $.Language_Name = "Language";
    our %.Languages;
    our $.Verbose = False;
    method Generate($Element) { } 
    method Get($Element) { } 
    method Initialize()
    {
        my Str $Name = $.Language_Name;
        # "dict\.assign \[: Language Languages\] Name \[class\.self\]"
    }
} 
class Gal is Language
{
    our $.Verbose = False;
    method Generate($Element)
    {
        $Element.Gal_Generate();
    }
    method Get($Element)
    {
        return $Element.Gal if defined($Element.Gal);
        return "<Undefined>";
    }
    method Parse_Element($Element)
    {
        my $Token = $Element.Tokens[0];
        my $Next = $Element.Tokens[1];
        my $Parent = $Element;
        $Parent.Document = $Element;
        # $writeline "Parent Equals Element: " $Parent.To_String()
        my $Document = $Element;
        my Int $End = ($Element.Tokens.elems) - 1;
        my Int $Position;
        my Str $Comma_Mode = "unsupported";
        my $Child = Factory.Create_Element($Token, $Next, $Document, $Parent, $Comma_Mode);
        my @Stack;
        if $.Verbose
        {
            say "Gal_Parse push first child " ~ $Child.To_String();
        }
        @Stack.push($Child);
        $Parent = $Child;
        my Bool $Comma = False;
        for 1..$End -> $Position
        {
            if $.Verbose
            {
                say "";
            }
            $Token = $Element.Tokens[$Position];
            $Comma = ($Token ~~ Token_Comma);
            if $.Verbose
            {
                say "Parse Token " ~ $Token.To_String() ~ " with stack " ~ @Stack.elems ~ " comma $Comma mode $Comma_Mode";
            }
            # $writeline "Parse Token " $Token.To_String() " with stack " @Stack.elems " comma " $Comma " mode " $Comma_Mode
            if $Child
            {
                my Int $Status = $Child.Gal_Add_Token($Token);
                if $.Verbose
                {
                    say "    Element '" ~ $Child.To_String() ~ "' returned status '$Status' on Token '" ~ $Token.To_String() ~ "' stack length " ~ @Stack.elems ~ " comma mode $Comma_Mode";
                }
                if $Status == 0
                {
                    if (($Token ~~ Value_Token)) && (!$Token.Is_Verb)
                    {
                        if $.Verbose
                        {
                            say "Appending value token to document body";
                        }
                        $Element.Document_Body.push($Token);
                    }
                    next;
                }
                if $Status < 0
                {
                    my Int $Stack_Length = @Stack.elems;
                    my Str $Elem_String = $Child.To_String();
                    if $.Verbose
                    {
                        say "Going to pop with $Stack_Length elements, element $Elem_String";
                    }
                    if (@Stack.elems) > 0
                    {
                        $Child = @Stack.pop();
                        if (@Stack.elems) > 0
                        {
                            $Parent = @Stack[*-1];
                            # $writeline "Parent Stack Last: " $Parent.To_String()
                        }
                        else 
                        {
                            $Parent = $Element;
                            # $writeline "Parent must equal Element: " $Parent.To_String()
                            # $writeline "Child was " $Child.To_String()
                        }
                        if ($Child ~~ Syntax)
                        {
                            $Comma_Mode = "syntax";
                        }
                        elsif ($Child ~~ Operation)
                        {
                            $Comma_Mode = "operation";
                        }
                        elsif ($Child ~~ Keyvalue)
                        {
                            $Comma_Mode = "keyvalue";
                        }
                        else 
                        {
                            $Comma_Mode = "unsupported";
                        }
                        if (($Child ~~ Statement)) && (defined($Child.Block))
                        {
                            $Element.Document_Body.push($Child.Block);
                        }
                        $Element.Document_Body.push($Child);
                        if $.Verbose
                        {
                            say "Adding element " ~ $Child.To_String() ~ " to parent " ~ $Parent.To_String();
                        }
                        $Parent.Gal_Add_Element($Child);
                        if (@Stack.elems) > 0
                        {
                            $Child = @Stack[*-1];
                        }
                        else 
                        {
                            $Child = "";
                            if $.Verbose
                            {
                                say "Stack empty, null element";
                            }
                        }
                    }
                    else 
                    {
                        $Child = "";
                        $Parent = $Element;
                        if $.Verbose
                        {
                            say "Empty stack, element null";
                        }
                    }
                    next if !$Comma;
                }
                else 
                {
                    if $.Verbose
                    {
                        say "Positive Status $Status on Token " ~ $Token.To_String() ~ " in element " ~ $Element.To_String() ~ " stack length " ~ @Stack.elems;
                    }
                }
            }
            if $Position < $End
            {
                $Next = $Element.Tokens[$Position + 1];
            }
            else 
            {
                $Next = "";
            }
            if ($Token ~~ End_Token)
            {
                if $.Verbose
                {
                    say "Detected End Token " ~ $Token.To_String() ~ " in element " ~ $Child.To_String();
                }
            }
            $Child = Factory.Create_Element($Token, $Next, $Document, $Parent, $Comma_Mode);
            @Stack.push($Child);
            $Parent = $Child;
            if $.Verbose
            {
                say "Create/Push Element " ~ $Child.To_String() ~ " stack " ~ @Stack.elems ~ " body elements " ~ $Element.Document_Body.elems;
            }
        }
    }
} 
class Mumps is Language
{
    method Generate($Element)
    {
        $Element.Mumps_Generate();
    }
    method Get($Element)
    {
        return $Element.Mumps if defined($Element.Mumps);
        return "<Undefined>";
    }
    method Parse_Element($Element)
    {
    }
} 
class Fallback is Language
{
    method Generate($Element)
    {
        $Element.Fallback_Generate();
    }
    method Get($Element)
    {
        return $Element.Fallback if defined($Element.Fallback);
        return "<Undefined>";
    }
    method Parse_Element($Element)
    {
    }
} 
class Python is Language
{
    method Generate($Element)
    {
        $Element.Python_Generate();
    }
    method Get($Element)
    {
        return $Element.Python if defined($Element.Python);
        return "<Undefined>";
    }
    method Parse_Element($Element)
    {
    }
} 
class Javascript is Language
{
    method Generate($Element)
    {
        $Element.Javascript_Generate();
    }
    method Get($Element)
    {
        return $Element.Javascript if defined($Element.Javascript);
        return "<Undefined>";
    }
    method Parse_Element($Element)
    {
    }
} 
class Python_Fallback is Language
{
    method Generate($Element)
    {
        # "Avoid causing undefined errors in parents\."
        $.Python = "";
        try
        {
            $Element.Python_Generate();
            $Element.Fallback = $Element.Gal;
        }
    }
    method Get($Element)
    {
        return $Element.Python if defined($Element.Python);
        return "<Undefined>";
    }
    method Parse_Element($Element)
    {
    }
} 
class Javascript_Fallback is Language
{
    method Generate($Element)
    {
        # "Avoid causing undefined errors in parents\."
        $.Javascript = "";
        try
        {
            $Element.Javascript_Generate();
            $Element.Fallback = $Element.Gal;
        }
    }
    method Get($Element)
    {
        return $Element.Javascript if defined($Element.Javascript);
        return "<Undefined>";
    }
    method Parse_Element($Element)
    {
    }
} 
class Sql is Language
{
    method Generate($Element)
    {
        $Element.Sql_Generate();
    }
    method Get($Element)
    {
        return $Element.Sql if defined($Element.Sql);
        return "<Undefined>";
    }
    method Parse_Element($Element)
    {
    }
} 
class Debug is Language
{
    method Generate($Element)
    {
        $Element.Debug_Generate();
    }
    method Get($Element)
    {
        return $Element.Debug if defined($Element.Debug);
        return "<Undefined>";
    }
} 
class Php is Language
{
    method Generate($Element)
    {
        $Element.Php_Generate();
    }
    method Get($Element)
    {
        return $Element.Php if defined($Element.Php);
        return "<Undefined>";
    }
} 
class Java is Language
{
    method Generate($Element)
    {
        $Element.Java_Generate();
    }
    method Get($Element)
    {
        return $Element.Java if defined($Element.Java);
        return "<Undefined>";
    }
} 
class Raku is Language
{
    method Generate($Element)
    {
        $Element.Raku_Generate();
    }
    method Get($Element)
    {
        return $Element.Raku if defined($Element.Raku);
        return "<Undefined>";
    }
} 
class Language_File is Gal_File { } 
class Gal_Input is Language_File
{
    has $.Name is rw;
    method Parse()
    {
        Gal.Parse_Element(self);
    }
    method Tokenize()
    {
        self.Gal_Tokenize();
    }
} 
class Gal_Output is Language_File
{
    method Generate($Document)
    {
        my $This_Element;
        for $Document.Document_Body -> $This_Element
        {
            try {
                $This_Element.Gal_Generate();
            
            CATCH { default {
                my $Error = .Str;
                # "debug;"
                my Str $Input_Code = $This_Element.Get_Input();
                say "error generating gal: $Error code: $Input_Code";
                $This_Element.Error = $Error;
            } } }
        }
        $Document.Gal_Generate();
    }
    method Get($Element)
    {
        return $Element.Gal if defined($Element.Gal);
        return "";
    }
} 
class Test_Output is Language_File
{
    method Generate($Document)
    {
        my $This_Element;
        for $Document.Document_Body -> $This_Element
        {
            try {
                $This_Element.Test_Generate();
            
            CATCH { default {
                my $Error = .Str;
                # "debug;"
                my Str $Input_Code = $This_Element.Get_Input();
                say "error generating test: $Error code: $Input_Code";
                $This_Element.Error = $Error;
            } } }
        }
        $Document.Test_Generate();
    }
    method Get($Element)
    {
        return $Element.Test_Case if defined($Element.Test_Case);
        return "";
    }
} 
class Fallback_Output is Language_File
{
    method Generate($Document)
    {
        my $Gal_Out = Gal_Output.new();
        $Gal_Out.Generate($Document);
        my $This_Element;
        for $Document.Document_Body -> $This_Element
        {
            try {
                $This_Element.Fallback_Generate();
            
            CATCH { default {
                my $Error = .Str;
                # "debug;"
                my Str $Input_Code = $This_Element.Get_Input();
                say "error generating fallback`: $Error code: $Input_Code";
                $This_Element.Error = $Error;
            } } }
        }
        $Document.Fallback_Generate();
    }
    method Get($Element)
    {
        return $Element.Fallback if defined($Element.Fallback);
        return "";
    }
} 
class Python_Output is Language_File
{
    method Generate($Document)
    {
        my $Gal_Out = Gal_Output.new();
        $Gal_Out.Generate($Document);
        # $entity_new $Fall_Out $Fallback_Output
        # $. $Fall_Out $Generate $Document
        my $This_Element;
        for $Document.Document_Body -> $This_Element
        {
            try {
                $This_Element.Python_Generate();
            
            CATCH { default {
                my $Error = .Str;
                # "debug;"
                my Str $Input_Code = $This_Element.Get_Input();
                say "error generating python`: $Error code: $Input_Code";
                $This_Element.Error = $Error;
            } } }
        }
        $Document.Python_Generate();
    }
    method Get($Element)
    {
        return $Element.Python if defined($Element.Python);
        return "";
    }
} 
class Javascript_Output is Language_File
{
    method Generate($Document)
    {
        my $Gal_Out = Gal_Output.new();
        $Gal_Out.Generate($Document);
        # $entity_new $Fall_Out $Fallback_Output
        # $. $Fall_Out $Generate $Document
        my $This_Element;
        for $Document.Document_Body -> $This_Element
        {
            try {
                $This_Element.Javascript_Generate();
            
            CATCH { default {
                my $Error = .Str;
                # "debug;"
                my Str $Input_Code = $This_Element.Get_Input();
                say "error generating javascript`: $Error code: $Input_Code";
                $This_Element.Error = $Error;
            } } }
        }
        $Document.Javascript_Generate();
    }
    method Get($Element)
    {
        return $Element.Javascript if defined($Element.Javascript);
        return "";
    }
} 
# "Atomic_Operation\.gal"
class Operation_And is Repeating_Operation
{
    our $.Aliases = " and & && ";
    our $.Gal_Keyword = "and";
    our $.Js_Operator = "&&";
    our $.Js_Precedence = 6;
    our $.Mumps_Operator = "&";
    our $.Php_Operator = "and";
    our $.Php_Precedence = 6;
    our $.Py_Operator = "and";
    our $.Py_Precedence = 6;
    method Attributes()
    {
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Argument.Usage = "flag";
        }
    }
} 
class Operation_Add is Repeating_Operation
{
    our $.Aliases = " add ";
    our $.Gal_Keyword = "+";
    our $.Js_Operator = "+";
    our $.Js_Precedence = 6;
    our $.Mumps_Operator = "+";
    our $.Php_Operator = "+";
    our $.Php_Precedence = 6;
    our $.Py_Operator = "+";
    our $.Py_Precedence = 6;
    method Attributes()
    {
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Argument.Usage = "number";
        }
    }
} 
class Operation_Append is Append_Args_Operation
{
    our $.Gal_Keyword = "append";
    our $.Js_Operator = " + ";
    our $.Js_Precedence = 6;
    our $.Php_Operator = " + ";
    our $.Php_Precedence = 6;
    our $.Py_Operator = " + ";
    our $.Py_Precedence = 6;
    method Attributes()
    {
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Argument.Usage = "string";
        }
    }
} 
class Operation_Call is Invocation_Operation
{
    our $.Aliases = " call ";
    our $.Gal_Keyword = "\.";
    has $.Method is rw;
    has $.Target is rw;
    method Attributes()
    {
        $.Target = @.Listargs.shift();
        $.Target.Usage = "value";
        $.Method = @.Listargs.shift();
        $.Method.Usage = "method";
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Target.Javascript ~ "\." ~ $.Method.Javascript ~ "\(" ~ self.Javascript_Args(", ") ~ "\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Target.Python ~ "\." ~ $.Method.Python ~ "\(" ~ self.Python_Args(", ") ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Colon is Invocation_Operation
{
    our $.Aliases = " cm classmethod class\.method colon ";
    our $.Gal_Keyword = ":";
    has $.Method is rw;
    has $.Target is rw;
    method Attributes()
    {
        $.Target = @.Listargs.shift();
        $.Target.Usage = "class";
        $.Method = @.Listargs.shift();
        $.Method.Usage = "method";
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Target.Javascript ~ "\." ~ $.Method.Javascript ~ "\(" ~ self.Javascript_Args(", ") ~ "\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Target.Python ~ "\." ~ $.Method.Python ~ "\(" ~ self.Python_Args(", ") ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Classpropget is Operation
{
    our $.Gal_Keyword = "classpropget";
    has $.First is rw;
    has $.Second is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Second = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Class_Name;
        my Str $Property_Name;
        if defined($.Second)
        {
            $Class_Name = $.First.Javascript;
            $Property_Name = $.Second.Javascript;
        }
        else 
        {
            $Class_Name = "this\.constructor";
            if (defined($.Method_Context)) && (($.Method_Context ~~ Class_Method_Statement))
            {
                $Class_Name = "this";
            }
            $Property_Name = $.First.Javascript;
        }
        my Str $Code = $Class_Name ~ "\.$Property_Name";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Class_Name;
        my Str $Property_Name;
        if defined($.Second)
        {
            $Class_Name = $.First.Python;
            $Property_Name = $.Second.Python;
        }
        else 
        {
            $Class_Name = "self\.__class__";
            $Property_Name = $.First.Python;
        }
        my Str $Code = $Class_Name ~ "\.$Property_Name";
        $.Python = $Code;
    }
} 
class Operation_Contains is Binary_Operation
{
    our $.Gal_Keyword = "contains";
    has $.Search is rw;
    has $.String is rw;
    method Attributes()
    {
        $.String = @.Listargs.shift();
        $.Search = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.String.Javascript ~ "\.includes\(" ~ $.Search.Javascript ~ "\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Search.Python ~ " in " ~ $.String.Python;
        $.Python = $Python_Code;
    }
} 
class Operation_Defined is Unary_Operation
{
    our $.Gal_Keyword = "defined";
    our $.Js_Precedence = 6;
    our $.Py_Precedence = 6;
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ " !== undefined";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.First.Python ~ " is not None";
        $.Python = $Python_Code;
    }
} 
class Operation_Dictionary_Get is Operation
{
    our $.Aliases = " key\.get ";
    our $.Gal_Keyword = "dict\.get";
    has $.Dictionary is rw;
    has $.Key is rw;
    method Attributes()
    {
        $.Dictionary = @.Listargs.shift();
        $.Key = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Dictionary.Javascript ~ "\[" ~ $.Key.Javascript ~ "\]";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Dictionary.Python ~ "\[" ~ $.Key.Python ~ "\]";
        $.Python = $Python_Code;
    }
} 
class Operation_Key_Exists is Operation
{
    our $.Aliases = " dict\.exists ";
    our $.Gal_Keyword = "key\.exists";
    has $.Dictionary is rw;
    has $.Key is rw;
    method Attributes()
    {
        $.Dictionary = @.Listargs.shift();
        $.Key = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Key.Javascript ~ " in " ~ $.Dictionary.Javascript;
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Key.Python ~ " in " ~ $.Dictionary.Python ~ "\.keys\(\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Divide is Binary_Operation
{
    our $.Gal_Keyword = "/";
    our $.Js_Operator = "/";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "/";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_Equal is Binary_Operation
{
    our $.Aliases = " equal eq equals == ";
    our $.Gal_Keyword = "=";
    our $.Js_Operator = "==";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "==";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_Greater is Binary_Operation
{
    our $.Aliases = " gt ";
    our $.Gal_Keyword = "greater";
    our $.Js_Operator = ">";
    our $.Js_Precedence = 6;
    our $.Py_Operator = ">";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_Greater_Equal is Binary_Operation
{
    our $.Gal_Keyword = "ge";
    our $.Js_Operator = ">=";
    our $.Js_Precedence = 6;
    our $.Py_Operator = ">=";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_Http_Fetch is Operation
{
    our $.Gal_Keyword = "http\.fetch";
} 
class Operation_Isa is Binary_Operation
{
    our $.Gal_Keyword = "isa";
    our $.Js_Precedence = 6;
    has $.Class_Name is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.Class_Name = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Variable.Javascript ~ " instanceof " ~ $.Class_Name.Javascript;
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "isinstance\(" ~ $.Variable.Python ~ ", " ~ $.Class_Name.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Is_Null is Operation
{
    our $.Gal_Keyword = "is\.null";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "\(" ~ $.Variable.Javascript ~ " == null || " ~ $.Variable.Javascript ~ " == \"\"\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "\(" ~ $.Variable.Python ~ " in \(None, \"\"\)\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Less is Binary_Operation
{
    our $.Gal_Keyword = "less";
    our $.Js_Operator = "<";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "<";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_Less_Equal is Binary_Operation
{
    our $.Gal_Keyword = "le";
    our $.Js_Operator = "<=";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "<=";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_List_Get is Operation
{
    our $.Gal_Keyword = "list\.get";
    has $.List is rw;
    has $.Node is rw;
    method Attributes()
    {
        $.List = @.Listargs.shift();
        $.Node = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        if !(defined($.List.Javascript))
        {
            die self.Failure_Message("List Javascript missing");
        }
        if !(defined($.Node.Javascript))
        {
            die self.Failure_Message("Node Javascript missing");
        }
        my Str $Code = $.List.Javascript ~ "\[" ~ $.Node.Javascript ~ "\]";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        if !(defined($.List.Python))
        {
            die self.Failure_Message("List Python missing");
        }
        if !(defined($.Node.Python))
        {
            die self.Failure_Message("Node Python missing");
        }
        my Str $Code = $.List.Python ~ "\[" ~ $.Node.Python ~ "\]";
        $.Python = $Code;
    }
} 
class Operation_List_Last is Unary_Operation
{
    our $.Gal_Keyword = "list\.last";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        if !(defined($.First.Javascript))
        {
            die self.Failure_Message("List Javascript missing");
        }
        my Str $Code = $.First.Javascript ~ "\[" ~ $.First.Javascript ~ "\.length-1\]";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        if !(defined($.First.Python))
        {
            die self.Failure_Message("List Python missing");
        }
        my Str $Code = $.First.Python ~ "\[-1\]";
        $.Python = $Code;
    }
} 
class Operation_List_Length is Unary_Operation
{
    our $.Gal_Keyword = "list\.length";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.length";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "len\(" ~ $.First.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_List_Pop is Unary_Operation
{
    our $.Aliases = " list\.pop ";
    our $.Gal_Keyword = "pop";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.pop\(\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.First.Python ~ "\.pop\(\)";
        $.Python = $Python_Code;
    }
} 
class Operation_List_Shift is Unary_Operation
{
    our $.Aliases = " list\.shift ";
    our $.Gal_Keyword = "shift";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.shift\(\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.First.Python ~ "\.pop\(0\)";
        $.Python = $Python_Code;
    }
} 
class Operation_List_Split is Binary_Operation
{
    our $.Aliases = " list\.split ";
    our $.Gal_Keyword = "split";
    has $.Delimiter is rw;
    has $.String is rw;
    method Attributes()
    {
        $.String = @.Listargs.shift();
        $.Delimiter = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.String.Javascript ~ "\.split\(" ~ $.Delimiter.Javascript ~ "\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.String.Python ~ "\.split\(" ~ $.Delimiter.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Lowercase is Unary_Operation
{
    our $.Gal_Keyword = "lowercase";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.toLowerCase\(\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.First.Python ~ "\.lower\(\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Is_Lowercase is Unary_Operation
{
    our $.Aliases = " is\.lower is\.lowercase ";
    our $.Gal_Keyword = "islower";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.match\(/\[a-z\]/\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.First.Python ~ "\.islower\(\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Is_Alpha is Unary_Operation
{
    our $.Aliases = " is\.lower is\.lowercase ";
    our $.Gal_Keyword = "isalpha";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.match\(/\[a-zA-Z\]/\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.First.Python ~ "\.isalpha\(\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Multiply is Repeating_Operation
{
    our $.Gal_Keyword = "*";
    our $.Js_Operator = "*";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "*";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_New is Invocation_Operation
{
    our $.Gal_Keyword = "new";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "new " ~ $.Class_Name.Javascript ~ "\(" ~ self.Javascript_Args(", ") ~ "\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Class_Name.Python ~ "\(" ~ self.Python_Args(", ") ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Not is Unary_Operation
{
    our $.Aliases = " ! ";
    our $.Gal_Keyword = "not";
    our $.Js_Operator = "!";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "not";
    our $.Py_Precedence = 6;
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
} 
class Operation_Not_Equal is Binary_Operation
{
    our $.Gal_Keyword = "!=";
    our $.Js_Operator = "!=";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "!=";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_Not_Null is Operation
{
    our $.Gal_Keyword = "not\.null";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "\(" ~ $.Variable.Javascript ~ " !== undefined && " ~ $.Variable.Javascript ~ " > \"\"\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "\(" ~ $.Variable.Python ~ " is not None and str\(" ~ $.Variable.Python ~ "\) > \"\"\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Or is Repeating_Operation
{
    our $.Aliases = " | ";
    our $.Gal_Keyword = "or";
    our $.Js_Operator = "||";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "or";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_Round is Operation
{
    our $.Gal_Keyword = "round";
    has $.Decimals is rw;
    has $.Number is rw;
    method Attributes()
    {
        $.Number = @.Listargs.shift();
        $.Decimals = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Number.Javascript ~ "\.toFixed\(" ~ $.Decimals.Javascript ~ "\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "round\(" ~ $.Number.Python ~ ", " ~ $.Decimals.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Sql_Escape is Unary_Operation
{
    our $.Gal_Keyword = "sql\.escape";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
} 
class Operation_Sql_Query is Unary_Operation
{
    our $.Gal_Keyword = "sql\.query";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
} 
class Operation_String is Unary_Operation
{
    our $.Gal_Keyword = "string";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "String\(" ~ $.First.Javascript ~ "\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "str\(" ~ $.First.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_String_Equal is String_Binary_Operation
{
    our $.Aliases = " string\.eq ";
    our $.Gal_Keyword = "s=";
    our $.Js_Operator = "==";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "==";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_String_Greater is String_Binary_Operation
{
    our $.Aliases = " string\.gt ";
    our $.Gal_Keyword = "string\.gt";
    our $.Js_Operator = ">";
    our $.Js_Precedence = 6;
    our $.Py_Operator = ">";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_String_Greater_Equal is String_Binary_Operation
{
    our $.Gal_Keyword = "string\.ge";
    our $.Js_Operator = ">=";
    our $.Js_Precedence = 6;
    our $.Py_Operator = ">=";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_String_Length is String_Unary_Operation
{
    our $.Aliases = " length ";
    our $.Gal_Keyword = "string\.length";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.length";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "len\(" ~ $.First.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_String_Less is String_Binary_Operation
{
    our $.Gal_Keyword = "string\.lt";
    our $.Js_Operator = "<";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "<";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_String_Less_Equal is String_Binary_Operation
{
    our $.Gal_Keyword = "string\.le";
    our $.Js_Operator = "<=";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "<=";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_String_Not_Equal is String_Binary_Operation
{
    our $.Gal_Keyword = "string\.ne";
    our $.Js_Operator = "!=";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "!=";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_Substring is Operation
{
    our $.Gal_Keyword = "substring";
    has $.Length is rw;
    has $.Start_Index is rw;
    has $.String_Value is rw;
    method Attributes()
    {
        $.String_Value = @.Listargs.shift();
        $.Start_Index = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Length = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Code = $.String_Value.Javascript ~ "\.substr\(" ~ $.Start_Index.Javascript;
        if defined($.Length)
        {
            $Code ~= ", " ~ $.Length.Javascript;
        }
        $Code ~= "\)";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $SVal = $.String_Value.Python;
        my Str $Start = $.Start_Index.Python;
        my Str $Code;
        if defined($.Length)
        {
            my Str $Len = $.Length.Python;
            if $Len eq "1"
            {
                $Code = "$SVal\[$Start\]";
            }
            else 
            {
                $Code = "$SVal\[$Start:\($Start\)+\($Len\)\]";
            }
        }
        else 
        {
            $Code = "$SVal\[$Start:\]";
        }
        $.Python = $Code;
    }
} 
class Operation_Subtract is Binary_Operation
{
    our $.Gal_Keyword = "-";
    our $.Js_Operator = "-";
    our $.Js_Precedence = 6;
    our $.Py_Operator = "-";
    our $.Py_Precedence = 6;
    method Attributes()
    {
    }
} 
class Operation_Time_String is Operation
{
    our $.Gal_Keyword = "time\.string";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "\(new Date\(\)\.toISOString\(\)\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "datetime\.datetime\.now\(\)\.strftime\(\"%Y-%m-%d %H:%M:%S\"\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Uppercase is Unary_Operation
{
    our $.Gal_Keyword = "uppercase";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.toUpperCase\(\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.First.Python ~ "\.upper\(\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Titlecase is Unary_Operation
{
    our $.Gal_Keyword = "titlecase";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.toUpperCase\(\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.First.Python ~ "\.title\(\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Is_Uppercase is Unary_Operation
{
    our $.Aliases = " is\.upper is\.uppercase ";
    our $.Gal_Keyword = "isupper";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.First.Javascript ~ "\.match\(/\[A-Z\]/\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.First.Python ~ "\.isupper\(\)";
        $.Python = $Python_Code;
    }
} 
class Operation_We is Invocation_Operation
{
    our $.Gal_Keyword = "we";
    has $.Method is rw;
    method Attributes()
    {
        $.Method = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Class_Name = "this\.constructor";
        if (defined($.Method_Context)) && (($.Method_Context ~~ Class_Method_Statement))
        {
            $Class_Name = "this";
        }
        my Str $Code = $Class_Name ~ "\." ~ $.Method.Javascript ~ "\(" ~ self.Javascript_Args(", ") ~ "\)";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "self\.__class__\." ~ $.Method.Python ~ "\(" ~ self.Python_Args(", ") ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Whitespace is Unary_Operation
{
    our $.Gal_Keyword = "whitespace";
    has $.First is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "!" ~ $.First.Javascript ~ "\.match\(/\\S/\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "not\(re\.match\(r\"\\S\"," ~ $.First.Python ~ "\)\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Int2char is Operation
{
    our $.Gal_Keyword = "int2char";
    has $.Integer is rw;
    method Attributes()
    {
        $.Integer = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "String\.fromCharCode\(" ~ $.Integer.Javascript ~ "\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "chr\(" ~ $.Integer.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Char2int is Operation
{
    our $.Gal_Keyword = "char2int";
    has $.Character is rw;
    method Attributes()
    {
        $.Character = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Character.Javascript ~ "\.charCodeAt\(0\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "ord\(" ~ $.Character.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Environment is Operation
{
    our $.Gal_Keyword = "env";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "process\.env\[" ~ $.Variable.Javascript ~ "\]";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "os\.environ\[" ~ $.Variable.Python ~ "\]";
        $.Python = $Python_Code;
    }
} 
class Syntax_Is is Syntax
{
    our $.Gal_Keyword = "is";
    has $.Superclass is rw;
    method Attributes()
    {
        $.Superclass = @.Listargs.shift();
        # $writeline "IS ToString: " self.To_String()
        # $writeline "Parent ToString: " $.Parent.To_String()
        $.Parent.Base_Class = True;
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = " extends " ~ $.Superclass.Javascript;
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "\(" ~ $.Superclass.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Syntax_Dot is Syntax
{
    our $.Gal_Keyword = "\.";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = self.Javascript_Arguments("\.");
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = self.Python_Arguments("\.");
        $.Python = $Python_Code;
    }
} 
class Syntax_Colon is Syntax
{
    our $.Gal_Keyword = ":";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = self.Javascript_Arguments("\.");
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = self.Python_Arguments("\.");
        $.Python = $Python_Code;
    }
} 
class Syntax_Key is Syntax
{
    our $.Gal_Keyword = "key";
    has $.Dictionary is rw;
    has $.Key is rw;
    method Attributes()
    {
        $.Dictionary = @.Listargs.shift();
        $.Key = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Dictionary.Javascript ~ "\[" ~ $.Key.Javascript ~ "\]";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Dictionary.Python ~ "\[" ~ $.Key.Python ~ "\]";
        $.Python = $Python_Code;
    }
} 
class Syntax_Node is Syntax
{
    our $.Gal_Keyword = "node";
    has $.List is rw;
    has $.Node is rw;
    method Attributes()
    {
        $.List = @.Listargs.shift();
        $.Node = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.List.Javascript ~ "\[" ~ $.Node.Javascript ~ "\]";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.List.Python ~ "\[" ~ $.Node.Python ~ "\]";
        $.Python = $Python_Code;
    }
} 
class Syntax_Line is Syntax
{
    our $.Gal_Keyword = "line";
    has $.Count is rw;
    method Attributes()
    {
        if (@.Listargs.elems) > 0
        {
            $.Count = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Code = "\"\\n\"";
        if defined($.Count)
        {
            $Code ~= "\.repeat\(" ~ $.Count.Javascript ~ "\)";
        }
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Code = "'\\n'";
        if defined($.Count)
        {
            $Code ~= "*" ~ $.Count.Python;
        }
        $.Python = $Code;
    }
} 
class Syntax_Tab is Syntax
{
    our $.Gal_Keyword = "tab";
    has $.Count is rw;
    method Attributes()
    {
        if (@.Listargs.elems) > 0
        {
            $.Count = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Code = "\"\\t\"";
        if defined($.Count)
        {
            $Code ~= "\.repeat\(" ~ $.Count.Javascript ~ "\)";
        }
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Code = "\"\\t\"";
        if defined($.Count)
        {
            $Code ~= "*" ~ $.Count.Python;
        }
        $.Python = $Code;
    }
} 
class Syntax_Backslash is Syntax
{
    our $.Gal_Keyword = "backslash";
    has $.Count is rw;
    method Attributes()
    {
        if (@.Listargs.elems) > 0
        {
            $.Count = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Code = "gal\.backslash\(";
        if defined($.Count)
        {
            $Code ~= $.Count.Javascript;
        }
        $Code ~= "\)";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Code = "gal\.backslash\(";
        if defined($.Count)
        {
            $Code ~= $.Count.Python;
        }
        $Code ~= "\)";
        $.Python = $Code;
    }
} 
class Syntax_Indent is Syntax
{
    our $.Gal_Keyword = "indent";
    has $.Count is rw;
    method Attributes()
    {
        if (@.Listargs.elems) > 0
        {
            $.Count = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Code = "\"    \"";
        if defined($.Count)
        {
            $Code ~= "\.repeat\(" ~ $.Count.Javascript ~ "\)";
        }
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Code = "\"    \"";
        if defined($.Count)
        {
            $Code ~= "*" ~ $.Count.Python;
        }
        $.Python = $Code;
    }
} 
class Syntax_String is Declare_Syntax
{
    our $.Gal_Keyword = "string";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Syntax_Number is Declare_Syntax
{
    our $.Gal_Keyword = "number";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Syntax_Integer is Declare_Syntax
{
    our $.Gal_Keyword = "integer";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Syntax_Entity is Declare_Syntax
{
    our $.Gal_Keyword = "entity";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Syntax_Variant is Declare_Syntax
{
    our $.Gal_Keyword = "variant";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Syntax_Flag is Declare_Syntax
{
    our $.Gal_Keyword = "flag";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Syntax_Dictionary is Declare_Syntax
{
    our $.Gal_Keyword = "dictionary";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Syntax_List is Declare_Syntax
{
    our $.Gal_Keyword = "list";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Syntax_Class is Syntax
{
    our $.Gal_Keyword = "class";
    has $.Expression is rw;
    method Attributes()
    {
        if (@.Listargs.elems) > 0
        {
            $.Expression = @.Listargs.shift();
        }
    }
    method Fallback_Generate()
    {
        my Str $Target = "our";
        if defined($.Expression)
        {
            $Target = ": " ~ $.Expression.Fallback;
        }
        my Str $Code = "\[$Target Global\]";
    }
    method Javascript_Generate()
    {
        my Str $Entity = "this";
        if defined($.Expression)
        {
            $Entity = $.Expression.Javascript;
        }
        my Str $Code = $Entity ~ "\.constructor";
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Code ~= "\." ~ $Argument.Javascript;
        }
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Entity = "self\.__class__";
        if defined($.Method_Context)
        {
            if ($.Method_Context ~~ Class_Method_Statement)
            {
                $Entity = "cls";
            }
        }
        if defined($.Expression)
        {
            $Entity = "$.Expression.Python\.__class__";
        }
        my Str $Code = $Entity;
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Code ~= "\." ~ $Argument.Python;
        }
        $.Python = $Code;
    }
} 
class Syntax_My_Class is Syntax
{
    our $.Aliases = " self\.class me\.class us ";
    our $.Gal_Keyword = "my\.class";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "this\.constructor";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "self\.__class__";
        $.Python = $Python_Code;
    }
} 
class Syntax_Class_Name is Syntax
{
    our $.Gal_Keyword = "class\.name";
    has $.Entity is rw;
    method Attributes()
    {
        if (@.Listargs.elems) > 0
        {
            $.Entity = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Entity_Code = "this";
        if defined($.Entity)
        {
            $Entity_Code = $.Entity.Javascript_Atom(99);
        }
        my Str $Code = $Entity_Code ~ "\.constructor\.name";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Entity_Code = "self";
        if defined($.Entity)
        {
            $Entity_Code = $.Entity.Python_Atom(99);
        }
        my Str $Code = $Entity_Code ~ "\.__class__\.__name__";
        $.Python = $Code;
    }
} 
class Syntax_Class_Property is Syntax
{
    our $.Gal_Keyword = "class\.property";
    has $.First is rw;
    has $.Second is rw;
    method Attributes()
    {
        $.First = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Second = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Class_Name;
        my Str $Property_Name;
        if defined($.Second)
        {
            $Class_Name = $.First.Javascript;
            $Property_Name = $.Second.Javascript;
        }
        else 
        {
            $Class_Name = "this\.constructor";
            if (defined($.Method_Context)) && (($.Method_Context ~~ Class_Method_Statement))
            {
                $Class_Name = "this";
            }
            $Property_Name = $.First.Javascript;
        }
        my Str $Code = $Class_Name ~ "\.$Property_Name";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Class_Name;
        my Str $Property_Name;
        if defined($.Second)
        {
            $Class_Name = $.First.Python;
            $Property_Name = $.Second.Python;
        }
        else 
        {
            # $writeline "************ debug this here *******************"
            if !(defined($.Method_Context))
            {
                 ;
                die "No Method Context in class property " ~ $.First.Python;
            }
            my $Context = $.Method_Context;
            # $dv "\$Context"
            $Class_Name = $Context.Python_Class;
            # $dv "\$Class_Name"
            $Property_Name = $.First.Python;
        }
        my Str $Code = $Class_Name ~ "\.$Property_Name";
        $.Python = $Code;
    }
} 
class Syntax_True is Noun_Syntax
{
    our $.Gal_Keyword = "true";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "true";
        $.Javascript = $Javascript_Code;
    }
    method Mumps_Generate()
    {
        my Str $Mumps_Code = "1";
        $.Mumps = $Mumps_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "True";
        $.Python = $Python_Code;
    }
} 
class Syntax_False is Noun_Syntax
{
    our $.Gal_Keyword = "false";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "false";
        $.Javascript = $Javascript_Code;
    }
    method Mumps_Generate()
    {
        my Str $Mumps_Code = "0";
        $.Mumps = $Mumps_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "False";
        $.Python = $Python_Code;
    }
} 
class Syntax_Null is Noun_Syntax
{
    our $.Gal_Keyword = "null";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "undefined";
        $.Javascript = $Javascript_Code;
    }
    method Mumps_Generate()
    {
        my Str $Mumps_Code = "\"\"";
        $.Mumps = $Mumps_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "None";
        $.Python = $Python_Code;
    }
} 
class Syntax_Infinity is Syntax
{
    our $.Gal_Keyword = "infinity";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "Infinity";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "float\('inf'\)";
        $.Python = $Python_Code;
    }
} 
class Syntax_Negative_Infinity is Syntax
{
    our $.Gal_Keyword = "-infinity";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "Number\.NEGATIVE_INFINITY";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "-float\('inf'\)";
        $.Python = $Python_Code;
    }
} 
# "Atomic_Statement_AK\.gal"
class Statement_Add is Line_Statement
{
    our $.Gal_Keyword = "add";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Variable.Javascript ~ " += " ~ self.Javascript_Args(" + ") ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Variable.Python ~ " += " ~ self.Python_Args(" + ") ~ "\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Append is Append_Args_Statement
{
    our $.Aliases = " string\.append ";
    our $.Gal_Keyword = "append";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Variable.Javascript ~ " += " ~ self.Javascript_Args(" + ") ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Variable.Python ~ " += " ~ self.Python_String_Args(" + ") ~ "\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Assign is Scoped_Statement
{
    our $.Gal_Keyword = "=";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.Value = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            my Str $Message = "Too many arguments: 2 expected";
            $.Error = $Message;
            die $Message;
        }
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Variable.Javascript ~ " = " ~ $.Value.Javascript ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Mumps_Generate()
    {
        my Str $Mumps_Code = " set " ~ $.Variable.Mumps ~ "=" ~ $.Value.Mumps ~ "\n";
        $.Mumps = $Mumps_Code;
    }
    method Python_Generate()
    {
        if !(defined($.Variable.Python))
        {
            die self.Failure_Message("missing Variable Python");
        }
        if !(defined($.Value.Python))
        {
            die self.Failure_Message("missing Value Python");
        }
        my Str $Code = $.Variable.Python ~ " = " ~ $.Value.Python ~ "\n";
        $.Python = $Code;
    }
} 
class Statement_Break is Line_Statement
{
    our $.Gal_Keyword = "break";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "break;\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "break\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Call is Invocation_Statement
{
    our $.Gal_Keyword = "\.";
    has $.Method is rw;
    has $.Target is rw;
    method Attributes()
    {
        $.Target = @.Listargs.shift();
        $.Method = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Target.Javascript ~ "\." ~ $.Method.Javascript ~ "\(" ~ self.Javascript_Args(", ") ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Target.Python ~ "\." ~ $.Method.Python ~ "\(" ~ self.Python_Args(", ") ~ "\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Colon is Invocation_Statement
{
    our $.Aliases = " c\. ";
    our $.Gal_Keyword = ":";
    has $.Method is rw;
    has $.Target is rw;
    method Attributes()
    {
        $.Target = @.Listargs.shift();
        $.Method = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Target.Javascript ~ "\." ~ $.Method.Javascript ~ "\(" ~ self.Javascript_Args(", ") ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Target.Python ~ "\." ~ $.Method.Python ~ "\(" ~ self.Python_Args(", ") ~ "\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Catch is Scoped_Statement
{
    our $.Gal_Keyword = "catch";
    has $.Variable is rw;
    method Attributes()
    {
        if (@.Listargs.elems) > 0
        {
            $.Variable = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Code = "catch";
        if defined($.Variable)
        {
            $Code ~= " \(" ~ $.Variable.Javascript ~ "\)";
        }
        $Code ~= self.Javascript_Block();
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Code = "except Exception";
        if defined($.Variable)
        {
            $Code ~= " as " ~ $.Variable.Python;
        }
        $Code ~= self.Python_Block();
        $.Python = $Code;
    }
} 
class Statement_Continue is Line_Statement
{
    our $.Gal_Keyword = "continue";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "continue;\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "continue\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Class_Method is Class_Method_Statement
{
    our $.Gal_Keyword = "class\.method";
    has $.Method_Name is rw;
    has Str $.Method_Signature is rw;
    has Str $.Python_Class is rw = "cls";
    has $.Return_Type is rw;
    method Attributes()
    {
        # $writeline "Class Method attributes"
        $.Return_Type = @.Listargs.shift();
        $.Method_Name = @.Listargs.shift();
        $.Method_Context = self;
        my Str $Header = "class\.method";
        my $Argument;
        for @.Arguments -> $Argument
        {
            # "The arguments must be consistent, because we need to know the header before generation begins\."
            $Header ~= " " ~ $Argument.Get_Input();
        }
        $.Method_Signature = $Header;
        # $writeline "Saved class method header: " $Header
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "static " ~ $.Method_Name.Javascript ~ "\(" ~ self.Javascript_Args(", ") ~ "\)" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Code = "@classmethod\ndef " ~ $.Method_Name.Python ~ "\(cls";
        my Str $Args = self.Python_Args(", ");
        if $Args gt ""
        {
            $Code ~= ", $Args";
        }
        $Code ~= "\)" ~ self.Python_Block();
        $.Python = $Code;
    }
} 
class Statement_Class_Property is Class_Property_Statement
{
    our $.Gal_Keyword = "class\.property";
    has $.Data_Type is rw;
    has $.Property_Name is rw;
    has $.Value is rw;
    method Attributes()
    {
        $.Data_Type = @.Listargs.shift();
        $.Property_Name = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Name_Code = $.Property_Name.Javascript;
        my Str $Value_Code = "undefined";
        my Str $DT = $.Data_Type.Input;
        $DT = " $DT ";
        if " dict dictionary hash ".contains($DT)
        {
            $Value_Code = "\{\}";
        }
        elsif " list array ".contains($DT)
        {
            $Value_Code = "\[\]";
        }
        if defined($.Value)
        {
            $Value_Code = $.Value.Javascript;
        }
        my Str $Code = "static $Name_Code = $Value_Code;\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Name_Code = $.Property_Name.Python;
        my Str $Value_Code = "None";
        my Str $DT = $.Data_Type.Input;
        $DT = " $DT ";
        if " dict dictionary hash ".contains($DT)
        {
            $Value_Code = "\{\}";
        }
        elsif " list array ".contains($DT)
        {
            $Value_Code = "\[\]";
        }
        if defined($.Value)
        {
            $Value_Code = $.Value.Python;
        }
        my Str $Code = $Name_Code ~ " = $Value_Code\n";
        $.Python = $Code;
    }
} 
class Statement_Comment is Comment_Statement
{
    our $.Gal_Keyword = "comment";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment " ~ self.Enquote(self.Argument_String()) ~ ";";
        $.Fallback = $Gal_Code;
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "/* " ~ self.Get_Input() ~ " */\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Code = "";
        my Str $Arg = self.Get_Input();
        my @Lines = split("\n", $Arg);
        for @Lines -> $Arg
        {
            $Code ~= "# $Arg\n";
        }
        $.Python = $Code;
    }
} 
class Statement_Constructor is Constructor_Statement
{
    our $.Gal_Keyword = "constructor";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Code = "constructor\(";
        my Str $Args = self.Javascript_Args(", ");
        if $Args gt ""
        {
            $Code ~= $Args;
        }
        $Code ~= "\) \{\n    super\(\);\n";
        if $.Parent.Generate_Constructor
        {
            $Code ~= "    this\.propinit\(\);\n";
        }
        $Code ~= self.Javascript_Statements() ~ "\}\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Code = "def __init__\(self";
        my Str $Args = self.Python_Args(", ");
        if $Args gt ""
        {
            $Code ~= ", $Args";
        }
        $Code ~= "\):\n    super\(\)\.__init__\(\)\n";
        if $.Parent.Generate_Constructor
        {
            $Code ~= "    self\.propinit\(\)\n";
        }
        $Code ~= self.Python_Statements();
        $.Python = $Code;
    }
} 
class Statement_Debug is Line_Statement
{
    our $.Gal_Keyword = "debug";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "debugger;\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "zdebug\.zbreak\(\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Debug_If is Line_Statement
{
    our $.Gal_Keyword = "debugif";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "if " ~ self.Javascript_Args(",") ~ "\n\{\n    debugger;\n\}\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "if " ~ self.Python_Args(",") ~ ":\n    zdebug\.zbreak\(\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Debug_Stack is Line_Statement
{
    our $.Gal_Keyword = "debug\.stack";
} 
class Statement_Debug_Variable is Line_Statement
{
    our $.Gal_Keyword = "debug\.variable";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Code = "";
        my $Argument;
        for @.Arguments -> $Argument
        {
            my Str $Arg_Name = $Argument.Javascript;
            $Code ~= "try \{\n    console\.log\(\"$Arg_Name:\", $Arg_Name\);\n\}\ncatch \{\n    console\.log\(\"$Arg_Name:\", \"<ERROR>\"\);\n\}\n";
            $.Javascript = $Code;
        }
    }
    method Python_Generate()
    {
        my Str $Code = "";
        my $Argument;
        for @.Arguments -> $Argument
        {
            my Str $Arg_Name = $Argument.Python;
            $Code ~= "try:\n    print\(\"$Arg_Name:\", $Arg_Name\);\nexcept Exception:\n    print\(\"$Arg_Name:\", \"<ERROR>\"\)\n";
            $.Python = $Code;
        }
    }
} 
class Statement_Dictionary is Scoped_Statement
{
    our $.Gal_Keyword = "dict";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Variable_Code = $.Variable.Javascript;
        my Str $Value_Code = "";
        my Str $Between = "";
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Value_Code ~= $Between ~ $Argument.Javascript;
            $Between = ", ";
        }
        my Str $Code = "var $Variable_Code= \{$Value_Code\};\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Variable_Code = $.Variable.Python;
        my Str $Value_Code = "";
        my Str $Between = "";
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Value_Code ~= $Between ~ $Argument.Python;
            $Between = ", ";
        }
        my Str $Code = $Variable_Code ~ " = \{$Value_Code\}\n";
        $.Python = $Code;
    }
} 
class Statement_Dictionary_Assign is Scoped_Statement
{
    our $.Gal_Keyword = "dict\.=";
    has $.Key is rw;
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.Key = @.Listargs.shift();
        $.Value = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Variable.Javascript ~ "\[" ~ $.Key.Javascript ~ "\] = " ~ $.Value.Javascript ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Variable.Python ~ "\[" ~ $.Key.Python ~ "\] = " ~ $.Value.Python ~ ";\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Else is If_Statement
{
    our $.Gal_Keyword = "else";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "else" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "else" ~ self.Python_Block();
        $.Python = $Python_Code;
    }
} 
class Statement_Else_If is If_Statement
{
    our $.Gal_Keyword = "else\.if";
    has $.Condition is rw;
    method Attributes()
    {
        $.Condition = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "else if \(" ~ $.Condition.Javascript ~ "\)" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "elif " ~ $.Condition.Python ~ self.Python_Block();
        $.Python = $Python_Code;
    }
} 
class Statement_Entity is Declare_Statement
{
    our $.Gal_Keyword = "entity";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Statement_Error is Append_Args_Statement
{
    our $.Gal_Keyword = "error";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "throw " ~ self.Javascript_Args(" + ") ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "raise Exception\(" ~ self.Python_String_Args(" + ") ~ "\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_File_Append is Line_Statement
{
    our $.Gal_Keyword = "file\.append";
    has $.Appended_Text is rw;
    has $.File_Name is rw;
    method Attributes()
    {
        $.File_Name = @.Listargs.shift();
        $.Appended_Text = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "gal\.file_append\(" ~ $.File_Name.Javascript ~ "," ~ $.Appended_Text.Javascript ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "gal\.file_append\(" ~ $.File_Name.Python ~ "," ~ $.Appended_Text.Python ~ "\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_File_Readall is Line_Statement
{
    our $.Gal_Keyword = "file\.readall";
    has $.File_Name is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.File_Name = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Varname = $.Variable.Javascript;
        my Str $File_Name = $.File_Name.Javascript;
        my Str $Code = $Varname ~ " = gal\.file_reader\.readFileSync\($File_Name,'utf8'\);\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "_FH = open\(" ~ $.File_Name.Python ~ ", \"r\"\)\n" ~ $.Variable.Python ~ " = _FH\.read\(\)\n_FH\.close\(\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_File_Dump is Line_Statement
{
    our $.Gal_Keyword = "file\.dump";
    has $.File_Name is rw;
    has $.File_Text is rw;
    method Attributes()
    {
        $.File_Text = @.Listargs.shift();
        $.File_Name = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "gal\.file_reader\.writeFileSync\(" ~ $.File_Name.Javascript ~ ", " ~ $.File_Text.Javascript ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "_FH = open\(" ~ $.File_Name.Python ~ ", \"w\"\)\n_FH\.write\(" ~ $.File_Text.Python ~ "\)\n_FH\.close\(\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Flag is Declare_Statement
{
    our $.Gal_Keyword = "flag";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Statement_Foreach is Scoped_Statement
{
    our $.Gal_Keyword = "foreach";
    has $.List is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.List = @.Listargs.shift();
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "for \(" ~ $.Variable.Javascript ~ " of " ~ $.List.Javascript ~ "\)" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "for " ~ $.Variable.Python ~ " in " ~ $.List.Python ~ self.Python_Block();
        $.Python = $Python_Code;
    }
} 
class Statement_Forever is Scoped_Statement
{
    our $.Gal_Keyword = "forever";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "while \(true\)" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "while True" ~ self.Python_Block();
        $.Python = $Python_Code;
    }
} 
class Statement_Forgive is Scoped_Statement
{
    our $.Gal_Keyword = "forgive";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "try" ~ self.Javascript_Block() ~ "catch \{ \} \n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "try" ~ self.Python_Block() ~ "except Exception:\n    pass\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Forward is Line_Statement
{
    our $.Gal_Keyword = "forward";
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "// forward " ~ $.Name.Javascript ~ "\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "# forward " ~ $.Name.Python ~ "\n";
        $.Python = $Python_Code;
    }
} 
class Statement_For_Range is For_Statement
{
    our $.Gal_Keyword = "for\.range";
    has $.End_Index is rw;
    has $.Start_Index is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.Start_Index = @.Listargs.shift();
        $.End_Index = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        if !(defined($.Variable.Javascript))
        {
            die self.Failure_Message("Variable Javascript not defined");
        }
        if !(defined($.Start_Index.Javascript))
        {
            die self.Failure_Message("Start Index Javascript not defined");
        }
        if !(defined($.End_Index.Javascript))
        {
            die self.Failure_Message("End Index Javascript not defined");
        }
        my Str $Code = "for \(" ~ $.Variable.Javascript ~ "=" ~ $.Start_Index.Javascript ~ "; " ~ $.Variable.Javascript ~ "<=" ~ $.End_Index.Javascript ~ "; " ~ $.Variable.Javascript ~ "++\)" ~ self.Javascript_Block();
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        if !(defined($.Variable.Python))
        {
            die self.Failure_Message("Variable Python not defined");
        }
        if !(defined($.Start_Index.Python))
        {
            die self.Failure_Message("Start Index Python not defined");
        }
        if !(defined($.End_Index.Python))
        {
            die self.Failure_Message("End Index Python not defined");
        }
        my Str $Code = "for " ~ $.Variable.Python ~ " in range\(" ~ $.Start_Index.Python ~ ", " ~ $.End_Index.Python ~ "+1\)" ~ self.Python_Block();
        $.Python = $Code;
    }
} 
class Statement_Increment is Statement
{
    our $.Gal_Keyword = "increment";
    has $.Numeric is rw;
    method Attributes()
    {
        $.Numeric = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Numeric.Javascript ~ "++;\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Numeric.Python ~ " += 1\n";
        $.Python = $Python_Code;
    }
} 
class Statement_And is Statement
{
    our $.Gal_Keyword = "and";
    has $.Flag is rw;
    has $.Value is rw;
    method Attributes()
    {
        $.Flag = @.Listargs.shift();
        $.Value = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Flag.Javascript ~ " &= " ~ $.Value.Javascript ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Flag.Python ~ " &= " ~ $.Value.Python ~ "\n";
        $.Python = $Python_Code;
    }
} 
class Statement_If is If_Statement
{
    our $.Gal_Keyword = "if";
    has $.Condition is rw;
    method Attributes()
    {
        $.Condition = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "if \(" ~ $.Condition.Javascript ~ "\)" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "if " ~ $.Condition.Python ~ self.Python_Block();
        $.Python = $Python_Code;
    }
} 
class Statement_Iterate is Scoped_Statement
{
    our $.Gal_Keyword = "iterate";
    has $.Dictionary is rw;
    has $.Key_Variable is rw;
    has $.Value_Variable is rw;
    method Attributes()
    {
        $.Dictionary = @.Listargs.shift();
        $.Key_Variable = @.Listargs.shift();
        $.Value_Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "for \(\[" ~ $.Key_Variable.Javascript ~ ", " ~ $.Value_Variable.Javascript ~ "\] of Object\.entries\(" ~ $.Dictionary.Javascript ~ "\)\)" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "for " ~ $.Key_Variable.Python ~ ", " ~ $.Value_Variable.Python ~ " in " ~ $.Dictionary.Python ~ "\.items\(\)" ~ self.Python_Block();
        $.Python = $Python_Code;
    }
} 
class Statement_Integer is Declare_Statement
{
    our $.Gal_Keyword = "integer";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Statement_Join is Assign_Statement
{
    our $.Gal_Keyword = "join";
    has $.Delimiter is rw;
    has $.List is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.List = @.Listargs.shift();
        $.Delimiter = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Variable.Javascript ~ " = " ~ $.List.Javascript ~ "\.join\(" ~ $.Delimiter.Javascript ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Variable.Python ~ " = " ~ $.Delimiter.Python ~ "\.join\(" ~ $.List.Python ~ "\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Know is Line_Statement
{
    our $.Gal_Keyword = "know";
} 
# "Atomic_Statement_LZ\.gal"
class Statement_List is Declare_Statement
{
    our $.Gal_Keyword = "list";
    our $.Gs_Keyword = "list";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Variable = $.Variable.Javascript;
        my Str $Args = self.Javascript_Args(", ");
        my Str $Code = "var $Variable = \[$Args\];\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Variable = $.Variable.Python;
        my Str $Args = self.Python_Args(", ");
        my Str $Code = $Variable ~ " = \[$Args\]\n";
        $.Python = $Code;
    }
} 
class Statement_List_Clear is Line_Statement
{
    our $.Gal_Keyword = "list\.clear";
    has $.List is rw;
    method Attributes()
    {
        $.List = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.List.Javascript ~ " = \[\];";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.List.Python ~ "\.clear\(\)";
        $.Python = $Python_Code;
    }
} 
class Statement_List_Copy is Declare_Statement
{
    our $.Gal_Keyword = "list\.copy";
    our $.Gs_Keyword = "list\.copy";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Variable = $.Variable.Javascript;
        my Str $Value = "\[\]";
        if defined($.Value)
        {
            $Value = $.Value.Javascript;
        }
        my Str $Code = "var $Variable = $Value;\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Variable = $.Variable.Python;
        my Str $Value = "\[\]";
        if defined($.Value)
        {
            $Value = $.Value.Python;
        }
        my Str $Code = $Variable ~ " = $Value\n";
        $.Python = $Code;
    }
} 
class Statement_List_Append is Append_Args_Statement
{
    our $.Aliases = " list\.push list\.append ";
    our $.Gal_Keyword = "push";
    has $.List is rw;
    method Attributes()
    {
        $.List = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.List.Javascript ~ "\.push\(" ~ self.Javascript_Args(", ") ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.List.Python ~ "\.extend\(\[" ~ self.Python_Args(", ") ~ "\]\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_List_Delete is Line_Statement
{
    our $.Aliases = " list\.remove list\.splice ";
    our $.Gal_Keyword = "list\.delete";
    has $.Count is rw;
    has $.Index is rw;
    has $.List is rw;
    method Attributes()
    {
        $.List = @.Listargs.shift();
        $.Index = @.Listargs.shift();
        $.Count = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.List.Javascript ~ "\.splice\(" ~ $.Index.Javascript ~ ", " ~ $.Count.Javascript ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "del " ~ $.List.Python ~ "\[" ~ $.Index.Python ~ ":" ~ $.Index.Python ~ "+" ~ $.Count.Python ~ "\]\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Main is Method_Statement
{
    our $.Gal_Keyword = "main";
    has Str $.Python_Class is rw = "__foobar__";
    has %.Signatures is rw;
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Args_Code = "let \[_node, _code, " ~ self.Javascript_Args(", ") ~ "\] = process\.argv;\n";
        my $Statement;
        my Str $Statements_Code = "";
        for $.Block.Statements -> $Statement
        {
            $Statements_Code ~= $Statement.Javascript;
        }
        my Str $Code = "/* Main Program Body */\n$Args_Code$Statements_Code\n";
        $.Javascript = $Code;
    }
    method Mumps_Generate()
    {
        my Str $Mumps_Code = "main ; main entry point\n" ~ $.Block.Mumps ~ "    quit\n";
        $.Mumps = $Mumps_Code;
    }
    method Python_Generate()
    {
        my Str $Code = "if __name__ == '__main__'";
        if (@.Listargs.elems) > 0
        {
            $Code ~= ":\n    try:\n        \(" ~ self.Python_Args(", ") ~ "\) = sys\.argv\[1:\]\n    except:\n        pass\n";
            # "print\(\"Usage: python\", sys\.argv\[0\], \"" self.Python_Args(" ") "\"\)" " " "        " "sys\.exit\(\)" " "
            $Code ~= self.Python_Statements();
        }
        else 
        {
            $Code ~= self.Python_Block();
        }
        $.Python = $Code;
    }
} 
class Statement_Method is Method_Statement
{
    our $.Gal_Keyword = "method";
    has $.Method_Name is rw;
    has Str $.Python_Class is rw = "self\.__class__";
    has $.Return_Type is rw;
    method Attributes()
    {
        $.Return_Type = @.Listargs.shift();
        $.Method_Name = @.Listargs.shift();
        $.Method_Context = self;
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Method_Name.Javascript ~ "\(" ~ self.Javascript_Args(", ") ~ "\)" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Code = "def " ~ $.Method_Name.Python ~ "\(self";
        my Str $Args = self.Python_Args(", ");
        my Str $Block = self.Python_Block();
        if $Args gt ""
        {
            $Code ~= ", $Args";
        }
        $Code ~= "\)$Block";
        $.Python = $Code;
    }
} 
class Statement_Module is Line_Statement
{
    our $.Gal_Keyword = "module";
} 
class Statement_Number is Declare_Statement
{
    our $.Gal_Keyword = "number";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Statement_Property is Property_Statement
{
    our $.Gal_Keyword = "property";
    has $.Data_Type is rw;
    has $.Property_Name is rw;
    has $.Value is rw;
    method Attributes()
    {
        $.Data_Type = @.Listargs.shift();
        $.Property_Name = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Name_Code = $.Property_Name.Javascript;
        my Str $Value_Code = "undefined";
        my Str $DT = $.Data_Type.Input;
        $DT = " $DT ";
        if " dict dictionary hash ".contains($DT)
        {
            $Value_Code = "\{\}";
        }
        elsif " list array ".contains($DT)
        {
            $Value_Code = "\[\]";
        }
        if defined($.Value)
        {
            $Value_Code = $.Value.Javascript;
        }
        my Str $Code = "this\.$Name_Code = $Value_Code;\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Name_Code = $.Property_Name.Python;
        my Str $Value_Code = "None";
        my Str $DT = $.Data_Type.Input;
        $DT = " $DT ";
        if " dict dictionary hash ".contains($DT)
        {
            $Value_Code = "\{\}";
        }
        elsif " list array ".contains($DT)
        {
            $Value_Code = "\[\]";
        }
        # $writeline "property before defined"
        if defined($.Value)
        {
            $Value_Code = $.Value.Python;
        }
        # $writeline "property after defined"
        my Str $Code = "self\.$Name_Code = $Value_Code\n";
        # $writeline "Property Code " $Code
        $.Python = $Code;
    }
} 
class Statement_Propset is Assign_Statement
{
    our $.Gal_Keyword = "\.=";
    has $.Expression is rw;
    has $.Property is rw;
    has $.Target is rw;
    method Attributes()
    {
        $.Target = @.Listargs.shift();
        $.Property = @.Listargs.shift();
        $.Expression = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Target.Javascript ~ "\." ~ $.Property.Javascript ~ " = " ~ $.Expression.Javascript ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Target.Python ~ "\." ~ $.Property.Python ~ " = " ~ $.Expression.Python ~ "\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Classpropset is Assign_Statement
{
    our $.Gal_Keyword = ":=";
    has $.Expression is rw;
    has $.Property is rw;
    has $.Target is rw;
    method Attributes()
    {
        $.Target = @.Listargs.shift();
        $.Property = @.Listargs.shift();
        $.Expression = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Target.Javascript ~ "\." ~ $.Property.Javascript ~ " = " ~ $.Expression.Javascript ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Target.Python ~ "\." ~ $.Property.Python ~ " = " ~ $.Expression.Python ~ "\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Our_Equal is Assign_Statement
{
    our $.Aliases = " our\.= us= us\.= ours= ours\.= ";
    our $.Gal_Keyword = "our=";
    has $.Expression is rw;
    has $.Property is rw;
    method Attributes()
    {
        $.Property = @.Listargs.shift();
        $.Expression = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "this\." ~ $.Property.Javascript ~ " = " ~ $.Expression.Javascript ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "cls\." ~ $.Property.Python ~ " = " ~ $.Expression.Python ~ "\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Read_Line is Read_Statement
{
    our $.Gal_Keyword = "readline";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my $Argument;
        my Str $Argument_Javascript;
        my Str $Code = "";
        for @.Arguments -> $Argument
        {
            $Argument_Javascript = $Argument.Javascript;
            if ($Argument ~~ Quote)
            {
            }
            if ($Argument ~~ Token_Name)
            {
                $Code ~= $Argument_Javascript ~ " = console\.input\(\);\n";
            }
            else 
            {
                $Code ~= "console\.log\($Argument_Javascript\);\n";
            }
        }
        $.Python = $Code;
    }
    method Python_Generate()
    {
        my $Argument;
        my Str $Argument_Python;
        my Str $Code = "";
        for @.Arguments -> $Argument
        {
            $Argument_Python = $Argument.Python;
            if ($Argument ~~ Quote)
            {
            }
            if ($Argument ~~ Token_Name)
            {
                $Code ~= $Argument_Python ~ " = input\(\)\n";
            }
            else 
            {
                $Code ~= "print\($Argument_Python,sep='',end=''\)\n";
            }
        }
        $.Python = $Code;
    }
} 
class Statement_Replace is Line_Statement
{
    our $.Gal_Keyword = "replace";
    has $.Replace_Text is rw;
    has $.Search_Text is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.Search_Text = @.Listargs.shift();
        $.Replace_Text = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Variable.Javascript ~ " = " ~ $.Variable.Javascript ~ "\.replaceAll\(" ~ $.Search_Text.Javascript ~ ", " ~ $.Replace_Text.Javascript ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Variable.Python ~ " = " ~ $.Variable.Python ~ "\.replace\(" ~ $.Search_Text.Python ~ ", " ~ $.Replace_Text.Python ~ "\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Return is Line_Statement
{
    our $.Gal_Keyword = "return";
    has $.Value is rw;
    method Attributes()
    {
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
    method Javascript_Generate()
    {
        my Str $Value_Javascript = "";
        if defined($.Value)
        {
            $Value_Javascript ~= " " ~ $.Value.Javascript;
        }
        my Str $Code = "return$Value_Javascript;\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Value_Python = "";
        if defined($.Value)
        {
            $Value_Python ~= " " ~ $.Value.Python;
        }
        my Str $Code = "return$Value_Python\n";
        $.Python = $Code;
    }
} 
class Statement_Sort is Line_Statement
{
    our $.Gal_Keyword = "sort";
    has $.List is rw;
    has $.Method is rw;
    method Attributes()
    {
        $.List = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Method = @.Listargs.shift();
        }
    }
} 
class Statement_String is Append_Args_Statement
{
    our $.Gal_Keyword = "string";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.Variable.Usage = "variable";
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Argument.Usage = "string";
        }
    }
    method Javascript_Generate()
    {
        my Str $Var_Code = $.Variable.Javascript;
        my Str $Val_Code;
        if (@.Listargs.elems) > 0
        {
            $Val_Code = " = " ~ self.Javascript_Args(" + ");
        }
        else 
        {
            $Val_Code = "";
        }
        my Str $Code = "var $Var_Code$Val_Code;\n";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Var_Code = $.Variable.Python;
        my Str $Val_Code;
        if (@.Listargs.elems) > 0
        {
            $Val_Code = self.Python_String_Args(" + ");
        }
        else 
        {
            $Val_Code = "None";
        }
        my Str $Code = $Var_Code ~ " = $Val_Code\n";
        $.Python = $Code;
    }
} 
class Statement_Try is Scoped_Statement
{
    our $.Gal_Keyword = "try";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "try" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "try" ~ self.Python_Block();
        $.Python = $Python_Code;
    }
} 
class Statement_Variant is Declare_Statement
{
    our $.Gal_Keyword = "variant";
    has $.Value is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Value = @.Listargs.shift();
        }
    }
} 
class Statement_While is Scoped_Statement
{
    our $.Gal_Keyword = "while";
    has $.Condition is rw;
    method Attributes()
    {
        $.Condition = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "while \(" ~ $.Condition.Javascript ~ "\)" ~ self.Javascript_Block();
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "while " ~ $.Condition.Python ~ self.Python_Block();
        $.Python = $Python_Code;
    }
} 
class Statement_Write is Append_Args_Statement
{
    our $.Gal_Keyword = "write";
    method Attributes()
    {
    }
    method Python_Generate()
    {
        my Str $Code = "print\(" ~ self.Python_Args(", ");
        if (@.Listargs.elems) > 1
        {
            $Code ~= ",sep=''";
        }
        $Code ~= ",end=''\)\n";
        $.Python = $Code;
    }
} 
class Statement_Class is Class_Statement
{
    our $.Gal_Keyword = "class";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
        $.Class_Name.Usage = "class";
    }
    method Debug_Generate()
    {
        my Str $Gal_Code = $.Gal_Keyword;
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Gal;
        }
        if defined($.Block)
        {
            $.Block.Debug_Generate();
            $Gal_Code ~= $.Block.Gal;
        }
        else 
        {
            $Gal_Code ~= ";";
        }
        $.Debug = $Gal_Code;
    }
    method Fallback_Generate()
    {
        my Str $Name = $.Class_Name.Input;
        my $Owner_Class = Compiler.Instance.Get_Class($Name);
        my $Statement;
        my $Argument;
        if self.Am($Owner_Class)
        {
            my Str $Ancestor = "";
            if (@.Listargs.elems) > 0
            {
                $Ancestor ~= " " ~ @.Listargs[*-1].Fallback;
            }
            my Str $Arguments = " " ~ $.Class_Name.Fallback ~ " $Ancestor";
            my Str $Class_Properties = "";
            my $Prop;
            for @.Class_Property_Statements -> $Prop
            {
                $Prop.Fallback_Generate();
                $Class_Properties ~= $Prop.Fallback;
            }
            my Str $Block = $Class_Properties;
            if defined($.Constructor)
            {
                $.Constructor.Fallback_Generate();
                my Str $Thiscon = self.Indent($.Constructor.Fallback);
                $Block ~= $Thiscon;
            }
            my Str $Prop_Code = "";
            for @.Property_Statements -> $Prop
            {
                $Prop.Fallback_Generate();
                $Block ~= $Prop.Fallback ~ "\n";
            }
            my Str $MBGal = "";
            for @.Main_Body -> $Statement
            {
                $Statement.Fallback_Generate();
                $MBGal ~= $Statement.Fallback;
            }
            $Block ~= $MBGal;
            $Block = self.Indent($Block);
            my Str $Code = "class$Arguments\n\{\n$Block\}\n";
            $.Fallback = $Code;
        }
        else 
        {
            for @.Listargs -> $Argument
            {
                $Owner_Class.Listargs.push($Argument);
            }
            for $.Block.Statements -> $Statement
            {
                $Owner_Class.Block.Add_Statement($Statement);
                $Owner_Class.Append_Statement($Statement);
            }
            if defined($Owner_Class.Block.Fallback)
            {
                $Owner_Class.Block.Fallback_Generate();
            }
            if defined($Owner_Class.Fallback)
            {
                $Owner_Class.Fallback_Generate();
            }
            $.Fallback = "";
        }
    }
    method Javascript_Generate()
    {
        my Str $Arguments = self.Javascript_Arguments(" ");
        if !$.Base_Class
        {
            $Arguments ~= " extends gal";
        }
        my Str $Class_Properties = "";
        my Str $MBjs = "";
        my $Prop;
        my $Statement;
        for @.Class_Property_Statements -> $Prop
        {
            $Class_Properties ~= $Prop.Javascript;
        }
        my Str $Block = " \{\n";
        $Block ~= self.Indent($Class_Properties);
        if $.Generate_Constructor
        {
            my Str $Prop_Code = "";
            for @.Property_Statements -> $Prop
            {
                $Prop_Code ~= $Prop.Javascript;
            }
            my Str $Constructor = self.Indent($Prop_Code);
            $Constructor = self.Indent($Constructor);
            $Constructor = "    constructor\(\)\n    \{\n        super\(\);\n$Constructor    \}\n";
            $Block ~= $Constructor;
        }
        elsif defined($.Constructor)
        {
            $Block ~= $.Constructor.Javascript;
        }
        my Str $StmtJs;
        for @.Main_Body -> $Statement
        {
            if !(defined($Statement.Javascript))
            {
                die "Class method statement Javascript not defined: " ~ $Statement.Gal_Code();
            }
            my Str $Stmt_Js = $Statement.Javascript;
            $MBjs ~= $Stmt_Js;
        }
        $MBjs = self.Indent($MBjs);
        $Block ~= $MBjs ~ "\}\n";
        my Str $Code = "class $Arguments$Block";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Bool $Null_Block = True;
        my Str $Arguments = self.Python_Arguments(" ");
        my Str $Class_Properties = "";
        my Str $MBPy = "";
        my $Prop;
        my $Statement;
        for @.Class_Property_Statements -> $Prop
        {
            $Class_Properties ~= $Prop.Python;
            $Null_Block = False;
        }
        my Str $Block = "";
        $Block ~= self.Indent($Class_Properties);
        if defined($.Constructor)
        {
            my Str $Thiscon = self.Indent($.Constructor.Python);
            $Block ~= $Thiscon;
            $Null_Block = False;
        }
        if $.Generate_Constructor
        {
            $Null_Block = False;
            my Str $Prop_Code = "";
            for @.Property_Statements -> $Prop
            {
                $Prop_Code ~= $Prop.Python;
            }
            my Str $Function = "__init__";
            my Str $Super = "    super\(\)\.__init__\(\)\n";
            if defined($.Constructor)
            {
                $Function = "propinit";
                $Super = "";
            }
            my Str $Constructor = "def $Function\(self\):\n";
            $Constructor ~= $Super;
            $Constructor ~= self.Indent($Prop_Code);
            $Constructor = self.Indent($Constructor);
            $Block ~= $Constructor;
        }
        for @.Main_Body -> $Statement
        {
            $MBPy ~= $Statement.Python;
            $Null_Block = False;
        }
        $MBPy = self.Indent($MBPy);
        $Block ~= $MBPy;
        if $Null_Block
        {
            $Block ~= "    pass\n";
        }
        my Str $Code = "class $Arguments:\n$Block";
        $.Python = $Code;
    }
} 
# "Fallback\.gal"
class Definition_Statement is Scoped_Statement
{
    our $.Aliases;
    our $.Base_Class;
    our $.Gal_Keyword;
    has @.Argument_Statements is rw;
    has $.Class_Name is rw;
    has Str $.Declarations is rw = "";
    has Bool $.Generate_Attributes is rw;
    has $.Keyword is rw;
    has $.Name_Arg is rw;
    has Str $.Name_Prefix is rw = "";
    has $.Root_Type is rw;
    method Append_Statement($Statement)
    {
        # "definition statement append statement"
        $.Block.Statements.push($Statement);
    }
    method Attributes()
    {
        $.Name_Arg = @.Listargs.shift();
        $.Keyword = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Root_Type = @.Listargs.shift();
            # $writeline "Assign Root Type: " $.Root_Type.Gal
        }
        my Str $Name = $.Base_Class;
        $Name ~= "_";
        $Name ~= $.Name_Arg.Input;
        my $Token_Entity = Token_Name.new();
        $Token_Entity.Input = $Name;
        $.Class_Name = $Token_Entity;
        Compiler.Instance.Add_Class(self);
        Compiler.Instance.Add_Definition(self);
    }
    method Fallback_Generate()
    {
        my Str $Class_Name = $.Base_Class ~ "_" ~ $.Name_Arg.Fallback;
        my Str $Gal_Code = "class $Class_Name";
        if defined($.Root_Type)
        {
            my $PC = $.Root_Type;
            if !(defined($PC.Fallback))
            {
                $PC.Fallback_Generate();
            }
            my Str $Underscore = "_";
            my Str $PCFB = $PC.Fallback;
            $Gal_Code ~= " \[is $PCFB";
            $Gal_Code ~= $Underscore;
            $Gal_Code ~= $.Base_Class ~ "\]";
            # $writeline "PCFB " $PCFB " entity: " $PC.To_String() " self: " self.To_String() " gal: " $.Gal
        }
        else 
        {
            $Gal_Code ~= " \[is " ~ $.Base_Class ~ "\]";
        }
        $Gal_Code ~= "\n\{\n    class\.property string Gal_Keyword '" ~ $.Keyword.Fallback ~ "';\n    class\.property string Gs_Keyword '" ~ $.Keyword.Fallback ~ "';\n";
        if $.Block
        {
            $.Block.Fallback_Generate();
            $Gal_Code ~= $.Block.Fallback_Statements;
        }
        if $.Generate_Attributes
        {
            my Str $Attribute_Statements = "";
            my $Statement;
            if $.Block
            {
                for $.Block.Statements -> $Statement
                {
                    if defined($Statement.Gal_Declaration)
                    {
                        $Attribute_Statements ~= $Statement.Gal_Declaration;
                    }
                }
                my Str $Indented = self.Indent($Attribute_Statements);
                # $writeline "*** " $.^name " " $.Name_Arg.Fallack " - Attribute Statements: " $Attribute_Statements " " "indented:" " " $Indented
                my Str $Attribute_Method = "method void Attributes\n\{\n$Indented\}\n";
                $Gal_Code ~= self.Indent($Attribute_Method);
            }
        }
        $Gal_Code ~= "\}\n";
        my Str $Definition = ": $Class_Name Initialize \[self\];";
        $.Fallback = $Gal_Code;
        $.Fallback_Declaration = $Definition;
    }
    method Structure()
    {
        return if !$.Re_Structure;
        $.Re_Structure = False;
        self.Base_Structure();
        $.Generate_Attributes = True;
        if (defined($.Block)) && (defined($.Block.Statements))
        {
            # $writeline "Main Structure " $.^name " " $.Name_Arg.Input
            for $.Block.Statements -> $Statement
            {
                # $writeline "Structure Statement " $Statement.^name
                if (($Statement ~~ Method_Statement)) && ($Statement.Method_Name.Input eq "Attributes")
                {
                    $.Generate_Attributes = False;
                }
                elsif ($Statement ~~ Argument_Statement)
                {
                    @.Argument_Statements.push($Statement);
                }
            }
        }
        my $Element;
        for @.Elements -> $Element
        {
            # $.= $Element $Parent self
        }
        # $writeline "*** " $.^name " " $.Name_Arg.Input "\.Structure determined Generate_Attributes is " $.Generate_Attributes " ***"
    }
} 
class Statement_Statement is Definition_Statement
{
    our $.Base_Class = "Statement";
    our $.Gal_Keyword = "statement";
} 
class Statement_Operation is Definition_Statement
{
    our $.Base_Class = "Operation";
    our $.Gal_Keyword = "operation";
} 
class Statement_Syntax is Definition_Statement
{
    our $.Base_Class = "Syntax";
    our $.Gal_Keyword = "syntax";
} 
class Statement_Argument is Argument_Statement
{
    our $.Gal_Keyword = "argument";
    has $.Argument_Name is rw;
    has $.Type_Value is rw;
    method Attributes()
    {
        if (@.Listargs.elems) == 0
        {
            die "missing required Argument_Name";
        }
        $.Argument_Name = @.Listargs.shift();
        $.Argument_Name.Usage = "variable";
        if (@.Listargs.elems) > 0
        {
            $.Type_Value = @.Listargs.shift();
            $.Type_Value.Usage = "value";
        }
    }
    method Fallback_Generate()
    {
        my Str $Definition = "property entity " ~ $.Argument_Name.Fallback ~ ";";
        my Str $Code = "if \(= \(list\.length \[\. \[me\] Listargs\]\) 0\)\n\{\n    error 'missing required argument " ~ $.Argument_Name.Fallback ~ "';\n\}\n";
        $Code ~= "\.= \[me\] " ~ $.Argument_Name.Fallback ~ " \(list\.shift \[\. \[me\] Listargs\]\);\n";
        if defined($.Type_Value)
        {
            $Code ~= "\.= \[\. \[me\] " ~ $.Argument_Name.Fallback ~ "\] Usage " ~ $.Type_Value.Fallback ~ ";\n";
        }
        $.Gal_Declaration = $Code;
        $.Fallback = $Definition;
    }
} 
class Statement_Keyword is Argument_Statement
{
    our $.Gal_Keyword = "keyword";
    has $.Argument_Name is rw;
    has $.Type_Value is rw;
    method Attributes()
    {
        $.Argument_Name = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Type_Value = @.Listargs.shift();
        }
    }
    method Fallback_Generate()
    {
        my Str $Definition = "property entity " ~ $.Argument_Name.Fallback ~ ";";
        my Str $Code = "if \(= \(list\.length \[\. \[me\] Keywords\]\) 0\)\n\{\n    error 'missing required keyword " ~ $.Argument_Name.Fallback ~ "';\n\}\n";
        $Code ~= "\.= \[me\] " ~ $.Argument_Name.Fallback ~ " \(list\.shift \[\. \[me\] Keywords\]\);\n";
        if defined($.Type_Value)
        {
            $Code ~= "\.= \[\. \[me\] " ~ $.Argument_Name.Fallback ~ "\] Usage " ~ $.Type_Value.Fallback ~ ";\n";
        }
        $.Gal_Declaration = $Code;
        $.Fallback = $Definition;
    }
} 
class Statement_Optional is Argument_Statement
{
    our $.Gal_Keyword = "optional";
    has $.Argument_Name is rw;
    has $.Type_Value is rw;
    method Attributes()
    {
        if (@.Listargs.elems) == 0
        {
            die $.^name ~ " missing required Argument_Name";
        }
        $.Argument_Name = @.Listargs.shift();
        $.Argument_Name.Usage = "variable";
        if (@.Listargs.elems) > 0
        {
            $.Type_Value = @.Listargs.shift();
            $.Type_Value.Usage = "value";
        }
    }
    method Fallback_Generate()
    {
        my Str $Definition = "property entity " ~ $.Argument_Name.Fallback ~ ";";
        my Str $Code = "if \(gt \(list\.length \[\. \[me\] Listargs\]\) 0\)\n\{\n";
        $Code ~= "    \.= \[me\] " ~ $.Argument_Name.Fallback ~ " \(list\.shift \[\. \[me\] Listargs\]\);\n";
        if defined($.Type_Value)
        {
            $Code ~= "    \.= \[\. \[me\] " ~ $.Argument_Name.Fallback;
            $Code ~= "\] Usage " ~ $.Type_Value.Fallback ~ ";\n";
        }
        $Code ~= "\}\n";
        $.Gal_Declaration = $Code;
        $.Fallback = $Definition;
    }
} 
class Statement_Fallback is Append_Args_Statement
{
    our $.Gal_Keyword = "fallback";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Fallback_Generate\n\{\n    string Gal_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            $Argument_Code = $Argument.Fallback;
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Fallback\]";
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Fallback Gal_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Atomic is Append_Args_Statement
{
    our $.Gal_Keyword = "atomic";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Atomic_Generate\n\{\n    string Atomic_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            $Argument_Code = $Argument.Fallback;
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Atomic\]";
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Atomic Atomic_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Gs is Append_Args_Statement
{
    our $.Gal_Keyword = "gs";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Gs_Generate\n\{\n    string Gs_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            $Argument_Code = $Argument.Fallback;
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Gs\]";
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Gs Gs_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Javascript is Append_Args_Statement
{
    our $.Gal_Keyword = "javascript";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Javascript_Generate\n\{\n    string Javascript_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            $Argument_Code = $Argument.Fallback;
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Javascript\]";
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Javascript Javascript_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Mumps is Append_Args_Statement
{
    our $.Gal_Keyword = "mumps";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Mumps_Generate\n\{\n    string Mumps_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            $Argument_Code = $Argument.Fallback;
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Mumps\]";
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Mumps Mumps_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Python is Line_Statement
{
    our $.Gal_Keyword = "python";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Python_Generate\n\{\n    string Python_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            $Argument_Code = $Argument.Fallback;
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Python\]";
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Python Python_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Php is Line_Statement
{
    our $.Gal_Keyword = "php";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Python_Generate\n\{\n    string Php_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            $Argument_Code = $Argument.Fallback;
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Php\]";
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Php Php_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Java is Line_Statement
{
    our $.Gal_Keyword = "java";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Python_Generate\n\{\n    string Java_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            $Argument_Code = $Argument.Fallback;
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Java\]";
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Java Java_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Raku is Line_Statement
{
    our $.Gal_Keyword = "raku";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Python_Generate\n\{\n    string Raku_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            $Argument_Code = $Argument.Fallback;
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Raku\]";
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Raku Raku_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Gal_Language is Definition_Statement
{
    our $.Base_Class = "Language";
    our $.Gal_Keyword = "gal\.language";
    has $.Language_Name is rw;
    method Attributes()
    {
        $.Language_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Body = self.Indent($.Declarations);
        if $.Block
        {
            $Gal_Body ~= $.Block.Fallback_Statements;
        }
        my Str $Gal_Code = "class " ~ $.Language_Name.Fallback ~ " \[is Language\]\n\{\n$Gal_Body\}\n";
        $.Fallback = $Gal_Code;
    }
    method Model() { } 
} 
class Statement_Classify is Method_Statement
{
    our $.Gal_Keyword = "isa";
    has $.Class_Name is rw;
    has $.Method_Context is rw;
    has $.Method_Name is rw;
    has Str $.Method_Signature is rw;
    has $.Variable_Context is rw;
    has $.Verb_Owner is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
        $.Method_Context = self;
        $.Method_Signature = "method flag " ~ $.Class_Name.Input;
    }
    method Fallback_Generate()
    {
        my Str $Header = $.Parent.Method_Signature;
        my Str $Append_To = $.Class_Name.Fallback;
        my Str $Method = $Header ~ "\n\{\n" ~ $.Block.Fallback_Statements ~ "    return \[true\];\n\}";
        my Str $Code = "class\.append $Append_To\n\{\n" ~ self.Indent($Method) ~ "\}";
        $.Fallback = $Code;
    }
    method Model()
    {
        if defined($.Verb_Owner)
        {
            $.Method_Name = $.Verb_Owner.Class_Name;
        }
    }
} 
class Statement_Infer is Method_Statement
{
    our $.Gal_Keyword = "infer";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Block_Code = "";
        try
        {
            $Block_Code ~= $.Block.Fallback_Statements;
        }
        my Str $Code = "method void Infer\n\{\n$Block_Code    return \[true\];\n\}";
        $.Fallback = $Code;
    }
} 
class Statement_Verb is Verb_Statement
{
    our $.Aliases = " polymorph ";
    our $.Gal_Keyword = "verb";
    has $.Class_Name is rw;
    has $.DT is rw;
    has Str $.Method_Signature is rw;
    has Str $.Name_Prefix is rw = "";
    has Str $.Property_Name is rw;
    method Attributes()
    {
        my Str $Header = "method";
        my $Argument;
        for @.Arguments -> $Argument
        {
            # "The arguments must be consistent, because we need to know the header before generation begins\."
            $Header ~= " " ~ $Argument.Get_Input();
        }
        $.Method_Signature = $Header;
        $.DT = @.Listargs.shift();
        $.Class_Name = @.Listargs.shift();
        my Str $Name_Text = $.Class_Name.Get_Input();
        $.Property_Name = $Name_Text;
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "";
        $.Fallback = $Gal_Code;
    }
    method Gal_Generate()
    {
        my Str $Code = $.Block.Gal_Statements;
        $.Gal = $Code;
    }
    method Inference_Context()
    {
        return self;
    }
} 
class Statement_Oho is Statement
{
    our $.Gal_Keyword = "oho";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Method_Name = "Oho";
        my $Arg;
        for @.Arguments -> $Arg
        {
            $Method_Name ~= "_" ~ $Arg.Fallback;
        }
        my Str $Code = "comment \"\. \[class\] $Method_Name;\";";
        $.Fallback = $Code;
    }
} 
class Statement_Gal is Append_Args_Statement
{
    our $.Gal_Keyword = "gal";
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Gal_Generate\n\{\n    string Gal_Code";
        my $Argument;
        my Str $Argument_Code;
        for @.Arguments -> $Argument
        {
            if ($Argument ~~ Token_Name)
            {
                $Argument_Code = "\[my $Argument_Code Gal\]";
            }
            else 
            {
                $Argument_Code = $Argument.Gal;
            }
            $Gal_Code ~= " $Argument_Code";
        }
        $Gal_Code ~= ";\n    my= Gal Gal_Code;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Inference is Verb_Statement
{
    our $.Aliases = " polymorph cuckoo ";
    our $.Gal_Keyword = "inference";
    has $.Class_Name is rw;
    has $.DT is rw;
    has Str $.Method_Name is rw;
    has Str $.Method_Signature is rw;
    has Str $.Property_Name is rw;
    method Attributes()
    {
        $.DT = @.Listargs.shift();
        $.Class_Name = @.Listargs.shift();
        my Str $Name_Text = $.Class_Name.Get_Input();
        $.Property_Name = $Name_Text;
        $.Method_Name = "Infer_$Name_Text";
        # "we need to know the header before generation begins\."
        my Str $Header = "method flag " ~ $.Method_Name;
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Header ~= " " ~ $Argument.Get_Input();
        }
        $.Method_Signature = $Header;
    }
    method Fallback_Generate()
    {
        my Str $Cname = $.Class_Name.Fallback;
        my Str $Block = $.Block.Fallback_Statements;
        my Str $Code = "class Inference_$Cname \[is Inference\]\n\{\n    method flag Infer\n    \{\n        returnif \(not \(\. \[my Owner\] Infer_$Cname\)\) \[false\];\n        return \[true\];\n    \}\n\}\n$Block";
        $.Fallback = $Code;
    }
    method Inference_Context()
    {
        return self;
    }
} 
# "Additions\.gal"
class Syntax_My is Syntax
{
    our $.Aliases = " self i me this ";
    our $.Gal_Keyword = "my";
    has Bool $.Has_Arguments is rw = False;
    method Attributes()
    {
        # "look up the first argument in the parent context to know that it is a list\."
        $.Has_Arguments = (@.Listargs.elems) > 0;
        if $.Has_Arguments
        {
            my $Argument = @.Listargs.shift();
            # TODO: this must be a token
            if !(($Argument ~~ Token))
            {
                die self.Failure_Message("Property name must be a token");
            }
            my Str $Property = $Argument.Input;
            my $Definition = self.Lookup($Property);
            return if !$Definition;
            my Str $Data_Type = $Definition.Data_Type;
            return if !$Data_Type;
            $Argument.Data_Type = $Data_Type;
            $.Data_Type = $Data_Type;
        }
    }
    method Fallback_Generate()
    {
        my $Argument;
        if $.Has_Arguments
        {
            my Str $Gal_Code = "\[\. \[self\]";
            for @.Arguments -> $Argument
            {
                $Gal_Code ~= " " ~ $Argument.Fallback;
            }
            $Gal_Code ~= "\]";
            $.Fallback = $Gal_Code;
        }
        else 
        {
            $.Fallback = "\[self\]";
        }
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "this";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        # $debug
        $.Python = "self";
    }
} 
class Operation_Begins is Operation
{
    our $.Gal_Keyword = "begins";
    has $.Begin_Value is rw;
    has $.String_Value is rw;
    method Attributes()
    {
        $.String_Value = @.Listargs.shift();
        $.Begin_Value = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.String_Value.Javascript ~ "\.substr\(0," ~ $.Begin_Value.Javascript ~ "\.length\) == " ~ $.Begin_Value.Javascript;
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.String_Value.Python ~ "\[:len\(" ~ $.Begin_Value.Python ~ "\)\] == " ~ $.Begin_Value.Python;
        $.Python = $Python_Code;
    }
} 
class Operation_Firstchar is Unary_Operation
{
    our $.Gal_Keyword = "firstchar";
    has $.String_Value is rw;
    method Attributes()
    {
        $.String_Value = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.String_Value.Javascript ~ "\.charAt\(0\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.String_Value.Python ~ "\[0\]";
        $.Python = $Python_Code;
    }
} 
class Operation_Lastchar is Unary_Operation
{
    our $.Gal_Keyword = "lastchar";
    has $.String_Value is rw;
    method Attributes()
    {
        $.String_Value = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.String_Value.Javascript ~ "\.charAt\(" ~ $.String_Value.Javascript ~ "\.length-1\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.String_Value.Python ~ "\[-1\]";
        $.Python = $Python_Code;
    }
} 
class Operation_I is Invocation_Operation
{
    our $.Aliases = " self me this ";
    our $.Gal_Keyword = "i";
    has $.Method is rw;
    method Attributes()
    {
        $.Method = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(\. \[self\]" ~ self.Fallback_Arguments() ~ "\)";
        $.Fallback = $Gal_Code;
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "this\." ~ $.Method.Javascript ~ "\(" ~ self.Javascript_Args(",") ~ "\)";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "self\." ~ $.Method.Python ~ "\(" ~ self.Python_Args(",") ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Operation_Key_Get is Operation
{
    our $.Gal_Keyword = "key\.get";
    has $.Dictionary is rw;
    has $.Key is rw;
    method Attributes()
    {
        $.Dictionary = @.Listargs.shift();
        $.Key = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\[key " ~ $.Dictionary.Fallback ~ " " ~ $.Key.Fallback ~ "\]";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_I is Invocation_Statement
{
    our $.Aliases = " self this me my ";
    our $.Gal_Keyword = "i";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\. \[self\]" ~ self.Fallback_Arguments() ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_We is Invocation_Statement
{
    our $.Aliases = " us ";
    our $.Gal_Keyword = "we";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\. \[class\]" ~ self.Fallback_Arguments() ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Myclass is Invocation_Statement
{
    our $.Aliases = " my\.class ";
    our $.Gal_Keyword = "myclass";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\. \[my\.class\]" ~ self.Fallback_Arguments() ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Entity_New is Declare_Statement
{
    our $.Gal_Keyword = "entity\.new";
    has $.Class is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.Class = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my $Argument;
        my Str $Gal_Code = "entity " ~ $.Variable.Fallback ~ " \(new " ~ $.Class.Fallback;
        for @.Listargs -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Fallback;
        }
        $Gal_Code ~= "\);";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Entity_My_Class is Declare_Statement
{
    our $.Gal_Keyword = "entity\.my\.class";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my $Argument;
        my Str $Gal_Code = "entity " ~ $.Variable.Fallback ~ " \(new \[my\.class\]";
        for @.Listargs -> $Argument
        {
            $Gal_Code ~= " " ~ $Argument.Fallback;
        }
        $Gal_Code ~= "\);";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Contif is Line_Statement
{
    our $.Aliases = " contif ";
    our $.Gal_Keyword = "continue\.if";
    has $.Condition is rw;
    method Attributes()
    {
        $.Condition = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "if " ~ $.Condition.Fallback ~ "\n\{\n    continue;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Breakif is Line_Statement
{
    our $.Aliases = " breakif ";
    our $.Gal_Keyword = "break\.if";
    has $.Condition is rw;
    method Attributes()
    {
        $.Condition = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "if " ~ $.Condition.Fallback ~ "\n\{\n    break;\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Alias is Line_Statement
{
    our $.Gal_Keyword = "alias";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Code = "class\.property string Aliases \"";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Code ~= " " ~ $Argument.Fallback;
        }
        $Code ~= " \";";
        $.Fallback = $Code;
    }
} 
class Operation_Dictionary_Default is Operation
{
    our $.Gal_Keyword = "dict\.default";
    has $.Default is rw;
    has $.Dictionary is rw;
    has $.Key is rw;
    method Attributes()
    {
        $.Dictionary = @.Listargs.shift();
        $.Key = @.Listargs.shift();
        $.Default = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(\. \[: Runtime\] Dict_Default " ~ $.Dictionary.Fallback ~ " " ~ $.Key.Fallback ~ " " ~ $.Default.Fallback ~ "\)";
        $.Fallback = $Gal_Code;
    }
} 
class Operation_Dictionary_Defined is Operation
{
    our $.Gal_Keyword = "dict\.defined";
    has $.Dictionary is rw;
    has $.Key is rw;
    method Attributes()
    {
        $.Dictionary = @.Listargs.shift();
        $.Key = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(\. \[: Runtime\] Dict_Defined " ~ $.Dictionary.Fallback ~ " " ~ $.Key.Fallback ~ " " ~ $.Default.Fallback ~ "\)";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Entities is Line_Statement
{
    our $.Gal_Keyword = "entities";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "";
        my Str $Between = "";
        my Str $Keyword = "entities";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= $Between ~ $Keyword ~ " " ~ $Argument.Fallback ~ ";";
            $Between = "\n";
        }
        $.Fallback = $Gal_Code;
    }
} 
class Statement_My_Equal is Assign_Statement
{
    our $.Aliases = " self\.= i\.= ";
    our $.Gal_Keyword = "my=";
    has $.Property is rw;
    has $.Value is rw;
    method Attributes()
    {
        $.Property = @.Listargs.shift();
        $.Value = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\.= \[self\] " ~ $.Property.Fallback ~ " " ~ $.Value.Fallback ~ ";";
        $.Fallback = $Gal_Code;
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "this\." ~ $.Property.Javascript ~ " = " ~ $.Value.Javascript ~ ";\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "self\." ~ $.Property.Python ~ " = " ~ $.Value.Python ~ "\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Integers is Line_Statement
{
    our $.Gal_Keyword = "integers";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "";
        my Str $Between = "";
        my Str $Keyword = "integer";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= $Between ~ $Keyword ~ " " ~ $Argument.Fallback ~ ";";
            $Between = "\n";
        }
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Numbers is Line_Statement
{
    our $.Gal_Keyword = "numbers";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "";
        my Str $Between = "";
        my Str $Keyword = "number";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= $Between ~ $Keyword ~ " " ~ $Argument.Fallback ~ ";";
            $Between = "\n";
        }
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Strings is Line_Statement
{
    our $.Gal_Keyword = "strings";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "";
        my Str $Between = "";
        my Str $Keyword = "string";
        my $Argument;
        for @.Arguments -> $Argument
        {
            $Gal_Code ~= $Between ~ $Keyword ~ " " ~ $Argument.Fallback ~ ";";
            $Between = "\n";
        }
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Return_If is Line_Statement
{
    our $.Aliases = " return\.if ";
    our $.Gal_Keyword = "returnif";
    has $.Condition is rw;
    has $.Return_Value is rw;
    method Attributes()
    {
        $.Condition = @.Listargs.shift();
        $.Condition.Usage = "value";
        if (@.Listargs.elems) > 0
        {
            $.Return_Value = @.Listargs.shift();
            $.Return_Value.Usage = "value";
        }
    }
    method Fallback_Generate()
    {
        my Str $Code = "if " ~ $.Condition.Fallback ~ "\n\{\n    return";
        if defined($.Return_Value)
        {
            $Code ~= " " ~ $.Return_Value.Fallback;
        }
        $Code ~= ";\n\}\n";
        $.Fallback = $Code;
    }
} 
class Statement_Ifdef is Scoped_Statement
{
    our $.Gal_Keyword = "ifdef";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Ifargs = "";
        my Str $Between = "";
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Ifargs ~= $Between ~ $Argument.Javascript ~ "!= null";
            $Between = " && ";
        }
        my Str $Block = self.Javascript_Block();
        my Str $Code = "if \($Ifargs\)$Block";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Ifargs = "";
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Ifargs ~= "ifdef = " ~ $Argument.Python ~ "\n";
        }
        $Ifargs = self.Indent($Ifargs);
        my Str $Block = self.Python_Statements();
        my Str $Code = "try:\n$Ifargs$Block";
        $Code ~= "except ValueError:\n    pass\n";
        $.Python = $Code;
    }
} 
class Statement_Undef is Scoped_Statement
{
    our $.Gal_Keyword = "undef";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Ifargs = "";
        my Str $Between = "";
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Ifargs ~= $Between ~ $Argument.Javascript ~ " == null";
            $Between = " || ";
        }
        my Str $Block = self.Javascript_Block();
        my Str $Code = "if \($Ifargs\)$Block";
        $.Javascript = $Code;
    }
    method Python_Generate()
    {
        my Str $Ifargs = "";
        my $Argument;
        for @.Listargs -> $Argument
        {
            $Ifargs ~= "undef = " ~ $Argument.Python ~ "\n";
        }
        $Ifargs = self.Indent($Ifargs);
        my Str $Block = self.Python_Block();
        my Str $Code = "try:\n$Ifargs";
        $Code ~= "except \(ValueError, AttributeError\)$Block";
        $.Python = $Code;
    }
} 
class Statement_New is Line_Statement
{
    our $.Gal_Keyword = "new";
    has $.Class is rw;
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
        $.Class = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Variable.Javascript ~ " = new " ~ $.Class.Javascript ~ "\(" ~ self.Javascript_Args(", ") ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Variable.Python ~ " = " ~ $.Class.Python ~ "\(" ~ self.Python_Args(", ") ~ "\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Verbose is Line_Statement
{
    our $.Gal_Keyword = "verbose";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "if Verbose \{ writeline" ~ self.Fallback_Arguments() ~ "; \}";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Verbosity is Line_Statement
{
    our $.Gal_Keyword = "verbosity";
    has $.Setting is rw;
    method Attributes()
    {
        if (@.Listargs.elems) > 0
        {
            $.Setting = @.Listargs.shift();
        }
    }
    method Fallback_Generate()
    {
        my Str $Setting = "\[false\]";
        if defined($.Setting)
        {
            $Setting = $.Setting.Fallback;
        }
        my Str $Code = "flag Verbose $Setting;";
        $.Fallback = $Code;
    }
} 
class Statement_Todo is Comment_Statement
{
    our $.Gal_Keyword = "todo";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment \"TODO:\" " ~ self.Enquote(self.Argument_String()) ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Flowerbox is Comment_Statement
{
    our $.Gal_Keyword = "flowerbox";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment \"**** \" " ~ self.Enquote(self.Argument_String()) ~ "\" ****\";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Question is Comment_Statement
{
    our $.Gal_Keyword = "question";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment \"QUESTION:\" " ~ self.Enquote(self.Argument_String()) ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Answer is Comment_Statement
{
    our $.Gal_Keyword = "question";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment \"ANSWER:\" " ~ self.Enquote(self.Argument_String()) ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Write_Line is Append_Args_Statement
{
    our $.Gal_Keyword = "writeline";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "console\.log\(" ~ self.Javascript_Args(", ") ~ "\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Mumps_Generate()
    {
        my Str $Mumps_Code = " write " ~ self.Mumps_Args(",") ~ ",!";
        $.Mumps = $Mumps_Code;
    }
    method Python_Generate()
    {
        my Str $Code = "print\(" ~ self.Python_Args(", ");
        if (@.Listargs.elems) > 1
        {
            $Code ~= ", sep=''";
        }
        $Code ~= "\)\n";
        $.Python = $Code;
    }
} 
class Operation_M_Atom is Invocation_Operation
{
    our $.Gal_Keyword = "m\.atom";
    has $.Element is rw;
    method Attributes()
    {
        $.Element = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(\. " ~ $.Element.Fallback ~ " M_Atom\)";
        $.Fallback = $Gal_Code;
    }
} 
class Operation_M_Expr is Invocation_Operation
{
    our $.Gal_Keyword = "m\.expr";
    has $.Element is rw;
    method Attributes()
    {
        $.Element = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(\. " ~ $.Element.Fallback ~ " M_Expr\)";
        $.Fallback = $Gal_Code;
    }
} 
class Operation_Mumps is Invocation_Operation
{
    our $.Gal_Keyword = "mumps";
    has $.Element is rw;
    method Attributes()
    {
        $.Element = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(\. " ~ $.Element.Fallback ~ " Mumps\)";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_M_Atom is Invocation_Statement
{
    our $.Gal_Keyword = "m\.atom";
    has $.Element is rw;
    has $.Value is rw;
    method Attributes()
    {
        $.Element = @.Listargs.shift();
        $.Value = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\.= " ~ $.Element.Fallback ~ " M_Atom " ~ $.Value.Fallback ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_M_Expr is Invocation_Statement
{
    our $.Gal_Keyword = "m\.expr";
    has $.Element is rw;
    has $.Value is rw;
    method Attributes()
    {
        $.Element = @.Listargs.shift();
        $.Value = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\.= " ~ $.Element.Fallback ~ " M_Expr " ~ $.Value.Fallback ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_M is Invocation_Statement
{
    our $.Gal_Keyword = "m";
    has $.Element is rw;
    has $.Value is rw;
    method Attributes()
    {
        $.Element = @.Listargs.shift();
        $.Value = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\.= " ~ $.Element.Fallback ~ " Mumps " ~ $.Value.Fallback ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Unless is If_Statement
{
    our $.Gal_Keyword = "unless";
    has $.Condition is rw;
    method Attributes()
    {
        $.Condition = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "if \(not " ~ $.Condition.Fallback ~ "\)" ~ self.Fallback_Block();
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Parser is Class_Statement
{
    our $.Gal_Keyword = "parser";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "class " ~ $.Class_Name.Fallback ~ "_Parser \[is Parser\]" ~ self.Fallback_Args() ~ self.Fallback_Block();
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Sequence is Method_Statement
{
    our $.Gal_Keyword = "sequence";
    has $.Rule_Name is rw;
    method Attributes()
    {
        $.Rule_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Body = "comment \"sequence " ~ $.Rule_Name.Fallback ~ "\";\ninteger Start \[my Position\];\nlist My_Elements;\n";
        my $Argument;
        for @.Listargs -> $Argument
        {
            if (($Argument ~~ Quote)) || (($Argument ~~ Syntax_Line))
            {
                my Str $Text = $Argument.Fallback;
                $Body ~= "if \(not \(i Parse_Token My_Elements $Text\)\) \{ i Rollback Start \(append \"" ~ $.Rule_Name.Fallback ~ " expected \"$Text\"\.\"\); return \[false\]; \}\n";
            }
            elsif ($Argument ~~ Token)
            {
                my Str $Name = $Argument.Fallback;
                $Body ~= "= Last Start;\nif \(not \(\. \[self\] Parse_$Name My_Elements\)\) \{\n    i Rollback Start \"Sequence " ~ $.Rule_Name.Fallback ~ " expected $Name\.\";\n    return \[false\];\n\}\n";
            }
            else 
            {
                $Body ~= $Argument.Fallback;
            }
        }
        $Body ~= "integer End \[my Position\];\nentity Element \(new " ~ $.Rule_Name.Fallback ~ "\);\n\.= Element Start_Position Start;\n\.= Element End_Position End;\n\.= Element Document \[self\];\n\.= Element Elements My_Elements;\ni Add_Element Element;\nlist\.append Parent_Elements Element;\nreturn \[true\];\n";
        $Body = self.Indent($Body);
        my Str $Code = "method flag Parse_" ~ $.Rule_Name.Fallback ~ " \[list Parent_Elements\]\n\{\n$Body\}";
        $.Fallback = $Code;
    }
} 
class Statement_Either is Method_Statement
{
    our $.Gal_Keyword = "either";
    has $.Rule_Name is rw;
    method Attributes()
    {
        $.Rule_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Body = "comment \"either " ~ $.Rule_Name.Fallback ~ "\";\n";
        my $Argument;
        for @.Listargs -> $Argument
        {
            if ($Argument ~~ Token)
            {
                $Body ~= "returnif \(\. \[self\] Parse_" ~ $Argument.Fallback ~ " Parent_Elements\) \[true\];\n";
            }
            else 
            {
                $Body ~= $Argument.Fallback;
            }
        }
        $Body = self.Indent($Body);
        my Str $Code = "method flag Parse_" ~ $.Rule_Name.Fallback ~ " \[list Parent_Elements\]\n\{\n$Body    return \[false\];\n\}";
        $.Fallback = $Code;
    }
} 
class Statement_Token is Method_Statement
{
    our $.Gal_Keyword = "token";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Name = $.Class_Name.Fallback;
        my Str $Code = "method flag Parse_$Name \[list Parent_Elements\]\n\{\n    entity Top_Token \(\. \[self\] Top_Token\);\n    returnif \(not \(isa Top_Token $Name\)\) \[false\];\n    list\.append Parent_Elements Top_Token;\n    i Consume_Token;\n    return \[true\];\n\}";
        $.Fallback = $Code;
    }
} 
class Statement_Tokens is Method_Statement
{
    our $.Gal_Keyword = "tokens";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Code = "";
        my $Argument;
        my Str $Between = "";
        for @.Arguments -> $Argument
        {
            my Str $Name = $Argument.Fallback;
            $Code ~= $Between ~ "method flag Parse_$Name \[list Parent_Elements\]\n\{\n    entity Top_Token \(\. \[self\] Top_Token\);\n    returnif \(not \(isa Top_Token $Name\)\) \[false\];\n    list\.append Parent_Elements Top_Token;\n    i Consume_Token;\n    return \[true\];\n\}";
            $Between = "\n";
        }
        $.Fallback = $Code;
    }
} 
class Syntax_Repeating is Syntax
{
    our $.Aliases = " required\.repeating ";
    our $.Gal_Keyword = "repeating";
    has $.Rule is rw;
    method Attributes()
    {
        $.Rule = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment \"repeating " ~ $.Rule.Fallback ~ "\";\nif \(not \(\. \[self\] Parse_" ~ $.Rule.Fallback ~ " My_Elements\)\)\n\{\n    i Rollback Start \"Required at least one " ~ $.Rule.Fallback ~ "\.\" ;\n    return \[false\];\n\}\nforever\n\{\n    breakif \(not \(\. \[self\] Parse_" ~ $.Rule.Fallback ~ " My_Elements\)\);\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Syntax_Optional is Syntax
{
    our $.Gal_Keyword = "optional";
    has $.Rule is rw;
    method Attributes()
    {
        $.Rule = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment \"optional " ~ $.Rule.Fallback ~ "\";\ni Parse_" ~ $.Rule.Fallback ~ "  My_Elements;";
        $.Fallback = $Gal_Code;
    }
} 
class Syntax_Optrep is Syntax
{
    our $.Aliases = " optional\.repeating ";
    our $.Gal_Keyword = "optrep";
    has $.Rule is rw;
    method Attributes()
    {
        $.Rule = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment \"optional\.repeating " ~ $.Rule.Fallback ~ "\";\nforever\n\{\n    breakif \(not \(\. \[self\] Parse_" ~ $.Rule.Fallback ~ " My_Elements\)\);\n\}\n";
        $.Fallback = $Gal_Code;
    }
} 
class Syntax_Exclude is Syntax
{
    our $.Aliases = " except ";
    our $.Gal_Keyword = "exclude";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Code = "comment \"\[exclude " ~ self.Fallback_Args() ~ "\]\";\nlist Excluded;\n";
        my $Argument;
        for @.Arguments -> $Argument
        {
            # "rule name tokens are required, right?"
            $Code ~= "if \(\. \[self\] Parse_" ~ $Argument.Fallback ~ " Excluded\)\n\{\n    i Rollback Start \"Excluded " ~ $Argument.Fallback ~ " encountered\.\";\n    return \[false\];\n\}\n";
        }
        $.Fallback = $Code;
    }
} 
class Statement_Task is Statement
{
    our $.Gal_Keyword = "task";
    has $.Task_Id is rw;
    method Attributes()
    {
        $.Task_Id = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Task_Id = $.Task_Id.Fallback;
        my Str $Code = "entity Task_$Task_Id \(new Task\);\n";
        my $Argument;
        my Bool $Odd = True;
        my Str $Property;
        my Str $Value;
        for @.Listargs -> $Argument
        {
            if ($Argument ~~ Token_Comma)
            {
                $Odd = True;
                next;
            }
            # TODO: do this with keyvalues instead?
            if $Odd
            {
                $Property = self.Pascal_Case($Argument.Fallback);
            }
            else 
            {
                $Value = $Argument.Fallback;
                $Code ~= "\.= Task_$Task_Id $Property $Value;\n";
            }
            $Odd = !$Odd;
        }
        $.Fallback = $Code;
    }
} 
class Statement_Subtask is Statement
{
    our $.Gal_Keyword = "subtask";
    has $.Headline is rw;
    method Attributes()
    {
        $.Headline = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Variable = $.Parent.Variable;
        my Str $Code = "\. $Variable Add_Subtask " ~ $.Headline.Fallback ~ ";";
        $.Fallback = $Code;
    }
} 
class Statement_Book_Gal is Statement
{
    our $.Gal_Keyword = "book\.gal";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Code = "my= Gal";
        my $Argument;
        for @.Arguments -> $Argument
        {
            if ($Argument ~~ Token_Name)
            {
                $Code ~= " \[my " ~ $Argument.Fallback ~ " Fallback\]";
            }
            else 
            {
                $Code ~= " " ~ $Argument.Fallback;
            }
        }
        if (@.Arguments.elems) > 1
        {
            $Code = "\(append $Code\)";
        }
        $Code ~= ";";
        $.Fallback = $Code;
    }
} 
class Statement_Book_Fallback is Statement
{
    our $.Gal_Keyword = "book\.fallback";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Code = "my= Fallback";
        my $Argument;
        for @.Arguments -> $Argument
        {
            if ($Argument ~~ Token_Name)
            {
                $Code ~= " \[my " ~ $Argument.Fallback ~ " Fallback\]";
            }
            else 
            {
                $Code ~= " " ~ $Argument.Fallback;
            }
        }
        if (@.Arguments.elems) > 1
        {
            $Code = "\(append $Code\)";
        }
        $Code ~= ";";
        $.Fallback = $Code;
    }
} 
class Statement_Book_Raku is Statement
{
    our $.Gal_Keyword = "book\.raku";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Code = "my= Raku";
        my $Argument;
        for @.Arguments -> $Argument
        {
            if ($Argument ~~ Token_Name)
            {
                $Code ~= " \[my " ~ $Argument.Fallback ~ " Fallback\]";
            }
            else 
            {
                $Code ~= " " ~ $Argument.Fallback;
            }
        }
        if (@.Arguments.elems) > 1
        {
            $Code = "\(append $Code\)";
        }
        $Code ~= ";";
        $.Fallback = $Code;
    }
} 
class Statement_Book_Python is Statement
{
    our $.Gal_Keyword = "book\.python";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Code = "my= Python";
        my $Argument;
        for @.Arguments -> $Argument
        {
            if ($Argument ~~ Token_Name)
            {
                $Code ~= " \[my " ~ $Argument.Fallback ~ " Fallback\]";
            }
            else 
            {
                $Code ~= " " ~ $Argument.Fallback;
            }
        }
        if (@.Arguments.elems) > 1
        {
            $Code = "\(append $Code\)";
        }
        $Code ~= ";";
        $.Fallback = $Code;
    }
} 
class Statement_Book_Javascript is Statement
{
    our $.Gal_Keyword = "book\.javascript";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Code = "my= Javascript";
        my $Argument;
        for @.Arguments -> $Argument
        {
            if ($Argument ~~ Token_Name)
            {
                $Code ~= " \[my " ~ $Argument.Fallback ~ " Fallback\]";
            }
            else 
            {
                $Code ~= " " ~ $Argument.Fallback;
            }
        }
        if (@.Arguments.elems) > 1
        {
            $Code = "\(append $Code\)";
        }
        $Code ~= ";";
        $.Fallback = $Code;
    }
} 
class Statement_Book is Statement
{
    our $.Gal_Keyword = "book";
    method Attributes()
    {
    }
} 
class Statement_Chapter is Statement
{
    our $.Aliases = " chap ";
    our $.Gal_Keyword = "chapter";
    method Attributes()
    {
    }
} 
class Statement_Section is Statement
{
    our $.Gal_Keyword = "section";
    method Attributes()
    {
    }
} 
class Statement_Overview is Statement
{
    our $.Gal_Keyword = "overview";
    method Attributes()
    {
    }
} 
class Statement_Expository is Statement
{
    our $.Aliases = " exposition expo ";
    our $.Gal_Keyword = "expository";
    method Attributes()
    {
    }
} 
class Statement_Paragraph is Statement
{
    our $.Aliases = " p ";
    our $.Gal_Keyword = "paragraph";
    method Attributes()
    {
    }
} 
class Statement_Shell is Statement
{
    our $.Aliases = " linux ";
    our $.Gal_Keyword = "shell";
    method Attributes()
    {
    }
} 
class Statement_Summary is Statement
{
    our $.Gal_Keyword = "summary";
    method Attributes()
    {
    }
} 
class Statement_Title is Statement
{
    our $.Gal_Keyword = "title";
    method Attributes()
    {
    }
} 
class Statement_Description is Statement
{
    our $.Aliases = " desc ";
    our $.Gal_Keyword = "description";
    method Attributes()
    {
    }
} 
class Statement_Codefile is Statement
{
    our $.Aliases = " code ";
    our $.Gal_Keyword = "codefile";
    has $.Equal is rw;
    method Attributes()
    {
        $.Equal = @.Listargs.shift();
    }
    method Python_Generate()
    {
        my Str $Python_Code = "Code = " ~ self.Python_Args(" + ") ~ "\n";
        $.Python = $Python_Code;
    }
} 
class Syntax_Italic is Syntax
{
    our $.Gal_Keyword = "italic";
    method Attributes()
    {
    }
} 
class Statement_Definition is Comment_Statement
{
    our $.Gal_Keyword = "definition";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment \"DEFINITION: \"" ~ self.Fallback_Args() ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Token_Mode is Line_Statement
{
    our $.Gal_Keyword = "tokenmode";
    has $.Mode_Name is rw;
    method Attributes()
    {
        $.Mode_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "= Mode " ~ self.Enquote($.Mode_Name.Fallback) ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Operation_Token_Mode is Operation
{
    our $.Gal_Keyword = "tokenmode";
    has $.Mode_Name is rw;
    method Attributes()
    {
        $.Mode_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(s= Mode " ~ self.Enquote($.Mode_Name.Fallback) ~ "\)";
        $.Fallback = $Gal_Code;
    }
} 
class Operation_Is_Ident is Operation
{
    our $.Gal_Keyword = "isident";
    has $.Character is rw;
    method Attributes()
    {
        $.Character = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(or \(isalpha " ~ $.Character.Fallback ~ "\) \(contains \"0123456789_\" " ~ $.Character.Fallback ~ "\)\)";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Token_Append is Line_Statement
{
    our $.Gal_Keyword = "token\.append";
    has $.Character is rw;
    has $.Position is rw;
    has $.Token_Entity is rw;
    method Attributes()
    {
        $.Token_Entity = @.Listargs.shift();
        $.Character = @.Listargs.shift();
        $.Position = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "append \[\. " ~ $.Token_Entity.Fallback ~ " Input\] " ~ $.Character.Fallback ~ ";\n= \[\. " ~ $.Token_Entity.Fallback ~ " Location End_Position\] " ~ $.Position.Fallback ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_New_Token is Line_Statement
{
    our $.Gal_Keyword = "newtoken";
    has $.Character is rw;
    has $.Class is rw;
    has $.End is rw;
    has $.Mode is rw;
    has $.Start is rw;
    has $.Token_Entity is rw;
    method Attributes()
    {
        $.Token_Entity = @.Listargs.shift();
        $.Class = @.Listargs.shift();
        $.Mode = @.Listargs.shift();
        $.Character = @.Listargs.shift();
        $.Start = @.Listargs.shift();
        $.End = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "= " ~ $.Token_Entity.Fallback ~ " \(new Token_" ~ $.Class.Fallback ~ " \[self\] " ~ $.Character.Fallback ~ " " ~ $.Start.Fallback ~ " " ~ $.End.Fallback ~ "\);\nlist\.append \[my Tokens Symbol_Value\] " ~ $.Token_Entity.Fallback ~ ";\n= Mode " ~ self.Enquote($.Mode.Fallback) ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Skip_Token is Line_Statement
{
    our $.Gal_Keyword = "skiptoken";
    has $.Character is rw;
    has $.Class is rw;
    has $.End is rw;
    has $.Mode is rw;
    has $.Start is rw;
    has $.Token_Entity is rw;
    method Attributes()
    {
        $.Token_Entity = @.Listargs.shift();
        $.Class = @.Listargs.shift();
        $.Mode = @.Listargs.shift();
        $.Character = @.Listargs.shift();
        $.Start = @.Listargs.shift();
        $.End = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "= " ~ $.Token_Entity.Fallback ~ " \(new Token_" ~ $.Class.Fallback ~ " \[self\] " ~ $.Character.Fallback ~ " " ~ $.Start.Fallback ~ " " ~ $.End.Fallback ~ "\);\ncomment `" ~ $.Class.Fallback ~ " tokens are not appended to the token list\.`\n= Mode " ~ self.Enquote($.Mode.Fallback) ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Generate is Method_Statement
{
    our $.Gal_Keyword = "generate";
    has $.Class_Name is rw;
    has $.Method_Context is rw;
    has $.Method_Name is rw;
    has Str $.Method_Signature is rw;
    has Str $.Property_Name is rw;
    has $.Variable_Context is rw;
    has $.Verb_Owner is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my $Context = self.Inference_Context();
        my Str $Property_Name = $Context.Property_Name;
        my Str $Header = $.Parent.Method_Signature;
        my Str $Append_To = $.Class_Name.Fallback;
        my Str $Args_Code = "";
        my $Argument;
        for @.Listargs -> $Argument
        {
            if ($Argument ~~ Token_Name)
            {
                $Args_Code ~= " \[\. \[self\] " ~ $Argument.Fallback ~ " $Property_Name\]";
            }
            else 
            {
                $Args_Code ~= " " ~ $Argument.Fallback;
            }
        }
        if $Args_Code gt "          "
        {
            $Args_Code = "string Gen $Args_Code;\n\.= \[self\] $Property_Name Gen;\n";
            $Args_Code = self.Indent($Args_Code);
        }
        my Str $Statements = "";
        if (defined($.Block.Fallback_Statements)) && ($.Block.Fallback_Statements gt "")
        {
            $Statements = $.Block.Fallback_Statements;
        }
        my Str $Method_Code = $Header ~ "\n\{\n$Statements$Args_Code    return \[true\];\n\}\n";
        $Method_Code = self.Indent($Method_Code);
        my Str $Code = "class\.append $Append_To\n\{\n$Method_Code\}";
        $.Fallback = $Code;
    }
} 
class Statement_I_Equal is Assign_Statement
{
    our $.Aliases = " self= ";
    our $.Gal_Keyword = "i=";
    has $.Certainty is rw;
    has $.Value is rw;
    method Attributes()
    {
        $.Value = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Certainty = @.Listargs.shift();
        }
    }
    method Fallback_Generate()
    {
        my $Context = self.Inference_Context();
        my Str $Property_Name = $Context.Property_Name;
        # $writeline "Property Name " $Property_Name
        my Str $Code = "my= $Property_Name " ~ $.Value.Fallback ~ ";";
        # $append $Code " " "writeline \"properrty " $Property_Name ": <\" \[my " $Property_Name "\] \">\";"
        $.Fallback = $Code;
    }
} 
class Statement_Arguments is Scoped_Statement
{
    our $.Gal_Keyword = "arguments";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "method void Process_Arguments" ~ self.Fallback_Block();
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Symbol is Class_Statement
{
    our $.Gal_Keyword = "symbol";
    has $.Class_Name is rw;
    has Str $.Property_Name is rw;
    has $.Value_Type is rw;
    method Attributes()
    {
        $.Value_Type = @.Listargs.shift();
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Class_Name = $.Class_Name.Fallback;
        my Str $Statements = "";
        if (defined($.Block.Fallback_Statements)) && ($.Block.Fallback_Statements gt "")
        {
            $Statements = $.Block.Fallback_Statements;
        }
        my Str $Ancestor_Name = "Symbol";
        my Str $Type = $.Value_Type.Fallback;
        my Str $Body = "\{\n    property entity Symbol_Object;\n    property $Type Symbol_Value;\n    constructor \[entity Object\]\n    \{\n        my= Symbol_Object Object;\n    \}\n$Statements\}";
        my Str $Code = "class $Class_Name \[is $Ancestor_Name\]$Body";
        $.Fallback = $Code;
    }
    method Process_Arguments()
    {
        $.Property_Name = $.Class_Name.Input;
    }
} 
class Statement_Contest is Class_Statement
{
    our $.Gal_Keyword = "contest";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Class_Name = "Contest_" ~ $.Class_Name.Fallback;
        my Str $Statements = "";
        if (defined($.Block.Fallback_Statements)) && ($.Block.Fallback_Statements gt "")
        {
            $Statements = $.Block.Fallback_Statements;
        }
        my Str $Ancestor_Name = "Contest";
        my Str $Body = "\{\n    attribute number Score;\n    attribute entity Winner;\n$Statements\}";
        my Str $Code = "class $Class_Name \[is $Ancestor_Name\]$Body";
        $.Fallback = $Code;
    }
} 
class Statement_Currency is Class_Statement
{
    our $.Gal_Keyword = "currency";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Class_Name = "Currency_" ~ $.Class_Name.Fallback;
        my Str $Statements = "";
        if (defined($.Block.Fallback_Statements)) && ($.Block.Fallback_Statements gt "")
        {
            $Statements = $.Block.Fallback_Statements;
        }
        my Str $Ancestor_Name = "Currency";
        my Str $Body = "\{\n    class\.attribute list Instances;\n    attribute number Amount;\n    attribute entity Owner;\n    constructor\n    \{\n        list\.append \[\. \[my\.class\] Instances\] \[self\];\n        \n    \}\n$Statements\}";
        my Str $Code = "class $Class_Name \[is $Ancestor_Name\]$Body";
        $.Fallback = $Code;
    }
} 
class Statement_Principle is Scoped_Statement
{
    our $.Gal_Keyword = "principle";
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
    }
    method Gal_Generate()
    {
        my Str $Body_Code = "";
        my Str $Class_Code = "";
        my $Statement;
        for $.Block.Statements -> $Statement
        {
            if ($Statement ~~ Class_Statement)
            {
                $Class_Code ~= $Statement.Gal ~ "\n";
            }
            else 
            {
                $Body_Code ~= $Statement.Gal ~ "\n";
            }
        }
        # "separation due to apparent bug in bootstrap compiler\."
        my Str $Code = "\nclass Principle_" ~ $.Name.Gal ~ "\n\{\n";
        $Code ~= $Body_Code ~ "\}\n\n";
        $Code ~= $Class_Code ~ "\n";
        $Code ~= "comment \"Principle " ~ $.Name.Gal ~ " ends\.\";\n\n";
        $.Gal_Statements = $Code;
        $.Gal = $Code;
    }
} 
class Statement_English is Line_Statement
{
    our $.Gal_Keyword = "english";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Args = self.Fallback_Arguments();
        if (@.Arguments.elems) > 1
        {
            $Args = "\(append $Args\)";
        }
        my Str $Code = "class\.property string English $Args;";
        $.Fallback = "";
        $.Fallback_Declaration = $Code;
    }
} 
class Statement_Require_That is Line_Statement
{
    our $.Gal_Keyword = "require\.that";
    has $.Condition is rw;
    method Attributes()
    {
        $.Condition = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "returnif \(not " ~ $.Condition.Fallback ~ "\) \[false\];";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Require_That_I is Line_Statement
{
    our $.Gal_Keyword = "require\.that\.i";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "returnif \(not \(i " ~ self.Fallback_Arguments() ~ "\)\) \[false\];";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Dialect is Scoped_Statement
{
    our $.Gal_Keyword = "dialect";
    has $.English is rw;
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
        $.Name.Usage = "string";
        if (@.Listargs.elems) > 0
        {
            $.English = @.Listargs.shift();
            $.English.Usage = "string";
        }
    }
    method Fallback_Generate()
    {
        my Str $Name = $.Name.Fallback;
        my Str $Body = "";
        my Str $Fback = "";
        if defined($.English)
        {
            $Body ~= "property string English " ~ $.English.Fallback ~ ";\n";
        }
        my $Statement;
        for $.Block.Statements -> $Statement
        {
            if defined($Statement.Fallback_Declaration)
            {
                $Body ~= $Statement.Fallback_Declaration ~ "\n";
            }
            if defined($Statement.Fallback)
            {
                $Fback ~= $Statement.Fallback ~ "\n";
            }
        }
        my Str $Method = "method flag Initialize\n\{\n" ~ self.Indent($Fback) ~ "\n    return \[true\];\n\}";
        $Body = self.Indent($Body);
        $Method = self.Indent($Method);
        my Str $Code = "class Dialect_$Name \[is Dialect\]\n\{\n" ~ self.Indent($Method) ~ self.Indent($Body) ~ "\}\n";
        $.Fallback = $Code;
    }
} 
class Statement_Statements is Line_Statement
{
    our $.Gal_Keyword = "statements";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my $Arg;
        my Str $Statement = "ERROR_UNKNOWN_STATEMENT";
        my Str $Keyword = "ERROR_UNKNOWN_KEYWORD";
        my Str $Code = "";
        for @.Arguments -> $Arg
        {
            next if ($Arg ~~ Token_Comma);
            if ($Arg ~~ Quote)
            {
                $Keyword = $Arg.Fallback;
                $Code ~= "dict\.= \[my Statements\] $Keyword \(new $Statement\);\n";
            }
            elsif ($Arg ~~ Token_Name)
            {
                $Statement = $Arg.Fallback;
            }
            else 
            {
                die "unexpected statements argument";
            }
        }
        $.Fallback = $Code;
    }
} 
class Statement_Operations is Line_Statement
{
    our $.Gal_Keyword = "operations";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my $Arg;
        my Str $Operation = "ERROR_UNKNOWN_OPERATION";
        my Str $Keyword = "ERROR_UNKNOWN_KEYWORD";
        my Str $Code = "";
        for @.Arguments -> $Arg
        {
            next if ($Arg ~~ Token_Comma);
            if ($Arg ~~ Quote)
            {
                $Keyword = $Arg.Fallback;
                $Code ~= "dict\.= \[my Operations\] $Keyword \(new $Operation\);\n";
            }
            elsif ($Arg ~~ Token_Name)
            {
                $Operation = $Arg.Fallback;
            }
            else 
            {
                die "unexpected operations argument";
            }
        }
        $.Fallback = $Code;
    }
} 
class Statement_Syntaxes is Line_Statement
{
    our $.Gal_Keyword = "syntaxes";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my $Arg;
        my Str $Syntax = "ERROR_UNKNOWN_SYNTAX";
        my Str $Keyword = "ERROR_UNKNOWN_KEYWORD";
        my Str $Code = "";
        for @.Arguments -> $Arg
        {
            next if ($Arg ~~ Token_Comma);
            if ($Arg ~~ Quote)
            {
                $Keyword = $Arg.Fallback;
                $Code ~= "dict\.= \[my Syntaxes\] $Keyword \(new $Syntax\);\n";
            }
            elsif ($Arg ~~ Token_Name)
            {
                $Syntax = $Arg.Fallback;
            }
            else 
            {
                die "unexpected syntaxes argument";
            }
        }
        $.Fallback = $Code;
    }
} 
class Statement_Requirement is Scoped_Statement
{
    our $.Gal_Keyword = "requirement";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Name = $.Class_Name.Fallback;
        my Str $Full_Name = "Requirement_$Name";
        my Str $Fallback_Lines = "";
        my Str $Fallback_Declarations = "";
        my $Statement;
        for $.Block.Statements -> $Statement
        {
            $Fallback_Lines ~= $Statement.Fallback ~ "\n";
            if defined($Statement.Fallback_Declaration)
            {
                # $append $Fallback_Declarations $Statement.Fallback_Declaration " "
            }
        }
        my Str $Fallback_Block = "\n\{\n" ~ self.Indent($Fallback_Declarations) ~ "\}";
        my Str $Code = "class $Full_Name \[is Requirement\]$Fallback_Block";
        $Code ~= $Fallback_Lines;
        $.Fallback = $Code;
    }
} 
class Statement_Spell is Scoped_Statement
{
    our $.Gal_Keyword = "spell";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Name = $.Class_Name.Fallback;
        my Str $Full_Name = "Spell_$Name";
        my Str $Fallback_Lines = "";
        my Str $Fallback_Declarations = "";
        my $Statement;
        for $.Block.Statements -> $Statement
        {
            $Fallback_Lines ~= $Statement.Fallback ~ "\n";
            if defined($Statement.Fallback_Declaration)
            {
                # $append $Fallback_Declarations $Statement.Fallback_Declaration " "
            }
        }
        my Str $Fallback_Block = "\n\{\n" ~ self.Indent($Fallback_Declarations) ~ "\}";
        my Str $Code = "class $Full_Name \[is Spell\]$Fallback_Block";
        $Code ~= $Fallback_Lines;
        $.Fallback = $Code;
    }
} 
class Statement_Goal is Scoped_Statement
{
    our $.Gal_Keyword = "goal";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Name = $.Class_Name.Fallback;
        my Str $Full_Name = "Goal_$Name";
        my Str $Fallback_Lines = "";
        my Str $Fallback_Declarations = "";
        my $Statement;
        for $.Block.Statements -> $Statement
        {
            $Fallback_Lines ~= $Statement.Fallback ~ "\n";
            if defined($Statement.Fallback_Declaration)
            {
                # $append $Fallback_Declarations $Statement.Fallback_Declaration " "
            }
        }
        my Str $Fallback_Block = "\n\{\n" ~ self.Indent($Fallback_Declarations) ~ "\}";
        my Str $Code = "class $Full_Name \[is Goal\]$Fallback_Block";
        $Code ~= $Fallback_Lines;
        $.Fallback = $Code;
    }
} 
class Syntax_Class_Lookup is Syntax
{
    our $.Gal_Keyword = "lookup";
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(\. \[: Compiler Instance\] Get_Class " ~ $.Name.Fallback ~ "\)";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_File_Copy is Line_Statement
{
    our $.Gal_Keyword = "file\.copy";
    has $.Source_File is rw;
    has $.Target_File is rw;
    method Attributes()
    {
        $.Source_File = @.Listargs.shift();
        $.Target_File = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "shell 'cp \"" ~ $.Source_File.Unquoted() ~ "\" \"" ~ $.Target_File.Unquoted() ~ "\"';";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_File_Append_File is Line_Statement
{
    our $.Gal_Keyword = "file\.append\.file";
    has $.Source_File is rw;
    has $.Target_File is rw;
    method Attributes()
    {
        $.Source_File = @.Listargs.shift();
        $.Target_File = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "shell 'cat \"" ~ $.Source_File.Unquoted() ~ "\">>\"" ~ $.Target_File.Unquoted() ~ "\"';";
        $.Fallback = $Gal_Code;
    }
} 
class Operation_File_Exists is Operation
{
    our $.Gal_Keyword = "file\.exists";
    has $.File_Name is rw;
    method Attributes()
    {
        $.File_Name = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "gal\.file_exists\(" ~ $.File_Name.Javascript ~ "\);";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "gal\.file_exists\(" ~ $.File_Name.Python ~ "\)";
        $.Python = $Python_Code;
    }
} 
class Statement_Infers is Line_Statement
{
    our $.Gal_Keyword = "infers";
    has $.Inference is rw;
    method Attributes()
    {
        $.Inference = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        $.Fallback = "";
    }
    method Model()
    {
        my Str $Inference_Name = $.Inference.Input;
        my Str $Class_Name = "Unknown";
        if defined($.Class_Context)
        {
            $Class_Name = $.Class_Context.Class_Name.Input;
        }
        elsif (defined($.Parent)) && (defined($.Parent.Class_Name))
        {
            $Class_Name = $.Parent.Class_Name.Input;
        }
        my $Owner_Class = Compiler.Instance.Get_Class($Class_Name);
        if $Owner_Class && (defined($Owner_Class.Infer_Inits))
        {
            $Owner_Class.Infer_Inits ~= "list\.append \[my Inferences Symbol_Value\] \(new Inference_$Inference_Name \[self\]\);\n";
        }
    }
} 
class Statement_Infer_Inits is Line_Statement
{
    our $.Gal_Keyword = "infer\.inits";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Class_Name = $.Class_Context.Class_Name.Fallback;
        my $Owner_Class = Compiler.Instance.Get_Class($Class_Name);
        $.Fallback = $Owner_Class.Infer_Inits;
    }
} 
class Syntax_Symbol is Syntax
{
    our $.Gal_Keyword = "attribute";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my $Arg;
        my Str $Code = "\[\. ";
        for @.Arguments -> $Arg
        {
            $Code ~= " " ~ $Arg.Fallback;
        }
        $Code ~= " Symbol_Value\]";
        $.Fallback = $Code;
    }
} 
class Syntax_Class_Symbol is Syntax
{
    our $.Gal_Keyword = "class\.attribute";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my $Arg;
        my Str $Code = "\[: ";
        for @.Arguments -> $Arg
        {
            $Code ~= " " ~ $Arg.Fallback;
        }
        $Code ~= " Symbol_Value\]";
        $.Fallback = $Code;
    }
} 
class Syntax_My_Symbol is Syntax
{
    our $.Gal_Keyword = "my\.attribute";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my $Arg;
        my Str $Code = "\[my ";
        for @.Arguments -> $Arg
        {
            $Code ~= " " ~ $Arg.Fallback;
        }
        $Code ~= " Symbol_Value\]";
        $.Fallback = $Code;
    }
} 
class Statement_Goalspell is Scoped_Statement
{
    our $.Gal_Keyword = "goal\.spell";
    has $.Description is rw;
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
        $.Description = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "goal " ~ $.Name.Fallback ~ " " ~ $.Description.Fallback ~ ";\nspell " ~ $.Name.Fallback ~ self.Fallback_Block();
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Read_Character is Line_Statement
{
    our $.Gal_Keyword = "read\.char";
    our $.Goalspell_Keyword = "read\.char";
    has $.Variable is rw;
    method Attributes()
    {
        if (@.Listargs.elems) == 0
        {
            die "missing required Variable";
        }
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = $.Variable.Javascript ~ " = gal\.read_char\(\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Mumps_Generate()
    {
        my Str $Mumps_Code = "read *" ~ $.Variable.Mumps ~ "\n";
        $.Mumps = $Mumps_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Variable.Python ~ " = gal\.read_char\(\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Read_Character_Timed is Line_Statement
{
    our $.Gal_Keyword = "read\.char\.timed";
    our $.Goalspell_Keyword = "read\.char\.timed";
    has $.Timeout is rw;
    has $.Variable is rw;
    method Attributes()
    {
        if (@.Listargs.elems) == 0
        {
            die "missing required Variable";
        }
        $.Variable = @.Listargs.shift();
        if (@.Listargs.elems) == 0
        {
            die "missing required Timeout";
        }
        $.Timeout = @.Listargs.shift();
    }
    method Mumps_Generate()
    {
        my Str $Mumps_Code = "    read *" ~ $.Variable.Mumps ~ ":" ~ $.Timeout.Mumps ~ "\n    set " ~ $.Variable.Mumps ~ "=\$char\(" ~ $.Variable.Mumps ~ "\)\n";
        $.Mumps = $Mumps_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Variable.Python ~ " = gal\.read_char_timed\(" ~ $.Timeout.Python ~ "\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Feature is Symbol_Statement
{
    our $.Gal_Keyword = "feature";
    has $.Keyword is rw;
    has $.Name is rw;
    has $.Symbol_Class is rw;
    has $.Type is rw;
    method Attributes()
    {
        $.Type = @.Listargs.shift();
        $.Name = @.Listargs.shift();
        $.Keyword = @.Listargs.shift();
        $.Symbol_Class = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Type = $.Type.Fallback;
        my Str $Name = $.Name.Fallback;
        my Str $Keyword = $.Keyword.Fallback;
        my Str $Symbol_Class = $.Symbol_Class.Fallback;
        my Str $Code = "attribute $Type $Name $Symbol_Class;";
        my Str $Declaration = "symbol $Type $Name $Symbol_Class" ~ self.Fallback_Block() ~ "\nstatement $Name $Keyword Feature_Assignment\n\{\n    property string Property_Name " ~ self.Enquote($Name) ~ ";\n    fallback 'entity\.new ' $Name ' ' $Symbol_Class \(i Fallback_Args\) ';' \[line\]\n        \[my Block Fallback_Statements\];\n\}\n";
        $.Fallback = $Declaration;
    }
} 
class Statement_Thing is Symbol_Statement
{
    our $.Gal_Keyword = "thing";
    has $.Keyword is rw;
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
        $.Keyword = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Name = $.Name.Fallback;
        my Str $Keyword = $.Keyword.Fallback;
        my Str $Declaration = "";
        my $Statement;
        for $.Block.Statements -> $Statement
        {
            if defined($Statement.Fallback_Declaration)
            {
                $Declaration ~= $Statement.Fallback_Declaration ~ "\n";
            }
        }
        my Str $Code = "class Thing_$Name\n\{\n$Declaration" ~ $.Block.Fallback_Statements ~ "\}statement $Name $Keyword Object_Definition\n\{\n    fallback 'entity\.new ' $Name ' ' Thing_$Name \(i Fallback_Args\) ';' \[line\]\n        \[my Block Fallback_Statements\];\n\}\n";
        $.Fallback = $Code;
    }
} 
class Statement_Camera is Entity_Definition_Statement
{
    our $.Gal_Keyword = "camera";
    has Str $.Class_Name is rw = "Camera";
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
    }
} 
class Statement_Scene is Entity_Definition_Statement
{
    our $.Gal_Keyword = "scene";
    has Str $.Class_Name is rw = "Scene";
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
    }
} 
class Statement_Box is Entity_Definition_Statement
{
    our $.Gal_Keyword = "box";
    has Str $.Class_Name is rw = "Box";
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
    }
} 
class Statement_Position is Entity_Definition_Statement
{
    our $.Gal_Keyword = "position";
    has Str $.Class_Name is rw = "Position";
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
    }
} 
class Statement_Animation is Entity_Definition_Statement
{
    our $.Gal_Keyword = "animation";
    has Str $.Class_Name is rw = "Animation";
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
    }
} 
class Statement_Center is List_Feature_Statement
{
    our $.Gal_Keyword = "center";
    has Str $.Class_Name is rw = "List";
    has Str $.Property_Name is rw = "Center";
    method Attributes()
    {
    }
} 
class Statement_Color is List_Feature_Statement
{
    our $.Gal_Keyword = "color";
    has Str $.Class_Name is rw = "List";
    has Str $.Property_Name is rw = "Color";
    method Attributes()
    {
    }
} 
class Statement_Rotation is List_Feature_Statement
{
    our $.Gal_Keyword = "rotation";
    has Str $.Class_Name is rw = "List";
    has Str $.Property_Name is rw = "Rotation";
    method Attributes()
    {
    }
} 
class Statement_Size is List_Feature_Statement
{
    our $.Gal_Keyword = "size";
    has Str $.Class_Name is rw = "List";
    has Str $.Property_Name is rw = "Size";
    method Attributes()
    {
    }
} 
class Statement_Texture is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "texture";
    has Str $.Class_Name is rw = "String";
    has Str $.Property_Name is rw = "Texture";
    method Attributes()
    {
    }
} 
class Statement_X is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "x";
    has Str $.Class_Name is rw = "Number";
    has Str $.Property_Name is rw = "X";
    method Attributes()
    {
    }
} 
class Statement_Y is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "y";
    has Str $.Class_Name is rw = "Number";
    has Str $.Property_Name is rw = "Y";
    method Attributes()
    {
    }
} 
class Statement_Z is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "z";
    has Str $.Class_Name is rw = "Number";
    has Str $.Property_Name is rw = "Z";
    method Attributes()
    {
    }
} 
class Syntax_Red is Syntax
{
    our $.Gal_Keyword = "red";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
         ;
        say "Generate Javascript for red";
    }
} 
class Statement_Resource is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "resource";
    has Str $.Class_Name is rw = "String";
    has Str $.Property_Name is rw = "Resource";
    method Attributes()
    {
    }
} 
class Statement_Workaround is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "workaround";
    has Str $.Class_Name is rw = "String";
    has Str $.Property_Name is rw = "Workaround";
    method Attributes()
    {
    }
} 
class Statement_Status is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "status";
    has Str $.Class_Name is rw = "String";
    has Str $.Property_Name is rw = "Status";
    method Attributes()
    {
    }
} 
class Statement_Start is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "start";
    has Str $.Class_Name is rw = "Date";
    has Str $.Property_Name is rw = "Start";
    method Attributes()
    {
    }
} 
class Statement_End is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "end";
    has Str $.Class_Name is rw = "Date";
    has Str $.Property_Name is rw = "End";
    method Attributes()
    {
    }
} 
class Statement_Foo is Entity_Definition_Statement
{
    our $.Gal_Keyword = "foo";
    has Str $.Class_Name is rw = "Foo";
    has $.Name is rw;
    method Attributes()
    {
        $.Name = @.Listargs.shift();
    }
} 
class Statement_Bar is Feature_Assignment_Statement
{
    our $.Gal_Keyword = "bar";
    has Str $.Class_Name is rw = "String";
    has Str $.Property_Name is rw = "Bar";
    method Attributes()
    {
    }
} 
class Statement_Uuid is Line_Statement
{
    our $.Gal_Keyword = "uuid";
    has $.Variable is rw;
    method Attributes()
    {
        $.Variable = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "var " ~ $.Variable.Javascript ~ " = self\.crypto\.randomUUID\(\);\n";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = $.Variable.Python ~ " = uuid\.uuid4\(\)\.hex\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Author is Line_Statement
{
    our $.Gal_Keyword = "author";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "comment Author:" ~ self.Fallback_Arguments() ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Syntax_Generator is Syntax
{
    our $.Gal_Keyword = "generator";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "Javascript_Generator";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "Python_Generator";
        $.Python = $Python_Code;
    }
} 
class Statement_Execute is Statement
{
    our $.Gal_Keyword = "execute";
    has $.Target is rw;
    method Attributes()
    {
        $.Target = @.Listargs.shift();
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "eval\(" ~ $.Target.Javascript ~ "\);";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "exec\(" ~ $.Target.Python ~ ", globals\(\)\)\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Prompt_Context is Statement
{
    our $.Gal_Keyword = "prompt\.context";
    method Attributes()
    {
    }
    method Javascript_Generate()
    {
        my Str $Javascript_Code = "";
        $.Javascript = $Javascript_Code;
    }
    method Python_Generate()
    {
        my Str $Python_Code = "global INPUT\nglobal OUTPUT\n";
        $.Python = $Python_Code;
    }
} 
class Statement_Element is Statement
{
    our $.Gal_Keyword = "element";
    has $.Class_Name is rw;
    method Attributes()
    {
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        if !(defined($.Class_Name))
        {
             ;
        }
        my Str $Code = "push \[my Elements\] \(new " ~ $.Class_Name.Fallback ~ "\);";
        $.Fallback = $Code;
    }
} 
# "Goal\.gal"
class Statement_Tilda is Invocation_Statement
{
    our $.Gal_Keyword = "~";
    has $.Definition is rw;
    method Attributes()
    {
        $.Definition = @.Listargs.shift();
        $.Definition.Usage = "entity";
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\. \[\. " ~ $.Definition.Fallback ~ " Implementor\]" ~ self.Fallback_Args() ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Operation_Tilda is Invocation_Operation
{
    our $.Gal_Keyword = "~";
    has $.Definition is rw;
    method Attributes()
    {
        $.Definition = @.Listargs.shift();
        $.Definition.Usage = "entity";
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(\. \[\. " ~ $.Definition.Fallback ~ " Implementor\]" ~ self.Fallback_Args() ~ "\)";
        $.Fallback = $Gal_Code;
    }
} 
class Syntax_Tilda is Syntax
{
    our $.Gal_Keyword = "~";
    has $.Definition is rw;
    method Attributes()
    {
        $.Definition = @.Listargs.shift();
        $.Definition.Usage = "entity";
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\[\. " ~ $.Definition.Fallback ~ " Implemetor" ~ self.Fallback_Args() ~ "\]";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_TildaI is Invocation_Statement
{
    our $.Gal_Keyword = "~i";
    has $.Method is rw;
    method Attributes()
    {
        $.Method = @.Listargs.shift();
        $.Method.Usage = "method";
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\. \[\. \[self\] Implementor\] " ~ $.Method.Fallback ~ self.Fallback_Args() ~ ";";
        $.Fallback = $Gal_Code;
    }
} 
class Operation_TildaI is Invocation_Operation
{
    our $.Gal_Keyword = "~i";
    has $.Method is rw;
    method Attributes()
    {
        $.Method = @.Listargs.shift();
        $.Method.Usage = "method";
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\(\. \[\. \[self\] Implementor\] " ~ $.Method.Fallback ~ self.Fallback_Args() ~ "\)";
        $.Fallback = $Gal_Code;
    }
} 
class Syntax_TildaI is Syntax
{
    our $.Gal_Keyword = "~i";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\[\. \[\. \[self\] Implementor\] " ~ self.Fallback_Args() ~ "\]";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Interface is Interface_Statement
{
    our $.Gal_Keyword = "interface";
    has $.Interface_Name is rw;
    method Attributes()
    {
        $.Interface_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Owner_Class = $.Class_Context.Class_Name;
        $Owner_Class = $Owner_Class.subst(":", "", :g);
        my Str $Class_Name = $.Interface_Name.Fallback;
        $Class_Name = $Class_Name.subst(":", "", :g);
        my Str $Interface_Name = "'$Class_Name'";
        # "= Class_Name \(append \":Interface_\" Owner_Class \"_\" Class_Name\)"
        my Str $Kludge = ":Interface_$Owner_Class";
        $Kludge ~= "_$Class_Name";
        $Class_Name = $Kludge;
        # "Generate the interface class as specified\."
        my Str $Class_Args = self.Fallback_Args();
        my Str $Class_Body = self.Fallback_Block();
        my Str $Class_Code = "class $Class_Name$Class_Args \[is Interface\]$Class_Body";
        # "Generate goal interface class property assignment\."
        my Str $Interface_Assignment = "class\.property $Interface_Name \[: $Class_Name\];\n";
        $.Fallback_Declaration = $Interface_Assignment;
        $.Fallback = $Class_Code;
    }
} 
class Statement_Implementor is Line_Statement
{
    our $.Gal_Keyword = "implementor";
    has $.Implementor is rw;
    has $.Interface is rw;
    method Attributes()
    {
        $.Interface = @.Listargs.shift();
        $.Implementor = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Interface_Fallback = "'" ~ $.Interface.Fallback ~ "'";
        my Str $Implementor_Fallback = $.Implementor.Fallback;
        my Str $Interface_Assignment = "dict\.assign \[classprop Interfaces\] $Interface_Fallback $Implementor_Fallback;";
        $.Fallback = $Interface_Assignment;
    }
} 
class Statement_Attribute is Property_Statement
{
    our $.Gal_Keyword = "attribute";
    has $.Class_Name is rw;
    has $.Data_Type is rw;
    has $.Property_Name is rw;
    method Attributes()
    {
        $.Data_Type = @.Listargs.shift();
        $.Property_Name = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Class_Name = @.Listargs.shift();
        }
    }
    method Fallback_Generate()
    {
        my Str $Property_Fallback = $.Property_Name.Fallback;
        my Str $Type_Fallback = $.Data_Type.Fallback;
        my Str $Ancestor_Fallback = "Attribute";
        my Str $Class_Fallback;
        if defined($.Class_Name)
        {
            $Class_Fallback = $.Class_Name.Fallback;
        }
        else 
        {
            my Str $Type_Name = $Type_Fallback.substr(0, 1).uc() ~ $Type_Fallback.substr(1);
            if $Type_Name eq "Entity"
            {
                $Type_Name = "Object";
            }
            $Class_Fallback = $Type_Name;
        }
        my Str $Code = "property entity $Property_Fallback \(new $Class_Fallback \[self\]\);\n";
        $.Fallback = $Code;
    }
    method Inference_Context()
    {
        return self;
    }
} 
class Statement_Class_Attribute is Property_Statement
{
    our $.Gal_Keyword = "class\.attribute";
    has $.Class_Name is rw;
    has $.Data_Type is rw;
    has $.Property_Name is rw;
    method Attributes()
    {
        $.Data_Type = @.Listargs.shift();
        $.Property_Name = @.Listargs.shift();
        if (@.Listargs.elems) > 0
        {
            $.Class_Name = @.Listargs.shift();
        }
    }
    method Fallback_Generate()
    {
        my Str $Property_Fallback = $.Property_Name.Fallback;
        my Str $Type_Fallback = $.Data_Type.Fallback;
        my Str $Ancestor_Fallback = "Attribute";
        my Str $Class_Fallback;
        if defined($.Class_Name)
        {
            $Class_Fallback = $.Class_Name.Fallback;
        }
        else 
        {
            my Str $Type_Name = $Type_Fallback.substr(0, 1).uc() ~ $Type_Fallback.substr(1);
            $Class_Fallback = $Type_Name;
        }
        # "Class Property entities don't know their owner!"
        my Str $Code = "class\.property entity $Property_Fallback \(new Class_$Class_Fallback\);\n";
        $.Fallback = $Code;
    }
    method Inference_Context()
    {
        return self;
    }
} 
class Statement_Behavior is Method_Statement
{
    our $.Gal_Keyword = "behavior";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Code = "method" ~ self.Fallback_Args() ~ self.Fallback_Block();
        $.Fallback = $Code;
    }
} 
class Syntax_Attribute is Syntax
{
    our $.Aliases = " att get value ";
    our $.Gal_Keyword = "attribute";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\[\. " ~ self.Fallback_Args() ~ " Attribute_Value\]";
        $.Fallback = $Gal_Code;
    }
} 
class Syntax_Certainty is Syntax
{
    our $.Aliases = " cert ";
    our $.Gal_Keyword = "certainty";
    method Attributes()
    {
    }
    method Fallback_Generate()
    {
        my Str $Gal_Code = "\[\. " ~ self.Fallback_Args() ~ " Attribute_Certainty\]";
        $.Fallback = $Gal_Code;
    }
} 
class Statement_Old_Goal is Goal_Statement
{
    our $.Gal_Keyword = "goal";
    our $.Gs_Keyword = "goal";
    has $.Class_Name is rw;
    method Attributes()
    {
        if (@.Listargs.elems) == 0
        {
            die "missing required Class_Name";
        }
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Name = $.Class_Name.Fallback;
        my Str $Definitions = "";
        my Str $Subgoals = "";
        my $Statement;
        for $.Block.Statements -> $Statement
        {
            my Str $Definition = $Statement.Fallback_Declaration;
            my Str $Subgoal = $Statement.Fallback;
            if $Definition ne ""
            {
                $Definitions ~= $Definition ~ "\n";
            }
            if $Subgoal ne ""
            {
                $Subgoals ~= $Subgoal ~ "\n";
            }
        }
        my Str $Code = "class Goal_$Name \[is Goal\]\n\{\n" ~ self.Indent($Definitions) ~ "\}" ~ self.Indent($Subgoals) ~ "comment `End of Goal_$Name scope\.`;\n\n";
        $.Fallback = $Code;
        $.Fallback_Declaration = "property entity Goal_$Name \(new Goal_$Name\);";
    }
} 
class Statement_Test is Goal_Statement
{
    our $.Gal_Keyword = "test";
    our $.Gs_Keyword = "test";
    has $.Class_Name is rw;
    method Attributes()
    {
        if (@.Listargs.elems) == 0
        {
            die "missing required Class_Name";
        }
        $.Class_Name = @.Listargs.shift();
    }
    method Fallback_Generate()
    {
        my Str $Name = $.Class_Name.Fallback;
        my Str $Definitions = "";
        my Str $Subgoals = "";
        my $Statement;
        for $.Block.Statements -> $Statement
        {
            my Str $Definition = $Statement.Fallback_Declaration;
            my Str $Subgoal = $Statement.Fallback;
            if $Definition ne ""
            {
                $Definitions ~= $Definition ~ "\n";
            }
            if $Subgoal ne ""
            {
                $Subgoals ~= $Subgoal ~ "\n";
            }
        }
        my Str $Args = self.Fallback_Args();
        my Str $Code = "goal Test_$Name $Args\n\{\n" ~ self.Indent($Definitions) ~ "\}" ~ self.Indent($Subgoals) ~ "comment `End of Test_$Name scope\.`;\n\n";
        $.Fallback = $Code;
        $.Fallback_Declaration = "property entity Goal_$Name \(new Goal_$Name\);";
    }
} 
# "Factory\.gal"
class Factory
{
    our %.Element_Index;
    method Add_Index($Element)
    {
        try {
            $.Element_Index{$Element.^name}++;
        
        CATCH { default {
            $.Element_Index{$Element.^name} = 1;
        } } }
    }
    method Create_Element($Input_Token, $Next, $Document, $Parent_Element, Str $Comma_Mode)
    {
        my $Element;
        if (($Input_Token ~~ Token_Operation_Start)) || ((($Input_Token ~~ Token_Comma)) && ($Comma_Mode eq "operation"))
        {
            $Element = Factory.Create_Operation($Input_Token, $Next, $Document, $Parent_Element);
        }
        elsif (($Input_Token ~~ Token_Syntax_Start)) || ((($Input_Token ~~ Token_Comma)) && ($Comma_Mode eq "syntax"))
        {
            $Element = Factory.Create_Syntax($Input_Token, $Next, $Document, $Parent_Element);
        }
        elsif (($Input_Token ~~ Token_Keyvalue_Start)) || ((($Input_Token ~~ Token_Comma)) && ($Comma_Mode eq "keyvalue"))
        {
            $Element = Factory.Create_Keyvalue($Input_Token, $Next, $Document, $Parent_Element);
        }
        else 
        {
            $Element = Factory.Create_Statement($Input_Token, $Next, $Document, $Parent_Element);
        }
        # $string $Elem_String $Element.To_String()
        # $string $Parent_String $Parent_Element.To_String()
        # $writeline "created " $Elem_String " with parent " $Parent_String
        return $Element;
    }
    method Create_Keyvalue($Input_Token, $Next, $Document, $Parent_Element)
    {
        say "Creating Keyvalue from input token: " ~ $Input_Token.To_String();
        my $Element = Keyvalue.new();
        $Element.Elements.push($Input_Token);
        $Element.Start_Position = $Input_Token.Start_Position;
        $Element.End_Position = $Input_Token.End_Position;
        $Element.Document = $Document;
        $Element.Parent = $Parent_Element;
        return $Element;
    }
    method Create_Operation($Input_Token, $Next, $Document, $Parent_Element)
    {
        my Str $Verb = " " ~ $Next.Input.lc() ~ " ";
        my $Element;
        # "Numeric Operations"
        if " + add ".contains($Verb)
        {
            $Element = Operation_Add.new();
        }
        elsif " greater gt ".contains($Verb)
        {
            $Element = Operation_Greater.new();
        }
        elsif " greater\.equal ge ".contains($Verb)
        {
            $Element = Operation_Greater_Equal.new();
        }
        elsif " divide div / ".contains($Verb)
        {
            $Element = Operation_Divide.new();
        }
        elsif " less lt ".contains($Verb)
        {
            $Element = Operation_Less.new();
        }
        elsif " less\.equal le ".contains($Verb)
        {
            $Element = Operation_Less_Equal.new();
        }
        elsif " multiply mult * ".contains($Verb)
        {
            $Element = Operation_Multiply.new();
        }
        elsif " round ".contains($Verb)
        {
            $Element = Operation_Round.new();
        }
        elsif " subtract - ".contains($Verb)
        {
            $Element = Operation_Subtract.new();
        }
        # "Logical Operations"
        elsif " & and ".contains($Verb)
        {
            $Element = Operation_And.new();
        }
        elsif " equal = ".contains($Verb)
        {
            $Element = Operation_Equal.new();
        }
        elsif " != ne not\.= not\.equal ".contains($Verb)
        {
            $Element = Operation_Not_Equal.new();
        }
        elsif " not ! ".contains($Verb)
        {
            $Element = Operation_Not.new();
        }
        elsif " or | ".contains($Verb)
        {
            $Element = Operation_Or.new();
        }
        # "Invocation Operations"
        elsif " \. call ".contains($Verb)
        {
            $Element = Operation_Call.new();
        }
        elsif " : cm class\.method ".contains($Verb)
        {
            $Element = Operation_Colon.new();
        }
        elsif " i self me this ".contains($Verb)
        {
            $Element = Operation_I.new();
        }
        elsif " we ".contains($Verb)
        {
            $Element = Operation_We.new();
        }
        # "Class Operations"
        elsif " classpropget ".contains($Verb)
        {
            $Element = Operation_Classpropget.new();
        }
        elsif " new ".contains($Verb)
        {
            $Element = Operation_New.new();
        }
        # "Variable Operations"
        elsif " defined ".contains($Verb)
        {
            $Element = Operation_Defined.new();
        }
        elsif " isnull is\.null ".contains($Verb)
        {
            $Element = Operation_Is_Null.new();
        }
        elsif " notnull not\.null ".contains($Verb)
        {
            $Element = Operation_Not_Null.new();
        }
        elsif " env environ environment ".contains($Verb)
        {
            $Element = Operation_Environment.new();
        }
        # "Dictionary/Hash Operations"
        elsif " key\.get dict\.get dictionary\.get hash\.get ".contains($Verb)
        {
            $Element = Operation_Key_Get.new();
        }
        elsif " key\.exists dict\.exists dictionary\.exists hash\.exists ".contains($Verb)
        {
            $Element = Operation_Key_Exists.new();
        }
        # "String Operations"
        elsif " firstchar ".contains($Verb)
        {
            $Element = Operation_Firstchar.new();
        }
        elsif " is\.whitespace whitespace ".contains($Verb)
        {
            $Element = Operation_Whitespace.new();
        }
        elsif " lastchar ".contains($Verb)
        {
            $Element = Operation_Lastchar.new();
        }
        elsif " lowercase lower ".contains($Verb)
        {
            $Element = Operation_Lowercase.new();
        }
        elsif " startswith starts\.with starts begins beginswith begins\.with ".contains($Verb)
        {
            $Element = Operation_Begins.new();
        }
        elsif " string ".contains($Verb)
        {
            $Element = Operation_String.new();
        }
        elsif " string\.append append s\.append s+ ".contains($Verb)
        {
            $Element = Operation_Append.new();
        }
        elsif " string\.contains contains s\.contains ".contains($Verb)
        {
            $Element = Operation_Contains.new();
        }
        elsif " string\.equal string\.eq seq s= s\.= ".contains($Verb)
        {
            $Element = Operation_String_Equal.new();
        }
        elsif " string\.greater string\.gt s\.gt sgt ".contains($Verb)
        {
            $Element = Operation_String_Greater.new();
        }
        elsif " string\.greater\.equal string\.ge s\.ge sge ".contains($Verb)
        {
            $Element = Operation_String_Greater_Equal.new();
        }
        elsif " string\.length length s\.length s\.len len ".contains($Verb)
        {
            $Element = Operation_String_Length.new();
        }
        elsif " string\.less string\.lt s\.lt slt ".contains($Verb)
        {
            $Element = Operation_String_Less.new();
        }
        elsif " string\.less\.equal string\.le s\.le sle ".contains($Verb)
        {
            $Element = Operation_String_Less_Equal.new();
        }
        elsif " string\.not\.equal string\.ne s\.ne sne s!= ".contains($Verb)
        {
            $Element = Operation_String_Not_Equal.new();
        }
        elsif " substring ".contains($Verb)
        {
            $Element = Operation_Substring.new();
        }
        elsif " uppercase upper ".contains($Verb)
        {
            $Element = Operation_Uppercase.new();
        }
        elsif " is\.lowercase is\.lower islower ".contains($Verb)
        {
            $Element = Operation_Is_Lowercase.new();
        }
        elsif " is\.uppercase is\.upper isupper ".contains($Verb)
        {
            $Element = Operation_Is_Uppercase.new();
        }
        elsif " isalpha ".contains($Verb)
        {
            $Element = Operation_Is_Alpha.new();
        }
        elsif " isident ".contains($Verb)
        {
            $Element = Operation_Is_Ident.new();
        }
        elsif " title\.case titlecase ".contains($Verb)
        {
            $Element = Operation_Titlecase.new();
        }
        # "Communication Operations"
        elsif " http\.fetch fetch ".contains($Verb)
        {
            $Element = Operation_Http_Fetch.new();
        }
        # "Instance Operations"
        elsif " isa is\.a ".contains($Verb)
        {
            $Element = Operation_Isa.new();
        }
        # "List Operations"
        elsif " list\.get ".contains($Verb)
        {
            $Element = Operation_List_Get.new();
        }
        elsif " list\.last ".contains($Verb)
        {
            $Element = Operation_List_Last.new();
        }
        elsif " list\.length ".contains($Verb)
        {
            $Element = Operation_List_Length.new();
        }
        elsif " list\.pop pop ".contains($Verb)
        {
            $Element = Operation_List_Pop.new();
        }
        elsif " list\.shift shift ".contains($Verb)
        {
            $Element = Operation_List_Shift.new();
        }
        elsif " list\.split split ".contains($Verb)
        {
            $Element = Operation_List_Split.new();
        }
        # "Database Operations"
        elsif " sql\.escape ".contains($Verb)
        {
            $Element = Operation_Sql_Escape.new();
        }
        elsif " sql\.query query ".contains($Verb)
        {
            $Element = Operation_Sql_Query.new();
        }
        # "time operations"
        elsif " time\.string ".contains($Verb)
        {
            $Element = Operation_Time_String.new();
        }
        # "oho compiler operations"
        elsif " tokenmode ".contains($Verb)
        {
            $Element = Operation_Token_Mode.new();
        }
        elsif " file\.exists ".contains($Verb)
        {
            $Element = Operation_File_Exists.new();
        }
        elsif " char2int ".contains($Verb)
        {
            $Element = Operation_Char2int.new();
        }
        elsif " int2char ".contains($Verb)
        {
            $Element = Operation_Int2char.new();
        }
        else 
        {
            die "Unknown Operation '$Verb' '" ~ $Next.Input ~ "'";
        }
        $Element.Elements.push($Input_Token);
        $Element.Start_Position = $Input_Token.Start_Position;
        $Element.End_Position = $Input_Token.End_Position;
        $Element.Document = $Document;
        $Element.Parent = $Parent_Element;
        Factory.Add_Index($Element);
        return $Element;
    }
    method Create_Statement($Input_Token, $Next, $Document, $Parent_Element)
    {
        my Str $Verb = " " ~ $Input_Token.Input.lc() ~ " ";
        my $Element;
        if " = assign ".contains($Verb)
        {
            $Element = Statement_Assign.new();
        }
        elsif " \. call ".contains($Verb)
        {
            $Element = Statement_Call.new();
        }
        elsif " : c\. ".contains($Verb)
        {
            $Element = Statement_Colon.new();
        }
        elsif " \.= property\.assign property\.set propset ".contains($Verb)
        {
            $Element = Statement_Propset.new();
        }
        elsif " := cp\.= classpropset ".contains($Verb)
        {
            $Element = Statement_Classpropset.new();
        }
        elsif " ~ tilda ".contains($Verb)
        {
            $Element = Statement_Tilda.new();
        }
        elsif " ~i tildai ".contains($Verb)
        {
            $Element = Statement_TildaI.new();
        }
        elsif " add + += ".contains($Verb)
        {
            $Element = Statement_Add.new();
        }
        elsif " and & &= ".contains($Verb)
        {
            $Element = Statement_And.new();
        }
        elsif " alias ".contains($Verb)
        {
            $Element = Statement_Alias.new();
        }
        elsif " answer ".contains($Verb)
        {
            $Element = Statement_Answer.new();
        }
        elsif " append string\.append s+ ".contains($Verb)
        {
            $Element = Statement_Append.new();
        }
        elsif " argument ".contains($Verb)
        {
            $Element = Statement_Argument.new();
        }
        elsif " arguments ".contains($Verb)
        {
            $Element = Statement_Arguments.new();
        }
        elsif " atomic ".contains($Verb)
        {
            $Element = Statement_Atomic.new();
        }
        elsif " attribute ".contains($Verb)
        {
            $Element = Statement_Attribute.new();
        }
        elsif " author ".contains($Verb)
        {
            $Element = Statement_Author.new();
        }
        elsif " behavior ".contains($Verb)
        {
            $Element = Statement_Behavior.new();
        }
        elsif " break ".contains($Verb)
        {
            $Element = Statement_Break.new();
        }
        elsif " break\.if breakif ".contains($Verb)
        {
            $Element = Statement_Breakif.new();
        }
        elsif " catch ".contains($Verb)
        {
            $Element = Statement_Catch.new();
        }
        elsif " class class\.append class\.addendum ".contains($Verb)
        {
            $Element = Statement_Class.new();
        }
        elsif " class\.attribute ".contains($Verb)
        {
            $Element = Statement_Class_Attribute.new();
        }
        elsif " class\.method classmethod ".contains($Verb)
        {
            $Element = Statement_Class_Method.new();
        }
        elsif " class\.property classprop setting our ".contains($Verb)
        {
            $Element = Statement_Class_Property.new();
        }
        elsif " comment ".contains($Verb)
        {
            $Element = Statement_Comment.new();
        }
        elsif " constructor ".contains($Verb)
        {
            $Element = Statement_Constructor.new();
        }
        elsif " contest ".contains($Verb)
        {
            $Element = Statement_Contest.new();
        }
        elsif " continue ".contains($Verb)
        {
            $Element = Statement_Continue.new();
        }
        elsif " continue\.if contif ".contains($Verb)
        {
            $Element = Statement_Contif.new();
        }
        elsif " currency ".contains($Verb)
        {
            $Element = Statement_Currency.new();
        }
        elsif " debug d debugger; ".contains($Verb)
        {
            $Element = Statement_Debug.new();
        }
        elsif " debugif di ".contains($Verb)
        {
            $Element = Statement_Debug_If.new();
        }
        elsif " debug\.stack ds ".contains($Verb)
        {
            $Element = Statement_Debug_Stack.new();
        }
        elsif " debug\.variable dv ".contains($Verb)
        {
            $Element = Statement_Debug_Variable.new();
        }
        elsif " definition ".contains($Verb)
        {
            $Element = Statement_Definition.new();
        }
        elsif " dialect ".contains($Verb)
        {
            $Element = Statement_Dialect.new();
        }
        elsif " dictionary dict hash ".contains($Verb)
        {
            $Element = Statement_Dictionary.new();
        }
        elsif " dictionary\.= dict\.= hash\.= dictionary\.assign dict\.assign hash\.assign ".contains($Verb)
        {
            $Element = Statement_Dictionary_Assign.new();
        }
        elsif " either ".contains($Verb)
        {
            $Element = Statement_Either.new();
        }
        elsif " element ".contains($Verb)
        {
            $Element = Statement_Element.new();
        }
        elsif " else ".contains($Verb)
        {
            $Element = Statement_Else.new();
        }
        elsif " else\.if elsif elseif ".contains($Verb)
        {
            $Element = Statement_Else_If.new();
        }
        elsif " english ".contains($Verb)
        {
            $Element = Statement_English.new();
        }
        elsif " entities ".contains($Verb)
        {
            $Element = Statement_Entities.new();
        }
        elsif " entity object ".contains($Verb)
        {
            $Element = Statement_Entity.new();
        }
        elsif " entity\.my\.class entity\.myclass entity\.self\.class entity\.selfclass object\.my\.class object\.myclass object\.self\.class object\.selfclass ".contains($Verb)
        {
            $Element = Statement_Entity_My_Class.new();
        }
        elsif " entity\.new new\.entity object\.new new\.object ".contains($Verb)
        {
            $Element = Statement_Entity_New.new();
        }
        elsif " error raise throw ".contains($Verb)
        {
            $Element = Statement_Error.new();
        }
        elsif " either ".contains($Verb)
        {
            $Element = Statement_Either.new();
        }
        elsif " execute ".contains($Verb)
        {
            $Element = Statement_Execute.new();
        }
        elsif " fallback ".contains($Verb)
        {
            $Element = Statement_Fallback.new();
        }
        elsif " infer\.inits ".contains($Verb)
        {
            $Element = Statement_Infer_Inits.new();
        }
        elsif " flag boolean bool ".contains($Verb)
        {
            $Element = Statement_Flag.new();
        }
        elsif " file\.append ".contains($Verb)
        {
            $Element = Statement_File_Append.new();
        }
        elsif " file\.append\.file ".contains($Verb)
        {
            $Element = Statement_File_Append_File.new();
        }
        elsif " file\.copy\.file file\.copy ".contains($Verb)
        {
            $Element = Statement_File_Copy.new();
        }
        elsif " file\.readall readall ".contains($Verb)
        {
            $Element = Statement_File_Readall.new();
        }
        elsif " file\.dump ".contains($Verb)
        {
            $Element = Statement_File_Dump.new();
        }
        elsif " for\.range ".contains($Verb)
        {
            $Element = Statement_For_Range.new();
        }
        elsif " foreach list\.foreach ".contains($Verb)
        {
            $Element = Statement_Foreach.new();
        }
        elsif " forever ".contains($Verb)
        {
            $Element = Statement_Forever.new();
        }
        elsif " forgive ".contains($Verb)
        {
            $Element = Statement_Forgive.new();
        }
        elsif " forward ".contains($Verb)
        {
            $Element = Statement_Forward.new();
        }
        elsif " gal general\.abstract\.language general_abstract_language ".contains($Verb)
        {
            $Element = Statement_Gal.new();
        }
        elsif " generate ".contains($Verb)
        {
            $Element = Statement_Generate.new();
        }
        elsif " goalspell goal\.spell ".contains($Verb)
        {
            $Element = Statement_Goalspell.new();
        }
        elsif " gs ".contains($Verb)
        {
            $Element = Statement_Gs.new();
        }
        elsif " isa is_a handle classify ".contains($Verb)
        {
            $Element = Statement_Classify.new();
        }
        elsif " i self me this ".contains($Verb)
        {
            $Element = Statement_I.new();
        }
        elsif " if ".contains($Verb)
        {
            $Element = Statement_If.new();
        }
        elsif " ifdef ".contains($Verb)
        {
            $Element = Statement_Ifdef.new();
        }
        elsif " infer ".contains($Verb)
        {
            $Element = Statement_Infer.new();
        }
        elsif " flowerbox ".contains($Verb)
        {
            $Element = Statement_Flowerbox.new();
        }
        elsif " increment ++ ".contains($Verb)
        {
            $Element = Statement_Increment.new();
        }
        elsif " integer int ".contains($Verb)
        {
            $Element = Statement_Integer.new();
        }
        elsif " inference ".contains($Verb)
        {
            $Element = Statement_Inference.new();
        }
        elsif " infers ".contains($Verb)
        {
            $Element = Statement_Infers.new();
        }
        elsif " integers ints ".contains($Verb)
        {
            $Element = Statement_Integers.new();
        }
        elsif " iterate dict\.iterate dictionary\.iterate hash\.iterate ".contains($Verb)
        {
            $Element = Statement_Iterate.new();
        }
        elsif " javascript ".contains($Verb)
        {
            $Element = Statement_Javascript.new();
        }
        elsif " join list\.join ".contains($Verb)
        {
            $Element = Statement_Join.new();
        }
        elsif " keyword ".contains($Verb)
        {
            $Element = Statement_Keyword.new();
        }
        elsif " know import use include ".contains($Verb)
        {
            $Element = Statement_Know.new();
        }
        elsif " gal\.language ".contains($Verb)
        {
            $Element = Statement_Gal_Language.new();
        }
        elsif " list ".contains($Verb)
        {
            $Element = Statement_List.new();
        }
        elsif " list\.append push list\.push ".contains($Verb)
        {
            $Element = Statement_List_Append.new();
        }
        elsif " list\.delete list\.remove list\.splice ".contains($Verb)
        {
            $Element = Statement_List_Delete.new();
        }
        elsif " list\.copy ".contains($Verb)
        {
            $Element = Statement_List_Copy.new();
        }
        elsif " list\.clear ".contains($Verb)
        {
            $Element = Statement_List_Clear.new();
        }
        elsif " main ".contains($Verb)
        {
            $Element = Statement_Main.new();
        }
        elsif " method ".contains($Verb)
        {
            $Element = Statement_Method.new();
        }
        elsif " module ".contains($Verb)
        {
            $Element = Statement_Module.new();
        }
        elsif " mumps ".contains($Verb)
        {
            $Element = Statement_Mumps.new();
        }
        elsif " my= my\.= self\.= ".contains($Verb)
        {
            $Element = Statement_My_Equal.new();
        }
        elsif " i= it= self= ".contains($Verb)
        {
            $Element = Statement_I_Equal.new();
        }
        elsif " new ".contains($Verb)
        {
            $Element = Statement_New.new();
        }
        elsif " number ".contains($Verb)
        {
            $Element = Statement_Number.new();
        }
        elsif " numbers ".contains($Verb)
        {
            $Element = Statement_Numbers.new();
        }
        elsif " oho optimize\.human\.outcome optimize_human_outcome".contains($Verb)
        {
            $Element = Statement_Oho.new();
        }
        elsif " operation ".contains($Verb)
        {
            $Element = Statement_Operation.new();
        }
        elsif " operations ".contains($Verb)
        {
            $Element = Statement_Operations.new();
        }
        elsif " optional ".contains($Verb)
        {
            $Element = Statement_Optional.new();
        }
        elsif " our\.= our= us\.= us= ".contains($Verb)
        {
            $Element = Statement_Our_Equal.new();
        }
        elsif " parser ".contains($Verb)
        {
            $Element = Statement_Parser.new();
        }
        elsif " principle ".contains($Verb)
        {
            $Element = Statement_Principle.new();
        }
        elsif " prompt\.context ".contains($Verb)
        {
            $Element = Statement_Prompt_Context.new();
        }
        elsif " property my ".contains($Verb)
        {
            $Element = Statement_Property.new();
        }
        elsif " python ".contains($Verb)
        {
            $Element = Statement_Python.new();
        }
        elsif " question ".contains($Verb)
        {
            $Element = Statement_Question.new();
        }
        elsif " readline read\.line ".contains($Verb)
        {
            $Element = Statement_Read_Line.new();
        }
        elsif " replace string\.replace ".contains($Verb)
        {
            $Element = Statement_Replace.new();
        }
        elsif " requirement ".contains($Verb)
        {
            $Element = Statement_Requirement.new();
        }
        elsif " spell ".contains($Verb)
        {
            $Element = Statement_Spell.new();
        }
        elsif " goal ".contains($Verb)
        {
            $Element = Statement_Goal.new();
        }
        elsif " read\.char ".contains($Verb)
        {
            $Element = Statement_Read_Character.new();
        }
        elsif " read\.char\.timed ".contains($Verb)
        {
            $Element = Statement_Read_Character_Timed.new();
        }
        elsif " return ".contains($Verb)
        {
            $Element = Statement_Return.new();
        }
        elsif " require\.that ".contains($Verb)
        {
            $Element = Statement_Require_That.new();
        }
        elsif " require\.that\.i ".contains($Verb)
        {
            $Element = Statement_Require_That_I.new();
        }
        elsif " return\.if returnif ".contains($Verb)
        {
            $Element = Statement_Return_If.new();
        }
        elsif " sequence ".contains($Verb)
        {
            $Element = Statement_Sequence.new();
        }
        elsif " sort ".contains($Verb)
        {
            $Element = Statement_Sort.new();
        }
        elsif " protocol ".contains($Verb)
        {
            $Element = Statement_Old_Goal.new();
        }
        elsif " skiptoken skip\.token ".contains($Verb)
        {
            $Element = Statement_Skip_Token.new();
        }
        elsif " statement ".contains($Verb)
        {
            $Element = Statement_Statement.new();
        }
        elsif " statements ".contains($Verb)
        {
            $Element = Statement_Statements.new();
        }
        elsif " string ".contains($Verb)
        {
            $Element = Statement_String.new();
        }
        elsif " strings ".contains($Verb)
        {
            $Element = Statement_Strings.new();
        }
        elsif " symbol ".contains($Verb)
        {
            $Element = Statement_Symbol.new();
        }
        elsif " syntax ".contains($Verb)
        {
            $Element = Statement_Syntax.new();
        }
        elsif " syntaxes ".contains($Verb)
        {
            $Element = Statement_Syntaxes.new();
        }
        elsif " test ".contains($Verb)
        {
            $Element = Statement_Test.new();
        }
        elsif " todo ".contains($Verb)
        {
            $Element = Statement_Todo.new();
        }
        elsif " token ".contains($Verb)
        {
            $Element = Statement_Token.new();
        }
        elsif " token\.append ".contains($Verb)
        {
            $Element = Statement_Token_Append.new();
        }
        elsif " newtoken ".contains($Verb)
        {
            $Element = Statement_New_Token.new();
        }
        elsif " tokenmode ".contains($Verb)
        {
            $Element = Statement_Token_Mode.new();
        }
        elsif " tokens ".contains($Verb)
        {
            $Element = Statement_Tokens.new();
        }
        elsif " try ".contains($Verb)
        {
            $Element = Statement_Try.new();
        }
        elsif " undef undefined ".contains($Verb)
        {
            $Element = Statement_Undef.new();
        }
        elsif " unless ".contains($Verb)
        {
            $Element = Statement_Unless.new();
        }
        elsif " variant ".contains($Verb)
        {
            $Element = Statement_Variant.new();
        }
        elsif " verb polymorph ".contains($Verb)
        {
            $Element = Statement_Verb.new();
        }
        elsif " verbose ".contains($Verb)
        {
            $Element = Statement_Verbose.new();
        }
        elsif " verbosity ".contains($Verb)
        {
            $Element = Statement_Verbosity.new();
        }
        elsif " we us ".contains($Verb)
        {
            $Element = Statement_We.new();
        }
        elsif " myclass ".contains($Verb)
        {
            $Element = Statement_Myclass.new();
        }
        elsif " while ".contains($Verb)
        {
            $Element = Statement_While.new();
        }
        elsif " write ".contains($Verb)
        {
            $Element = Statement_Write.new();
        }
        elsif " writeline say write\.line ".contains($Verb)
        {
            $Element = Statement_Write_Line.new();
        }
        elsif " raku ".contains($Verb)
        {
            $Element = Statement_Raku.new();
        }
        # "Book Dialect"
        elsif " book ".contains($Verb)
        {
            $Element = Statement_Book.new();
        }
        elsif " chapter chap ".contains($Verb)
        {
            $Element = Statement_Chapter.new();
        }
        elsif " section ".contains($Verb)
        {
            $Element = Statement_Section.new();
        }
        elsif " overview ".contains($Verb)
        {
            $Element = Statement_Overview.new();
        }
        elsif " expository exposition expo ".contains($Verb)
        {
            $Element = Statement_Expository.new();
        }
        elsif " paragraph p ".contains($Verb)
        {
            $Element = Statement_Paragraph.new();
        }
        elsif " linux shell ".contains($Verb)
        {
            $Element = Statement_Shell.new();
        }
        elsif " summary summ ".contains($Verb)
        {
            $Element = Statement_Summary.new();
        }
        elsif " title ".contains($Verb)
        {
            $Element = Statement_Title.new();
        }
        elsif " description desc ".contains($Verb)
        {
            $Element = Statement_Description.new();
        }
        elsif " codefile code ".contains($Verb)
        {
            $Element = Statement_Codefile.new();
        }
        elsif " book\.gal ".contains($Verb)
        {
            $Element = Statement_Book_Gal.new();
        }
        elsif " book\.raku ".contains($Verb)
        {
            $Element = Statement_Book_Raku.new();
        }
        elsif " book\.fallback ".contains($Verb)
        {
            $Element = Statement_Book_Fallback.new();
        }
        elsif " book\.python ".contains($Verb)
        {
            $Element = Statement_Book_Python.new();
        }
        elsif " book\.javascript ".contains($Verb)
        {
            $Element = Statement_Book_Javascript.new();
        }
        elsif " feature ".contains($Verb)
        {
            $Element = Statement_Feature.new();
        }
        elsif " thing ".contains($Verb)
        {
            $Element = Statement_Thing.new();
        }
        elsif " resource ".contains($Verb)
        {
            $Element = Statement_Resource.new();
        }
        elsif " task ".contains($Verb)
        {
            $Element = Statement_Task.new();
        }
        elsif " subtask ".contains($Verb)
        {
            $Element = Statement_Subtask.new();
        }
        elsif " workaround ".contains($Verb)
        {
            $Element = Statement_Workaround.new();
        }
        elsif " status ".contains($Verb)
        {
            $Element = Statement_Status.new();
        }
        elsif " start ".contains($Verb)
        {
            $Element = Statement_Start.new();
        }
        elsif " end ".contains($Verb)
        {
            $Element = Statement_End.new();
        }
        elsif " scene ".contains($Verb)
        {
            $Element = Statement_Scene.new();
        }
        elsif " camera ".contains($Verb)
        {
            $Element = Statement_Camera.new();
        }
        elsif " box ".contains($Verb)
        {
            $Element = Statement_Box.new();
        }
        elsif " position ".contains($Verb)
        {
            $Element = Statement_Position.new();
        }
        elsif " animation ".contains($Verb)
        {
            $Element = Statement_Animation.new();
        }
        elsif " center ".contains($Verb)
        {
            $Element = Statement_Center.new();
        }
        elsif " color ".contains($Verb)
        {
            $Element = Statement_Color.new();
        }
        elsif " rotation ".contains($Verb)
        {
            $Element = Statement_Rotation.new();
        }
        elsif " size ".contains($Verb)
        {
            $Element = Statement_Size.new();
        }
        elsif " texture ".contains($Verb)
        {
            $Element = Statement_Texture.new();
        }
        elsif " x ".contains($Verb)
        {
            $Element = Statement_X.new();
        }
        elsif " y ".contains($Verb)
        {
            $Element = Statement_Y.new();
        }
        elsif " z ".contains($Verb)
        {
            $Element = Statement_Z.new();
        }
        elsif " uuid ".contains($Verb)
        {
            $Element = Statement_Uuid.new();
        }
        else 
        {
            die "Unknown Statement '" ~ $Input_Token.Input ~ "'";
        }
        $Element.Elements.push($Input_Token);
        $Element.Verb = $Next.Input;
        $Element.Start_Position = $Input_Token.Start_Position;
        $Element.End_Position = $Input_Token.End_Position;
        $Element.Document = $Document;
        $Element.Parent = $Parent_Element;
        $Element.Block = Block.new();
        $Element.Ensure_Block();
        return $Element;
    }
    method Create_Syntax($Input_Token, $Next, $Document, $Parent_Element)
    {
        my Str $Verb = " " ~ $Next.Input.lc() ~ " ";
        my $Element;
        if " \. property prop p ".contains($Verb)
        {
            $Element = Syntax_Dot.new();
        }
        elsif " ~ attribute att symbol ".contains($Verb)
        {
            $Element = Syntax_Symbol.new();
        }
        elsif " backslash ".contains($Verb)
        {
            $Element = Syntax_Backslash.new();
        }
        elsif " : ".contains($Verb)
        {
            $Element = Syntax_Colon.new();
        }
        elsif " class ".contains($Verb)
        {
            $Element = Syntax_Class.new();
        }
        elsif " class\.attribute class\.att classatt ".contains($Verb)
        {
            $Element = Syntax_Class_Symbol.new();
        }
        elsif " class\.lookup lookup ".contains($Verb)
        {
            $Element = Syntax_Class_Lookup.new();
        }
        elsif " class\.name classname ".contains($Verb)
        {
            $Element = Syntax_Class_Name.new();
        }
        elsif " class\.property classprop cp our their ".contains($Verb)
        {
            $Element = Syntax_Class_Property.new();
        }
        elsif " dictionary dict hash ".contains($Verb)
        {
            $Element = Syntax_Dictionary.new();
        }
        elsif " entity ".contains($Verb)
        {
            $Element = Syntax_Entity.new();
        }
        elsif " exclude ".contains($Verb)
        {
            $Element = Syntax_Exclude.new();
        }
        elsif " false ".contains($Verb)
        {
            $Element = Syntax_False.new();
        }
        elsif " flag ".contains($Verb)
        {
            $Element = Syntax_Flag.new();
        }
        elsif " generator ".contains($Verb)
        {
            $Element = Syntax_Generator.new();
        }
        elsif " key ".contains($Verb)
        {
            $Element = Syntax_Key.new();
        }
        elsif " indent ".contains($Verb)
        {
            $Element = Syntax_Indent.new();
        }
        elsif " infinity ".contains($Verb)
        {
            $Element = Syntax_Infinity.new();
        }
        elsif " -infinity ".contains($Verb)
        {
            $Element = Syntax_Negative_Infinity.new();
        }
        elsif " integer ".contains($Verb)
        {
            $Element = Syntax_Integer.new();
        }
        elsif " is extends ".contains($Verb)
        {
            $Element = Syntax_Is.new();
        }
        elsif " italic ".contains($Verb)
        {
            $Element = Syntax_Italic.new();
        }
        elsif " line newline ".contains($Verb)
        {
            $Element = Syntax_Line.new();
        }
        elsif " list ".contains($Verb)
        {
            $Element = Syntax_List.new();
        }
        elsif " my self this me i ".contains($Verb)
        {
            $Element = Syntax_My.new();
        }
        elsif " my\.attribute my\.symbol ".contains($Verb)
        {
            $Element = Syntax_My_Symbol.new();
        }
        elsif " my\.class self\.class me\.class us ".contains($Verb)
        {
            $Element = Syntax_My_Class.new();
        }
        elsif " node ".contains($Verb)
        {
            $Element = Syntax_Node.new();
        }
        elsif " null ".contains($Verb)
        {
            $Element = Syntax_Null.new();
        }
        elsif " number ".contains($Verb)
        {
            $Element = Syntax_Number.new();
        }
        elsif " optional ".contains($Verb)
        {
            $Element = Syntax_Optional.new();
        }
        elsif " optional\.repeating optrep ".contains($Verb)
        {
            $Element = Syntax_Optrep.new();
        }
        elsif " repeating ".contains($Verb)
        {
            $Element = Syntax_Repeating.new();
        }
        elsif " string ".contains($Verb)
        {
            $Element = Syntax_String.new();
        }
        elsif " tab ".contains($Verb)
        {
            $Element = Syntax_Tab.new();
        }
        elsif " true ".contains($Verb)
        {
            $Element = Syntax_True.new();
        }
        elsif " variant ".contains($Verb)
        {
            $Element = Syntax_Variant.new();
        }
        elsif " red ".contains($Verb)
        {
            $Element = Syntax_Red.new();
        }
        else 
        {
            die "Unknown Syntax '" ~ $Next.Input ~ "'";
        }
        $Element.Elements.push($Input_Token);
        $Element.Start_Position = $Input_Token.Start_Position;
        $Element.End_Position = $Input_Token.End_Position;
        $Element.Document = $Document;
        $Element.Parent = $Parent_Element;
        Factory.Add_Index($Element);
        return $Element;
    }
    method Create_Token(Str $Char, Str $Next, Int $Position)
    {
        my $New_Token;
        if Token_Operation_Start.Predict($Char, $Next)
        {
            $New_Token = Token_Operation_Start.new();
        }
        elsif Token_Operation_End.Predict($Char, $Next)
        {
            $New_Token = Token_Operation_End.new();
        }
        elsif Token_Syntax_Start.Predict($Char, $Next)
        {
            $New_Token = Token_Syntax_Start.new();
        }
        elsif Token_Syntax_End.Predict($Char, $Next)
        {
            $New_Token = Token_Syntax_End.new();
        }
        elsif Token_Block_Start.Predict($Char, $Next)
        {
            $New_Token = Token_Block_Start.new();
        }
        elsif Token_Block_End.Predict($Char, $Next)
        {
            $New_Token = Token_Block_End.new();
        }
        elsif Token_Semi.Predict($Char, $Next)
        {
            $New_Token = Token_Semi.new();
        }
        elsif Token_Comma.Predict($Char, $Next)
        {
            $New_Token = Token_Comma.new();
        }
        elsif Token_Class_Name.Predict($Char, $Next)
        {
            $New_Token = Token_Class_Name.new();
        }
        elsif Token_Name.Predict($Char, $Next)
        {
            $New_Token = Token_Name.new();
        }
        elsif Token_Keyvalue_Start.Predict($Char, $Next)
        {
            $New_Token = Token_Keyvalue_Start.new();
        }
        elsif Token_Keyvalue_End.Predict($Char, $Next)
        {
            $New_Token = Token_Keyvalue_End.new();
        }
        elsif Quote.Predict($Char, $Next)
        {
            $New_Token = Quote.new();
        }
        elsif Token_Space.Predict($Char, $Next)
        {
            $New_Token = Token_Space.new();
        }
        elsif Number.Predict($Char, $Next)
        {
            $New_Token = Number.new();
        }
        else 
        {
            $New_Token = Token_Name.new();
        }
        $New_Token.Input = $Char;
        $New_Token.Start_Position = $Position;
        $New_Token.End_Position = $Position;
        Factory.Add_Index($New_Token);
        return $New_Token;
    }
} 
# "Compiler\.gal"
class Compiler
{
    our $.Instance;
    has Bool $.Class_Export is rw = False;
    has %.Class_Index is rw;
    has Bool $.Class_Keep_Verbs is rw = True;
    has Bool $.Element_Dialect is rw = False;
    has Bool $.Element_List is rw = False;
    has Bool $.Generate_Fallback is rw = False;
    has Bool $.Generate_Gal is rw = False;
    has $.Language is rw;
    has @.Operation_Index is rw;
    has @.Operations is rw;
    has Bool $.Show_Output is rw = False;
    has Bool $.Sideways is rw = False;
    has @.Statement_Index is rw;
    has @.Statements is rw;
    has @.Syntax_Index is rw;
    has @.Syntaxes is rw;
    has @.Test_Errors is rw;
    has Bool $.Token_Dialect is rw = False;
    has Bool $.Token_List is rw = False;
    has Bool $.Verb_Export is rw = False;
    has %.Verb_Index is rw;
    has Bool $.Verb_Keep_Handlers is rw = True;
    has Bool $.Verbose is rw = False;
    method Add_Class($Statement)
    {
        my Str $Name = $Statement.Name_Prefix ~ $Statement.Class_Name.Input;
        if %.Class_Index{$Name}:exists
        {
            my $Existing = %.Class_Index{$Name};
            return if $Existing.Am_Earlier(self);
        }
        $.Class_Index{$Name} = $Statement;
        # $writeline "Successfully added " $Name " to class index\."
    }
    method Add_Definition($Element)
    {
        if ($Element ~~ Statement_Statement)
        {
            @.Statements.push($Element);
        }
        elsif ($Element ~~ Statement_Operation)
        {
            @.Operations.push($Element);
        }
        elsif ($Element ~~ Statement_Syntax)
        {
            @.Syntaxes.push($Element);
        }
    }
    method Add_Verb($Statement)
    {
        my Str $Signature = $Statement.Method_Signature;
        $.Verb_Index{$Signature} = $Statement;
        # "writeline 'Successfully added ' Signature ' to verb index\.';"
    }
    method Error_Check($This_Document, $Context)
    {
        my Str $Error_Report = "";
        my Int $Element_Number = 0;
        my $This_Element;
        for $This_Document.Document_Body -> $This_Element
        {
            $Element_Number++;
            if defined($This_Element.Error)
            {
                if $This_Element.Error gt ""
                {
                    $Error_Report ~= $Element_Number ~ " " ~ $This_Element.To_String() ~ "\n";
                }
            }
        }
        if $Error_Report gt ""
        {
            say "ERROR REPORT in $Context";
            say $Error_Report;
            die "EXITING due to error in $Context";
        }
    }
    method Export_Elements($Parser)
    {
        my $This_Element;
        for $Parser.Document_Body -> $This_Element
        {
            if ($This_Element ~~ Named_Element)
            {
                say $This_Element.^name ~ " '" ~ $This_Element.Gs_Keyword ~ "',";
            }
            else 
            {
                say "element " ~ $This_Element.^name ~ ";";
            }
        }
        say "";
    }
    method Export_Tokens($Parser)
    {
        my $Item;
        for $Parser.Tokens -> $Item
        {
            say "element " ~ $Item.^name ~ ";";
        }
    }
    method Generate_Factory()
    {
        my Str $Definition_Methods = "todo \"Tokens\";\n";
        $Definition_Methods ~= self.Generate_Factory_Method("Statement", $.Statements);
        $Definition_Methods ~= self.Generate_Factory_Method("Operation", $.Operations);
        $Definition_Methods ~= self.Generate_Factory_Method("Syntax", $.Syntaxes);
        # TODO: Indent Definition Methods
        my Str $Factory_Code = "class Factory\n\{\n$Definition_Methods\}\n";
        return $Factory_Code;
    }
    method Generate_Factory_Method(Str $Type, @Definition_List)
    {
        my Str $Header = "method entity Create_$Type \[entity Input_Token, entity Next, entity Document, entity Parent_Element\]\n        \{\n            string Verb ' ' \(lowercase \[\. Input_Token Input\]\) ' ';\n            entity Element;\n        ";
        my Str $Tail = "    else\n            \{\n                error \"Unknown $Type '\" \[\. Input_Token Input\] \"'\";\n            \}\n            list\.append \[\. Element Elements\] Input_Token;\n            \.= Element Verb \[\. Next Input\];\n            \.= Element Start_Position \[\. Input_Token Start_Position\];\n            \.= Element End_Position \[\. Input_Token End_Position\];\n            \.= Element Document Document;\n            \.= Element Parent Parent_Element;\n            : Factory Add_Index Element;\n            return Element;\n        \}";
        my Str $Else = "";
        my $Definition;
        my Str $Class_Name;
        my Str $Declaration = "";
        for @Definition_List -> $Definition
        {
            $Class_Name = $Definition.Class_Name.Input;
            my Str $Aliases = $Definition.Aliases;
            my Str $Options = " $Class_Name $Aliases ";
            $Declaration ~= "    $Else";
            $Declaration ~= "if \(contains \"$Options\" Verb\) \{ new Element $Class_Name; \}\n";
            $Else = "else\.";
        }
        my Str $Code = $Header ~ $Declaration ~ $Tail;
        return $Code;
    }
    method Get_Class(Str $Name)
    {
        try {
            return %.Class_Index{$Name};
        
        CATCH { default {
            return "";
        } } }
    }
    method Get_Verb(Str $Name)
    {
        try {
            return %.Verb_Index{$Name};
        
        CATCH { default {
            return "";
        } } }
    }
    method Show_Elements($Parser)
    {
        my $This_Element;
        my Int $Element_Number = 0;
        say "Elements:";
        for $Parser.Document_Body -> $This_Element
        {
            $Element_Number++;
            if (($This_Element ~~ Token)) || (($This_Element ~~ Element))
            {
                say $Element_Number ~ " " ~ $This_Element.To_String();
            }
            else 
            {
                say $Element_Number ~ ": \"$This_Element\"";
            }
        }
        say "";
    }
    method Show_Tokens($Parser)
    {
        say "Tokens:";
        my $Item;
        my Int $Item_Number = 0;
        for $Parser.Tokens -> $Item
        {
            $Item_Number++;
            if ($Item ~~ Token)
            {
                say $Item_Number ~ " " ~ $Item.To_String();
            }
            else 
            {
                say $Item_Number ~ ": \"$Item\"";
            }
        }
    }
    method Test()
    {
        my $Element;
        my Int $Test_Count = 0;
        my @Errors;
        # TODO: my.verbose statement
        if $.Verbose
        {
            say "Testing Operations";
        }
        for @.Operations -> $Element
        {
            $Element.Test(@Errors, $.Verbose);
            $Test_Count++;
        }
        if $.Verbose
        {
            say "Testing Statements";
        }
        for @.Statements -> $Element
        {
            $Element.Test(@Errors, $.Verbose);
            $Test_Count++;
        }
        if $.Verbose
        {
            say "Testing Syntaxes";
        }
        for @.Syntaxes -> $Element
        {
            $Element.Test(@Errors, $.Verbose);
            $Test_Count++;
        }
        if $.Verbose
        {
            say "Tests: $Test_Count";
            say "Errors: " ~ @Errors.elems;
        }
        # TODO: our= Test_Errors Errors
    }
    method Translate(Str $Translation, Str $Source, Str $Target)
    {
        if $.Verbose
        {
            say "translating $Translation file $Source to $Target";
        }
        my $Parser;
        my $Generator;
        if $Translation eq "gal"
        {
            $Parser = Gal_Input.new();
            $Generator = Gal_Output.new();
            $.Class_Export = True;
        }
        elsif $Translation eq "fallback"
        {
            $Parser = Gal_Input.new();
            $Generator = Fallback_Output.new();
        }
        elsif $Translation eq "python"
        {
            $Parser = Gal_Input.new();
            $Generator = Python_Output.new();
        }
        elsif $Translation eq "javascript"
        {
            $Parser = Gal_Input.new();
            $Generator = Javascript_Output.new();
        }
        else 
        {
            die "Unsupported translation '$Translation'\.";
        }
        $Parser.File_Name = $Source;
        $Generator.File_Name = $Target;
        # optimize human outcome.  
        if $.Verbose
        {
            say "    reading $Source";
        }
        $Parser.Read();
        if $.Verbose
        {
            say "    read complete";
        }
        self.Error_Check($Parser, "reading");
        if $.Verbose
        {
            say "    tokenizing $Source";
        }
        $Parser.Tokenize();
        if $.Token_List
        {
            self.Show_Tokens($Parser);
        }
        if $.Token_Dialect
        {
            self.Export_Tokens($Parser);
        }
        self.Error_Check($Parser, "tokenizing");
        if $.Verbose
        {
            say "    parsing $Source";
        }
        $Parser.Parse();
        self.Error_Check($Parser, "parsing");
        if $.Verbose
        {
            say "    attributes $Source";
        }
        $Parser.Child_Attributes();
        self.Error_Check($Parser, "attributes");
        if $.Verbose
        {
            say "    structure $Source";
        }
        $Parser.Structure();
        self.Error_Check($Parser, "structure");
        if $.Verbose
        {
            say "    model $Source";
        }
        $Parser.Base_Model();
        self.Error_Check($Parser, "model");
        if $.Verbose
        {
            say "    generating $Target";
        }
        $Generator.Generate($Parser);
        self.Error_Check($Parser, "generate");
        if $.Element_List
        {
            self.Show_Elements($Parser);
        }
        if $.Element_Dialect
        {
            self.Export_Elements($Parser);
        }
        my Str $Output_Code = $Generator.Get($Parser);
        if $.Show_Output
        {
            say $Output_Code;
        }
        $Generator.Input = $Output_Code;
        $Generator.File_Name = $Target;
        if $.Verbose
        {
            say "    write $Target";
        }
        $Generator.Write();
        my Str $Test_Target = $Target ~ "\.gs";
        my $Test_Gen;
        $Test_Gen = Test_Output.new();
        $Test_Gen.Generate($Parser);
        my Str $Test_Code = $Test_Gen.Get($Parser);
        $Test_Gen.Input = $Test_Code;
        $Test_Gen.File_Name = $Test_Target;
        $Test_Gen.Write();
    }
} 
class Dialect
{
    has Str $.Name_Prefix is rw;
    has @.Operations is rw;
    has @.Statements is rw;
    has @.Syntaxes is rw;
    method Import()
    {
        my $Element;
        my Str $Name;
        for @.Statements -> $Element
        {
            for $Element.Names -> $Name
            {
                $.Statements{$Name} = $Element;
            }
        }
        for @.Operations -> $Element
        {
            for $Element.Names -> $Name
            {
                $.Operations{$Name} = $Element;
            }
        }
        for @.Operations -> $Element
        {
            for $Element.Names -> $Name
            {
                $.Operations{$Name} = $Element;
            }
        }
    }
    method Know()
    {
        my $Element;
        my Str $Prefix = $.Name_Prefix ~ "\.";
        my Str $Name;
        my Str $Full_Name;
        for @.Statements -> $Element
        {
            for $Element.Names -> $Name
            {
                $Full_Name = "$Prefix$Name";
                $.Statement_Index{$Full_Name} = $Element;
            }
        }
        for @.Operations -> $Element
        {
            for $Element.Names -> $Name
            {
                $Full_Name = "$Prefix$Name";
                $.Operation_Index{$Full_Name} = $Element;
            }
        }
        for @.Syntaxes -> $Element
        {
            for $Element.Names -> $Name
            {
                $Full_Name = "$Prefix$Name";
                $.Syntax_Index{$Full_Name} = $Element;
            }
        }
    }
} 
sub MAIN(Str $Translation, Str $Source, Str $Target)
{
    my $Comp_Instance;
    $Comp_Instance = Compiler.new();
    Compiler.Instance = $Comp_Instance;
    $Comp_Instance.Translate($Translation, $Source, $Target);
}
