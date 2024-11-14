#!/usr/bin/python
import sys
import re
import zdebug
from gal_preamble import gal

class Gal_Class:
    pass
class Symbol (Gal_Class):
    def __init__(self):
        super().__init__()
        self.Symbol_Owner = None
        self.Symbol_Value = None
    # comment "definitiona bound property entity representing the entity's relationship with this attribute";
class Number_Symbol (Symbol):
    def __init__(self):
        super().__init__()
        self.Symbol_Value = None
class String_Symbol (Symbol):
    def __init__(self):
        super().__init__()
        self.Symbol_Value = None
class Entity_Symbol (Symbol):
    def __init__(self):
        super().__init__()
        self.Symbol_Value = None
class Flag_Symbol (Symbol):
    def __init__(self):
        super().__init__()
        self.Symbol_Value = None
class Attribute (Symbol):
    def __init__(self):
        super().__init__()
        self.Attribute_Entity = None
        self.Attribute_Value = None
        self.Attribute_Certainty = 0
    # comment 'definitionA single-valued attribute having a primitive data type.';
    def Assign(self, Value, Certainty = 0):
        self.Attribute_Value = Value
        self.Attribute_Certainty = Certainty
    def Get_Value(self):
        return self.Attribute_Value
    def Get_Certainty(self):
        return self.Attribute_Certainty
# comment 'Token.gal';
# forward Factory
# forward Block
# forward Statement
# forward Operation
# forward Syntax
# forward Keyvalue
# forward Compiler
class Token:
    def __init__(self):
        super().__init__()
        self.Input = None
        self.Document = None
        self.Start_Position = None
        self.End_Position = None
        self.Gal = None
        self.Fallback = None
        self.Debug = None
        self.Python = None
        self.Javascript = None
        self.Mumps = None
        self.Error = None
        self.Test_Case = None
        self.Is_Verb = False
        self.Usage = None
        self.Method_Context = None
        self.Variable_Context = None
        self.Parent = None
        self.Class_Owner = None
        self.Method_Name = None
    def Get_Input(self):
        return self.Input
    def To_String(self):
        String = str(self.__class__.__name__) + " " + str(self.Input) + " " + str(self.Start_Position) + '-' + str(self.End_Position)
        if self.Error is not None:
            String += ' ERROR<' + str(self.Error) + '>'
        return String
    def Compare(self, Element):
        My_End = self.End_Position
        Elem_End = Element.End_Position
        if My_End > Elem_End:
            return 1
        if My_End < Elem_End:
            return -1
        My_Start = self.Start_Position
        Elem_Start = Element.Start_Position
        if My_Start > Elem_Start:
            return -1
        if My_Start < Elem_Start:
            return 1
        return 0
    @classmethod
    def Predict(cls, Character, Next):
        return False
    def Append(self, Character, Next):
        if not self.__class__.Predict(Character, Next):
            return False
        self.Input += str(Character)
        self.End_Position += 1
        return True
    def Attributes(self):
        pass
    def Process_Arguments(self):
        pass
    def Structure(self):
        pass
    def Model(self):
        pass
    def Class_Export(self):
        pass
    def Verb_Export(self):
        pass
    def Gal_Generate(self):
        self.Gal = self.Input
    def Fallback_Generate(self):
        self.Fallback = self.Input
    def Debug_Generate(self):
        self.Debug = self.Input
    def Python_Generate(self):
        self.Python = self.Input
    def Javascript_Generate(self):
        self.Javascript = self.Input
    def Mumps_Generate(self):
        self.Mumps = self.Input
    def Python_Atom(self, Precedence):
        return self.Python
    def Javascript_Atom(self, Precedence):
        Code = str(self.Javascript)
        return Code
    def Gal_Code(self):
        return self.Input
    def Enquote(self, Text):
        if not "'" in Text:
            return "'"  +  Text  +  "'"
        if not '"' in Text:
            return '"'  +  Text  +  '"'
        if not "`" in Text:
            return "`"  +  Text  +  "`"
        if not '“' in Text and not '”' in Text:
            return '“'  +  Text  +  '”'
        if not '‘' in Text and not '’' in Text:
            return '‘'  +  Text  +  '’'
        if not '«' in Text and not '»' in Text:
            return '«'  +  Text  +  '»'
        if not '‹' in Text and not '›' in Text:
            return '‹'  +  Text  +  '›'
        return "'ERROR gal token DEEPLY ENQUOTED STRING FAILED HERE'"
    def Test_Generate(self):
        Code = ''
        if self.Gal is not None:
            Code += str("    ") + 'gal = ' + str(self.Enquote(self.Gal)) + ';' + str('\n')
        if self.Fallback is not None:
            Code += str("    ") + 'fallback = ' + str(self.Enquote(self.Fallback)) + ';' + str('\n')
        if self.Python is not None:
            Code += str("    ") + 'python = ' + str(self.Enquote(self.Python)) + ';' + str('\n')
        if self.Javascript is not None:
            Code += str("    ") + 'javascript = ' + str(self.Enquote(self.Javascript)) + ';' + str('\n')
        if str(Code) > '':
            Full_Code = 'test case ' + str(self.__class__.__name__) + ' {' + str('\n') + str(Code) + '}' + str('\n')
            self.Test_Case = Full_Code
class Token_Space (Token):
    @classmethod
    def Predict(cls, Character, Next):
        return not(re.match(r"\S",Character))
class Value_Token (Token):
    pass
class Token_Name (Value_Token):
    @classmethod
    def Predict(cls, Character, Next):
        if not(re.match(r"\S",Character)):
            return False
        if Character in '[]{}<>();,"`':
            return False
        if str(Character) == "'":
            return False
        return True
    def Append(self, Character, Next):
        if not(re.match(r"\S",Character)):
            return False
        if Character in '[]{}<>();,"`':
            return False
        if str(Character) == "'":
            return False
        self.Input += str(Character)
        self.End_Position += 1
        return True
    def Python_Generate(self):
        Code = str(self.Input)
        if ':' in Code:
            if str(Code[0]) == ':':
                Code = Code[1:]
            Code = Code.replace(':', '_')
            # comment 'writelineToken.Name  [my Input]--> Code';
        self.Python = Code
    def Javascript_Generate(self):
        Code = str(self.Input)
        if ':' in Code:
            if str(Code[0]) == ':':
                Code = Code[1:]
            Code = Code.replace(':', '_')
        self.Javascript = Code
    def Unquoted(self):
        Text = str(self.Input)
        return Text
class Token_Class_Name (Token_Name):
    @classmethod
    def Predict(cls, Character, Next):
        if not(re.match(r"\S",Character)):
            return False
        if str(Character) != ':':
            return False
        if not(re.match(r"\S",Next)):
            return False
        return True
class Number (Value_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return Character in '0123456789.-'
class Quote (Value_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == '"' or str(Character) == "'" or str(Character) == '`'
    def Append(self, Character, Next):
        Text = str(self.Input)
        First = str(Text[0])
        Last = str(Text[-1])
        if str(First) == str(Last) and len(Text) > 1:
            return False
        self.Input += str(Character)
        self.End_Position += 1
        return True
    def Unquoted(self):
        Text = str(self.Input)
        Length = len(Text)
        Middle = str(Text[1:(1)+(Length - 2)])
        return Middle
    def Gal_Generate(self):
        Code = str(self.Input)
        if '\n' in self.Input:
            Line = None
            Expressions = ''
            Q = str(Code[0])
            Code = Code[1:(1)+(len(Code) - 2)]
            for Line in Code.split('\n'):
                if str(Expressions) != '':
                    Expressions += ' [line] '
                Expressions += str(Q) + str(Line) + str(Q)
            Code = '(append '  +  Expressions  +  ')'
        self.Gal = Code
    def Fallback_Generate(self):
        Code = str(self.Input)
        if '\n' in self.Input:
            Line = None
            Expressions = ''
            Q = str(Code[0])
            Code = Code[1:(1)+(len(Code) - 2)]
            for Line in Code.split('\n'):
                if str(Expressions) != '':
                    Expressions += ' [line] '
                Expressions += str(Q) + str(Line) + str(Q)
            Code = '(append '  +  Expressions  +  ')'
        self.Fallback = Code
    def Python_Generate(self):
        Input = str(self.Input)
        if gal.backslash() in Input:
            Input = Input.replace(gal.backslash(), gal.backslash(2))
        Q = str(Input[0])
        Middle = str(Input[1:(1)+(len(Input) - 2)])
        if '\n' in Middle or str(Q) == '`':
            Q = "'''"
        Code = str(Q) + str(Middle) + str(Q)
        self.Python = Code
    def Javascript_Generate(self):
        Input = str(self.Input)
        if gal.backslash() in Input:
            Input = Input.replace(gal.backslash(), gal.backslash(2))
        self.Javascript = Input
class Boundary_Token (Token):
    def Append(self, Character, Next):
        return False
class Start_Token (Boundary_Token):
    pass
class End_Token (Boundary_Token):
    pass
class Token_Semi (End_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == ';'
class Token_Block_Start (Start_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == '{'
class Token_Block_End (End_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == '}'
class Token_Operation_Start (Start_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == '('
class Token_Operation_End (End_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == ')'
class Token_Syntax_Start (Start_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == '['
class Token_Syntax_End (End_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == ']'
class Token_Keyvalue_Start (Start_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == '<'
class Token_Keyvalue_End (End_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == '>'
class Token_Comma (Boundary_Token):
    @classmethod
    def Predict(cls, Character, Next):
        return str(Character) == ','
# comment 'Element.gal';
# forward Gal
# forward Python
# forward Javascript
# forward Sql
class Element:
    Js_Precedence = 99
    Verbose = False
    def __init__(self):
        super().__init__()
        self.Dialect = ''
        self.Input = ''
        self.Start_Position = -1
        self.End_Position = -1
        self.Document = None
        self.Parent = None
        self.Gal = None
        self.Debug = None
        self.Fallback = None
        self.Python = None
        self.Javascript = None
        self.Mumps = None
        self.Php = None
        self.Java = None
        self.Sql = None
        self.Gal_Declaration = None
        self.Fallback_Declaration = None
        self.Tokens = []
        self.Class_Context = None
        self.Method_Context = None
        self.Variable_Context = None
        self.Document_Body = []
        self.Elements = []
        self.Error = None
        self.Is_Verb = False
        self.Usage = ''
        self.Re_Structure = True
        self.Block = None
        self.Data_Type = None
        self.Method_Signature = ''
        self.Class_Owner = None
        self.Method_Name = None
        self.Test_Case = None
    @classmethod
    def Test(cls, Errors, Verbose):
        Error_Message = str(self.__class__.__name__) + ' does not override base Test method.'
        Errors.extend([Error_Message])
        if Verbose:
            print(Error_Message)
    def Validate(self):
        return True
    def Lookup(self, Element_Name):
        if self.Parent:
            return self.Parent.Lookup(Element_Name)
        return False
    def Model(self):
        pass
    def Pre_Fallback(self):
        pass
    def To_String(self):
        String = str(self.__class__.__name__) + ': '
        try:
            String += str(self.Start_Position)
        except Exception:
            String += '<Start?>'
        try:
            String += '-' + str(self.End_Position)
        except Exception:
            String += '-<End?>'
        try:
            if self.Error is not None:
                String += ' ERROR <' + str(self.Error) + '>'
        except Exception:
            String += ' ok'
        String += ' <' + str(self.Get_Input()) + '> '
        return String
    def Am(self, Other):
        My_Text = str(self.To_String())
        Other_Text = str(Other.To_String())
        return str(My_Text) == str(Other_Text)
    def Am_Earlier(self, Other):
        if not isinstance(Other, Element):
            return True
        if Other.Start_Position < 0:
            return True
        if self.Start_Position < 0:
            return False
        return self.Start_Position < Other.Start_Position
    def String_Info(self):
        return '.'
    def Get_Input(self):
        if not self.Document is not None:
            return '<no document>'
        if self.Start_Position < 0:
            return '<negative start>'
        String_Length = self.End_Position - self.Start_Position + 1
        Input = str(self.Document.Input)
        Start = self.Start_Position
        Text = str(Input[Start:(Start)+(String_Length)])
        return Text
    def Compare(self, Element):
        My_End = self.End_Position
        Elem_End = Element.End_Position
        if My_End > Elem_End:
            return 1
        if My_End < Elem_End:
            return -1
        My_Start = self.Start_Position
        Elem_Start = Element.Start_Position
        if My_Start > Elem_Start:
            return -1
        if My_Start < Elem_Start:
            return 1
        return 0
    def Inference_Context(self):
        if not self.Parent is not None:
            return None
        return self.Parent.Inference_Context()
    def Gal_Generate(self):
        raise Exception("Must Override Gal_Generate")
    def Debug_Generate(self):
        raise Exception("Must Override Debug_Generate")
    def Fallback_Generate(self):
        self.Fallback = self.Gal
    def Php_Generate(self):
        raise Exception("Must Override Php_Generate")
    def Java_Generate(self):
        raise Exception("Must Override Java_Generate")
    def Test_Generate(self):
        Child_Code = ''
        Element = None
        for Element in self.Elements:
            if not Element.Test_Case is not None:
                continue
            Child_Code += str(Element.Test_Case) + str('\n')
        Code = ''
        if self.Gal is not None:
            Code += 'gal = ' + str(self.Enquote(self.Gal)) + ';' + str('\n')
        if self.Fallback is not None:
            Code += 'fallback = ' + str(self.Enquote(self.Fallback)) + ';' + str('\n')
        if self.Python is not None:
            Code += 'python = ' + str(self.Enquote(self.Python)) + ';' + str('\n')
        if self.Javascript is not None:
            Code += 'javascript = ' + str(self.Enquote(self.Javascript)) + ';' + str('\n')
        if str(Code) > '':
            Full_Code = str(Child_Code) + 'test case ' + str(self.__class__.__name__) + str('\n') + '{' + str('\n') + str(self.Indent(Code)) + '}' + str('\n')
            self.Test_Case = Full_Code
    def Gal_Add_Token(self, Token):
        return -1
    def Gal_Add_Element(self, Child_Element):
        # comment 'writelineappend element  [class.name]';
        if Child_Element.End_Position > self.End_Position:
            self.End_Position = Child_Element.End_Position
        self.Elements.extend([Child_Element])
    def Gal_Tokenize(self):
        Text = str(self.Input)
        Char = str(Text[0])
        Next = str(Text[1])
        End = len(Text) - 1
        Position = 0
        Token = Factory.Create_Token(Char, Next, Position)
        if not isinstance(Token, Token_Space):
            self.Tokens.extend([Token])
        for Position in range(1, End+1):
            Char = Text[Position]
            if Position < End:
                Next = Text[Position + 1]
            else:
                Next = ''
            if Token.Append(Char, Next):
                continue
            Token = Factory.Create_Token(Char, Next, Position)
            if not Token:
                return False
            if isinstance(Token, Token_Space):
                continue
            self.Tokens.extend([Token])
        return True
    def Gal_Parse(self):
        Gal.Parse_Element(self)
    def Javascript_Parse(self):
        # comment "TODO:" "Parse this element's tokens into Javascript language elements.";
        Javascript.Parse_Element(self)
    def Python_Parse(self):
        # comment "TODO:" "Parse this element's tokens into Python language elements.";
        Python.Parse_Element(self)
    def Sql_Parse(self):
        # comment "TODO:" "Parse this element's tokens into SQL language elements.";
        Sql.Parse_Element(self)
    def Structure(self):
        if not self.Re_Structure:
            return
        self.Re_Structure = False
        # comment 'writeline     Element Structure  [class.name]';
        self.Base_Structure()
        Element = None
        for Element in self.Elements:
            if self.Method_Context is not None and not Element.Method_Context is not None:
                Element.Method_Context = self.Method_Context
            if self.Variable_Context is not None and not Element.Variable_Context is not None:
                Element.Variable_Context = self.Variable_Context
            # comment '.= Element Parent [self]';
            Element.Structure()
    def Base_Model(self):
        # comment 'writeline     Element Model  [class.name]';
        This_Element = None
        for This_Element in self.Document_Body:
            # comment "writeline ' - model ' (. This_Element To_String);";
            try:
                This_Element.Model()
            except Exception as Error:
                zdebug.zbreak()
                print("ERROR modeling ", This_Element.To_String(), ': ', Error, sep='')
                This_Element.Error = Error
    def Base_Structure(self):
        pass
    def Child_Attributes(self):
        Element = None
        for Element in self.Document_Body:
            Error = None
            try:
                Element.Attributes()
                Element.Process_Arguments()
            except Exception as Error:
                # comment 'debug';
                print('Child_Attributes error <', Error, '> on Element ', Element.To_String(), sep='')
                Element.Error = Error
    def Attributes(self):
        pass
    def Process_Arguments(self):
        pass
    def Validate(self):
        return True
    def Class_Export(self):
        pass
    def Verb_Export(self):
        pass
    def Javascript_Generate(self):
        raise Exception(str(self.__class__.__name__) + ' must override Javascript_Generate')
    def Python_Generate(self):
        raise Exception(str(self.__class__.__name__) + ' must override Python_Generate')
    def Sql_Generate(self):
        raise Exception(str(self.__class__.__name__) + ' must override Sql_Generate')
    def Mumps_Generate(self):
        raise Exception(str(self.__class__.__name__) + ' must override Mumps_Generate')
    def Gal_Block(self):
        Gal_Code = ';'
        if self.Block is not None and self.Block.Gal is not None:
            Gal_Code = self.Block.Gal
        return Gal_Code
    def Fallback_Block(self):
        if self.Block is not None:
            return self.Block.Fallback
        return ';'
    def Python_Block(self):
        try:
            if self.Block is not None and self.Block.Python is not None:
                if str(self.Block.Python) > '':
                    return self.Block.Python
        except Exception:
            pass
        return ':'  +  '\n'  +  "    "  +  'pass'  +  '\n'
    def Python_Statements(self):
        try:
            if self.Block is not None and self.Block.Python_Statements is not None:
                if str(self.Block.Python_Statements) > '':
                    return self.Block.Python_Statements
        except Exception:
            pass
        return ''
    def Javascript_Block(self):
        try:
            if self.Block is not None and self.Block.Javascript is not None:
                if str(self.Block.Javascript) > '':
                    return self.Block.Javascript
        except Exception:
            pass
        return ' { } '
    def Javascript_Statements(self):
        try:
            if self.Block is not None and self.Block.Javascript_Statements is not None:
                if str(self.Block.Javascript_Statements) > '':
                    return self.Block.Javascript_Statements
        except Exception:
            pass
        return ''
    def Fallback_Args(self):
        Argument = None
        Args_Gal = ''
        for Argument in self.Listargs:
            Arg_Gal = str(Argument.Fallback)
            Args_Gal += ' ' + str(Arg_Gal)
        return Args_Gal
    def Python_Args(self, Separator):
        Argument = None
        Args_Py = ''
        Between = ''
        for Argument in self.Listargs:
            if not Argument.Python is not None:
                raise Exception('Argument Python not defined: ' + str(Argument.Gal))
            Arg_Py = str(Argument.Python)
            Args_Py += str(Between) + str(Arg_Py)
            Between = Separator
        return Args_Py
    def Python_String_Args(self, Separator):
        Argument = None
        Args_Py = ''
        Between = ''
        for Argument in self.Listargs:
            if not Argument.Python is not None:
                raise Exception('Argument Python not defined: ' + str(Argument.Gal))
            Arg_Py = str(Argument.Python)
            if isinstance(Argument, Quote):
                Args_Py += str(Between) + str(Arg_Py)
            else:
                Args_Py += str(Between) + 'str(' + str(Arg_Py) + ')'
            Between = Separator
        return Args_Py
    def Javascript_Args(self, Separator):
        Argument = None
        Args_Js = ''
        Between = ''
        for Argument in self.Listargs:
            if not Argument.Javascript is not None:
                raise Exception('Argument Javascript not defined: ' + str(Argument.Gal))
            Arg_Js = str(Argument.Javascript)
            Args_Js += str(Between) + str(Arg_Js)
            Between = Separator
        return Args_Js
    def Mumps_Args(self, Separator):
        Argument = None
        Args_M = ''
        Between = ''
        for Argument in self.Listargs:
            Arg_M = str(Argument.Mumps)
            Args_M += str(Between) + str(Arg_M)
            Between = Separator
        return Args_M
    def Fallback_Arguments(self):
        Argument = None
        Args_Code = ''
        for Argument in self.Arguments:
            Args_Code += ' ' + str(Argument.Fallback)
        return Args_Code
    def Argument_String(self):
        Argument = None
        Args_Code = ''
        Between = ''
        for Argument in self.Arguments:
            if isinstance(Argument, Quote):
                Args_Code += str(Argument.Unquoted())
            else:
                Args_Code += str(Between) + str(Argument.Gal_Code())
                Between = ' '
        return Args_Code
    def Python_Arguments(self, Separator):
        Argument = None
        Args_Py = ''
        Between = ''
        for Argument in self.Arguments:
            Arg_Py = str(Argument.Python)
            Args_Py += str(Between) + str(Arg_Py)
            Between = Separator
        return Args_Py
    def Javascript_Arguments(self, Separator):
        Argument = None
        Args_Js = ''
        Between = ''
        for Argument in self.Arguments:
            Arg_Js = str(Argument.Javascript)
            Args_Js += str(Between) + str(Arg_Js)
            Between = Separator
        return Args_Js
    def Mumps_Arguments(self, Separator):
        Argument = None
        Args_M = ''
        Between = ''
        for Argument in self.Arguments:
            Arg_M = str(Argument.Mumps)
            Args_M += str(Between) + str(Arg_M)
            Between = Separator
        return Args_M
    def Indent(self, Input):
        Lines = Input.split('\n')
        Line = None
        Indented = ''
        for Line in Lines:
            if str(Line) > '':
                Indented += str("    ") + str(Line) + str('\n')
        return Indented
    def Pascal_Case(self, Input):
        Name = str(Input.lower())
        Words = Name.split('_')
        Pascal = ''
        I = None
        End = len(Words) - 1
        W = None
        Between = ''
        One_Word = None
        for I in range(0, End+1):
            W = Words[I]
            One_Word = W[0].upper()  +  W[1:]
            Pascal += str(Between) + str(One_Word)
            Between = '_'
        return Pascal
    def Python_Atom(self, Precedence):
        Code = str(self.Python)
        try:
            if Precedence > self.__class__.Js_Precedence:
                Code = '('  +  Code  +  ')'
        except Exception:
            pass
        return Code
    def Javascript_Atom(self, Precedence):
        Code = str(self.Javascript)
        try:
            if Precedence > self.__class__.Js_Precedence:
                Code = '('  +  Code  +  ')'
        except Exception:
            pass
        return Code
    def Code_Context(self):
        Start = self.Start_Position
        End = self.End_Position
        Length = End - Start + 1
        Window = 50
        Before = Start - Window
        BL = Window
        if Before < 0:
            BL = Window + Before
            Before = 0
        Prefix = str(self.Document.Input[Before:(Before)+(BL)])
        Middle = str(self.Document.Input[Start:(Start)+(Length)])
        Suffix = str(self.Document.Input[End + 1:(End + 1)+(Window)])
        Context = str(Prefix) + '<*' + str(Middle) + '*>' + str(Suffix)
        return Context
    def Enquote(self, Text):
        if not "'" in Text:
            return "'"  +  Text  +  "'"
        if not '"' in Text:
            return '"'  +  Text  +  '"'
        if not "`" in Text:
            return "`"  +  Text  +  "`"
        if not '“' in Text and not '”' in Text:
            return '“'  +  Text  +  '”'
        if not '‘' in Text and not '’' in Text:
            return '‘'  +  Text  +  '’'
        if not '«' in Text and not '»' in Text:
            return '«'  +  Text  +  '»'
        if not '‹' in Text and not '›' in Text:
            return '‹'  +  Text  +  '›'
        return "'ERROR gal element DEEPLY ENQUOTED STRING FAILED HERE'"
    def Gal_Code(self):
        Start = self.Start_Position
        End = self.End_Position
        Length = End - Start + 1
        Code = str(self.Document.Input[Start:(Start)+(Length)])
        return Code
    def Failure_Message(self, Problem_Desc):
        Message = str(Problem_Desc) + '. '
        Message += str(self.Gal_Code()) + ' '
        Message += str(self.Code_Context())
        return Message
class Named_Element (Element):
    Gal_Keyword = None
    Gs_Keyword = None
    def __init__(self):
        super().__init__()
        self.Verb = None
        self.Listargs = []
        self.Arguments = []
    def String_Info(self):
        String = ''
        try:
            Argument = None
            for Argument in self.Arguments:
                Arg_Str = str(Argument.__class__.__name__)
                String += ' ' + str(Arg_Str)
        except Exception:
            String += '<invalid Arguments>'
        String += '.'
        return String
    def Base_Structure(self):
        Argument = None
        Previous = None
        for Argument in self.Arguments:
            if isinstance(Argument, Syntax) and Previous is not None and isinstance(Previous, Syntax):
                Previous.Chain_Forward = True
                Argument.Chain_Backward = True
            Previous = Argument
    def Gal_Add_Element(self, Child_Element):
        # comment 'writelineappend element argument  [class.name]';
        if Child_Element.End_Position > self.End_Position:
            self.End_Position = Child_Element.End_Position
        self.Elements.extend([Child_Element])
        self.Arguments.extend([Child_Element])
        self.Listargs.extend([Child_Element])
# comment 'Statement.gal';
# forward Comment_Statement
class Statement (Named_Element):
    def __init__(self):
        super().__init__()
        self.In_Block = False
        self.Block = None
        self.Verb_Owner = None
        self.Class_Owner = None
        self.Infer_Inits = ''
    def Ensure_Block(self):
        if self.Block is not None:
            return
        Block = Block()
        Block.Document = self.Document
        Block.Start_Position = self.Start_Position
        Block.End_Position = self.End_Position
        self.Block = Block
    def String_Info(self):
        String = ''
        try:
            Argument = None
            for Argument in self.Arguments:
                Arg_Str = str(Argument.__class__.__name__)
                String += ' ' + str(Arg_Str)
        except Exception:
            String += '<invalid Arguments>'
        try:
            if self.Block is not None:
                String += ' ' + str(self.Block.To_String())
        except Exception:
            String += '<invalid Block>'
        String += '.'
        return String
    def Structure(self):
        if not self.Re_Structure:
            return
        self.Re_Structure = False
        # comment 'writeline     Element Structure  [class.name]';
        self.Base_Structure()
        if self.Block is not None:
            if self.Class_Context is not None:
                self.Block.Class_Context = self.Class_Context
            if self.Method_Context is not None:
                self.Block.Method_Context = self.Method_Context
            if self.Variable_Context is not None:
                self.Block.Variable_Context = self.Variable_Context
            self.Block.Structure()
        Element = None
        for Element in self.Elements:
            # comment '.= Element Parent [me]';
            if self.Method_Context is not None and 3 and not Element.Method_Context is not None:
                Element.Method_Context = self.Method_Context
            Element.Structure()
    def Base_Structure(self):
        Argument = None
        Previous = None
        for Argument in self.Arguments:
            if isinstance(Argument, Syntax) and Previous is not None and isinstance(Previous, Syntax):
                Previous.Chain_Forward = True
                Argument.Chain_Backward = True
            Previous = Argument
    def Conditional_Debug(self):
        Code = ': Debugger Conditional ' + str(self.Start_Position) + ' ' + str(self.End_Position) + ';' + str('\n')
        return Code
    def Gal_Add_Token(self, Token):
        # comment "Add token '(. Token To_String)' to statement ' (i To_String)'";
        if isinstance(Token, Token_Semi) or isinstance(Token, Token_Block_End):
            # comment 'Statement (i To_String) appends  (. Token To_String) statement terminator';
            self.Elements.extend([Token])
            self.End_Position = Token.End_Position
            if self.In_Block:
                self.Block.End_Position = self.End_Position
            return -1
        if isinstance(Token, Token_Block_Start):
            # comment 'Statement (i To_String) appends  (. Token To_String) block start';
            self.Elements.extend([Token])
            Here = Token.End_Position
            self.End_Position = Here
            self.Block = Block()
            self.Block.Document = self.Document
            self.Block.Start_Position = Here
            self.Block.End_Position = Here
            self.In_Block = True
            self.Elements.extend([self.Block])
            return 0
        if isinstance(Token, Start_Token):
            return 1
        if isinstance(Token, End_Token):
            # comment 'Statement (i To_String) appends  (. Token To_String) error end token';
            # comment "TODO:" 'log error here';
            return -999
        self.Elements.extend([Token])
        if self.In_Block:
            # comment 'Statement (i To_String) appends  (. Token To_String) in a block';
            return 1
        else:
            # comment 'Statement (i To_String) appends  (. Token To_String) as argument';
            self.Arguments.extend([Token])
            self.Listargs.extend([Token])
        self.End_Position = Token.End_Position
        return 0
    def Gal_Add_Element(self, Child_Element):
        # comment 'writelineAdd element  (. Child_Element To_String) to statement  (i To_String)';
        if Child_Element.End_Position > self.End_Position:
            self.End_Position = Child_Element.End_Position
        if self.In_Block:
            self.Block.Gal_Add_Element(Child_Element)
        else:
            self.Elements.extend([Child_Element])
            self.Arguments.extend([Child_Element])
            self.Listargs.extend([Child_Element])
    def Gal_Generate(self):
        self.Ensure_Block()
        self.Block.Gal_Generate()
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            if isinstance(Argument, Token_Comma):
                Gal_Code += ','
                continue
            if not Argument.Gal is not None:
                self.Error = "Argument Error"
                Gal_Code += "<Argument Error>"
                print(Argument.To_String(), ": Argument Error", sep='')
            else:
                Gal_Code += ' ' + str(Argument.Gal)
        Gal_Code += str(self.Block.Gal)
        self.Gal = Gal_Code
    def Fallback_Generate(self):
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Argument.Fallback_Generate()
            Gal_Code += ' ' + str(Argument.Fallback)
        if self.Block is not None:
            self.Block.Fallback_Generate()
            Gal_Code += str(self.Fallback_Block())
        else:
            Gal_Code += ';'
        self.Fallback = Gal_Code
    def Debug_Generate(self):
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        if self.Block is not None:
            self.Block.Debug_Generate()
            Gal_Code += str(self.Block.Gal)
        else:
            Gal_Code += ';'
        Gal_Code += str(self.Conditional_Debug())
        self.Debug = Gal_Code
class Block (Element):
    def __init__(self):
        super().__init__()
        self.Statements = []
        self.Gal_Statements = None
        self.Fallback_Statements = None
        self.Python_Statements = None
        self.Javascript_Statements = None
    def Add_Statement(self, Statement):
        self.Statements.extend([Statement])
    def String_Info(self):
        String = str(self.__class__.__name__) + ': '
        try:
            String += str(self.Start_Position)
        except Exception:
            String += '<Start?>'
        try:
            String += '-' + str(self.End_Position)
        except Exception:
            String += '-<End?>'
        String += ' {'
        Statement = None
        for Statement in self.Statements:
            Stmt_Str = str(Statement.__class__.__name__)
            String += ' ' + str(Stmt_Str)
        String += ' }'
        try:
            if self.Error is not None:
                String += ' ERROR <' + str(self.Error) + '>'
        except Exception:
            String += ' ok'
        return String
    def Base_Structure(self):
        if self.Method_Context is not None:
            # comment 'writelineBlock Method Context';
            pass
        else:
            Message = '%% Block No Method Context in '
            if self.Parent is not None:
                Message += str(self.Parent.To_String())
            Message += ' %%'
            # comment 'writeline Message';
        Statement = None
        for Statement in self.Statements:
            if self.Class_Context is not None:
                # comment 'writeline     (. Statement To_String)';
                Statement.Class_Context = self.Class_Context
            if self.Method_Context is not None:
                # comment 'writeline     (. Statement To_String)';
                Statement.Method_Context = self.Method_Context
            if self.Variable_Context is not None:
                Statement.Variable_Context = self.Variable_Context
            Statement.Structure()
    def Gal_Add_Element(self, Child_Element):
        # comment 'writelineblock append element  [class.name]';
        if Child_Element.End_Position > self.End_Position:
            self.End_Position = Child_Element.End_Position
        self.Elements.extend([Child_Element])
        self.Statements.extend([Child_Element])
    def Gal_Generate(self):
        Block_Code = ''
        Statement = None
        for Statement in self.Statements:
            if not Statement.Gal is not None:
                Statement.Gal_Generate()
            Block_Code += str(Statement.Gal) + str('\n')
        Code = ';'
        if str(Block_Code) > '':
            Block_Code = self.Indent(Block_Code)
            Code = '\n'  +  '{'  +  '\n'  +  Block_Code  +  '}'  +  '\n'
        self.Gal_Statements = Block_Code
        self.Gal = Code
    def Debug_Generate(self):
        Code = str('\n') + '{' + str('\n')
        Block_Code = ''
        Statement = None
        for Statement in self.Statements:
            Block_Code += str(Statement.Gal) + str('\n')
        Block_Code = self.Indent(Block_Code)
        self.Gal_Statements = Block_Code
        Code += str(Block_Code) + '}' + str('\n')
        self.Debug = Code
    def Fallback_Generate(self):
        Block_Code = ''
        Statement = None
        for Statement in self.Statements:
            if not Statement.Fallback is not None:
                Statement.Fallback_Generate()
            Block_Code += str(Statement.Fallback) + str('\n')
        Code = ';' + str('\n')
        if str(Block_Code) > '':
            Block_Code = self.Indent(Block_Code)
            Code = '\n'  +  '{'  +  '\n'  +  Block_Code  +  '}'  +  '\n'
        self.Fallback_Statements = Block_Code
        self.Fallback = Code
    def Python_Generate(self):
        Non_Comments = False
        Stmt_Code = ''
        Statement = None
        for Statement in self.Statements:
            Statement_Py = str(Statement.Python)
            if Statement_Py is not None:
                Stmt_Code += str(Statement_Py)
            else:
                Stmt_Code += '# ERROR from ' + str(Statement.To_String())
            if not isinstance(Statement, Comment_Statement):
                Non_Comments = True
        if not Non_Comments:
            Stmt_Code += 'pass' + str('\n')
        Stmt_Code = self.Indent(Stmt_Code)
        self.Python_Statements = Stmt_Code
        Code = ':' + str('\n') + str(Stmt_Code)
        self.Python = Code
    def Javascript_Generate(self):
        Block_Code = ''
        Statement = None
        for Statement in self.Statements:
            Statement_JS = str(Statement.Javascript)
            if Statement_JS is not None:
                Block_Code += str(Statement_JS)
            else:
                Block_Code += '// ERROR from ' + str(Statement.To_String()) + str('\n')
        # comment 'writelineblock:  Block_Code';
        Block_Code = self.Indent(Block_Code)
        # comment 'writelineindented block:  Block_Code';
        self.Javascript_Statements = Block_Code
        Code = str('\n') + '{' + str('\n') + str(Block_Code) + '}' + str('\n')
        # comment 'writelinecode:  Code';
        self.Javascript = Code
class Line_Statement (Statement):
    pass
class Scoped_Statement (Statement):
    pass
class Declare_Statement (Line_Statement):
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Javascript_Generate(self):
        if not self.Variable.Javascript is not None:
            raise Exception(str(self.Failure_Message('Variable Javascript is undefined')))
        Variable_Javascript = str(self.Variable.Javascript)
        Value_Javascript = ''
        if self.Value is not None:
            Value_Javascript = ' = '  +  self.Value.Javascript
        Code = 'var ' + str(Variable_Javascript) + str(Value_Javascript) + ';' + str('\n')
        self.Javascript = Code
    def Python_Generate(self):
        if not self.Variable.Python is not None:
            raise Exception(str(self.Failure_Message('Variable Python is undefined')))
        Variable_Python = str(self.Variable.Python)
        Value_Python = 'None'
        if self.Value is not None:
            if not self.Value.Python is not None:
                raise Exception(str(self.Failure_Message('Value Python is undefined')))
            Value_Python = self.Value.Python
        Code = str(Variable_Python) + ' = ' + str(Value_Python) + str('\n')
        self.Python = Code
class Method_Statement (Scoped_Statement):
    def __init__(self):
        super().__init__()
        self.Python_Class = 'cls'
        self.Method_Context = None
        self.Variable_Context = None
        self.Method_Signature = None
        self.Return_Type = None
        self.Method_Name = None
    def Attributes(self):
        self.Return_Type = self.Listargs.pop(0)
        self.Method_Name = self.Listargs.pop(0)
        self.Method_Context = self
        # comment "TODO:" 'add this to the compiled method list of the class.';
        Header = 'method'
        Argument = None
        for Argument in self.Arguments:
            # comment 'The arguments must be consistent, because we need to know the header before generation begins.';
            Header += ' ' + str(Argument.Get_Input())
        self.Method_Signature = Header
    def Model(self):
        if not self.Class_Owner:
            return
        Signature = 'method'
        Argument = None
        for Argument in self.Arguments:
            # comment 'The arguments must be consistent, because we need to know the header before generation begins.';
            Signature += ' ' + str(Argument.Get_Input())
        self.Method_Signature = Signature
        self.Class_Owner.Signatures[Signature] = self;
    def Verb_Export(self):
        print('Method statement ', self.Method_Signature, ' Verb_Export begin', sep='')
        if not Compiler.Instance.Verb_Export:
            return
        print('flag on')
        Verb = Compiler.Instance.Get_Verb(self.Method_Signature)
        if (Verb in (None, "")):
            return
        print('verb found')
        My_Class_Name = str(self.Class_Owner.Class_Name.Input)
        if My_Class_Name in Verb.Handler_Classes.keys():
            return
        print('handler is new')
        # comment "TODO:" 'Generate a text copy of my gal code with the handler header.';
        self.Block.End_Position = self.End_Position
        self.Block.Document = self.Document
        print('getting block')
        self.Ensure_Block()
        Gal_Block = str(self.Gal_Block())
        print('generating handler')
        Code = 'handler ' + str(My_Class_Name) + str(Gal_Block)
        # comment "TODO:" "Add it as a text token to the verb's handler list.";
        print('creating token')
        New_Token = Token()
        New_Token.Input = Code
        New_Token.Gal = Code
        New_Token.Start_Position = self.Start_Position
        New_Token.End_Position = self.End_Position
        print('adding to verb block')
        Verb.Ensure_Block()
        Verb.Block.Add_Statement(New_Token)
        Verb.Handler_Classes[My_Class_Name] = self;
        # comment "TODO:" 'Check Class_Keep_Verbs compiler switch. Exit if true.';
        if Compiler.Instance.Class_Keep_Verbs:
            return
        # comment "TODO:" 'Delete this method from the class.';
        self.Class_Owner.Delete_Method(self)
        print('Method statement ', self.Method_Signature, ' Verb_Export end', sep='')
    def Debug_Generate(self):
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        if self.Block is not None:
            self.Block.Debug_Generate()
            Gal_Code += str(self.Block.Gal)
        else:
            Gal_Code += ';'
        self.Debug = Gal_Code
class Class_Method_Statement (Method_Statement):
    pass
class Property_Statement (Line_Statement):
    def Debug_Generate(self):
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        if self.Block is not None:
            self.Block.Debug_Generate()
            Gal_Code += str(self.Block.Gal)
        else:
            Gal_Code += ';'
        self.Debug = Gal_Code
class Class_Property_Statement (Line_Statement):
    pass
class Constructor_Statement (Method_Statement):
    def Attributes(self):
        pass
    def Debug_Generate(self):
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        if self.Block is not None:
            self.Block.Debug_Generate()
            Gal_Code += str(self.Block.Gal)
        else:
            Gal_Code += ';'
        self.Debug = Gal_Code
class If_Statement (Scoped_Statement):
    def Debug_Generate(self):
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        if self.Block is not None:
            self.Block.Debug_Generate()
            Gal_Code += str(self.Block.Gal)
        else:
            Gal_Code += ';'
        self.Debug = Gal_Code
class Append_Args_Statement (Line_Statement):
    pass
class Assign_Statement (Line_Statement):
    pass
class Invocation_Statement (Line_Statement):
    pass
class Argument_Statement (Line_Statement):
    def Debug_Generate(self):
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        if self.Block is not None:
            self.Block.Debug_Generate()
            Gal_Code += str(self.Block.Gal)
        else:
            Gal_Code += ';'
        self.Debug = Gal_Code
class Comment_Statement (Append_Args_Statement):
    def Debug_Generate(self):
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        if self.Block is not None:
            self.Block.Debug_Generate()
            Gal_Code += str(self.Block.Gal)
        else:
            Gal_Code += ';'
        self.Debug = Gal_Code
class For_Statement (Scoped_Statement):
    pass
class Interface_Statement (Scoped_Statement):
    pass
# forward Statement_Classify
class Verb_Statement (Scoped_Statement):
    def __init__(self):
        super().__init__()
        self.Method_Signature = None
        self.Handler_Classes = {}
    def Base_Structure(self):
        self.Class_Context = self
        Statement = None
        if self.Block is not None and self.Block.Statements is not None:
            for Statement in self.Block.Statements:
                if isinstance(Statement, Statement_Classify):
                    Statement.Verb_Owner = self
                    Statement.Method_Signature = self.Method_Signature
    def Model(self):
        Compiler.Instance.Add_Verb(self)
        # comment '. [: Compiler Instance] Add_Class [me];';
    def Delete_Handler(self, Handler):
        Statement = None
        I = None
        L = len(self.Block.Statements) - 1
        for I in range(0, L+1):
            Statement = self.Block.Statements[I]
            if Statement.Start_Position == Handler.Start_Position and Statement.End_Position == Handler.End_Position:
                del self.Block.Statements[I:I+1]
                break
class Read_Statement (Line_Statement):
    pass
class Class_Statement (Scoped_Statement):
    def __init__(self):
        super().__init__()
        self.Name_Prefix = ''
        self.Generate_Constructor = False
        self.Base_Class = False
        self.Property_Statements = []
        self.Class_Property_Statements = []
        self.Method_Statements = []
        self.Class_Method_Statements = []
        self.Main_Body = []
        self.Constructor = None
        self.Signatures = {}
    def Append_Statement(self, Statement):
        Statement.Class_Owner = self
        if isinstance(Statement, Constructor_Statement):
            # comment 'writelineClass_Statement.Append_Statement Constructor Statement Found';
            self.Constructor = Statement
        elif isinstance(Statement, Class_Property_Statement):
            # comment 'writelineClass_Statement.Append_Statement - Class Property Statement:  (. Statement To_String)';
            self.Class_Property_Statements.extend([Statement])
        elif isinstance(Statement, Property_Statement):
            self.Property_Statements.extend([Statement])
            self.Generate_Constructor = True
        elif isinstance(Statement, Interface_Statement):
            self.Interface_Statements.extend([Statement])
        else:
            # comment 'writelineClass_Statement.Append_Statement  [my Class_Name Input] owns method  [. Statement Method_Name Input]';
            self.Main_Body.extend([Statement])
    def Base_Structure(self):
        self.Class_Context = self
        Statement = None
        # comment 'writelineClass Add to Index:  [my Class_Name Input]';
        if self.Block is not None and self.Block.Statements is not None:
            for Statement in self.Block.Statements:
                # comment 'writelinei append statement';
                self.Append_Statement(Statement)
        Compiler.Instance.Add_Class(self)
    def Model(self):
        # comment 'writelineModel Class Statement  (i To_String)';
        Compiler.Instance.Add_Class(self)
class Program (Element):
    def __init__(self):
        super().__init__()
        self.Statements = []
        self.Gal_Statements = None
        self.Fallback_Statements = None
        self.Python_Statements = None
        self.Javascript_Statements = None
        self.Mumps_Statements = None
    def Gal_Add_Element(self, Child_Element):
        if Child_Element.End_Position > self.End_Position:
            self.End_Position = Child_Element.End_Position
        self.Elements.extend([Child_Element])
        self.Statements.extend([Child_Element])
    def Gal_Generate(self):
        Code = ''
        Statement = None
        for Statement in self.Statements:
            if Statement.Gal is not None:
                if str(Statement.Gal) > '':
                    Code += str(Statement.Gal) + str('\n')
            else:
                Code += '<Error no gal for ' + str(Statement.To_String()) + '>'
                zdebug.zbreak()
        self.Gal_Statements = Code
        self.Gal = Code
    def Debug_Generate(self):
        Code = ''
        Statement = None
        for Statement in self.Statements:
            if Statement.Gal:
                Code += str(Statement.Gal) + str('\n')
            else:
                Code += '<Error no debug for ' + str(Statement.To_String()) + '>'
        self.Gal_Statements = Code
        self.Debug = Code
    def Fallback_Generate(self):
        Code = ''
        Statement = None
        for Statement in self.Statements:
            Statement.Fallback_Generate()
            Code += str(Statement.Fallback) + str('\n')
        self.Fallback_Statements = Code
        self.Fallback = Code
    def Python_Generate(self):
        Code = str('\n')
        Statement = None
        for Statement in self.Statements:
            # comment 'dv$Statement';
            Code += str(Statement.Python)
        self.Python_Statements = Code
        self.Python = Code
    def Javascript_Generate(self):
        Code = str('\n')
        Statement = None
        for Statement in self.Statements:
            Code += str(Statement.Javascript)
        self.Javascript_Statements = Code
        self.Javascript = Code
    def Mumps_Generate(self):
        Code = ''
        Statement = None
        for Statement in self.Statements:
            if Statement.Mumps:
                Code += str(Statement.Mumps) + str('\n')
            else:
                Code += '<Error no mumps for ' + str(Statement.To_String()) + '>'
        self.Mumps_Statements = Code
        self.Mumps = Code
class Gal_File (Program):
    def __init__(self):
        super().__init__()
        self.Start_Position = -1
        self.End_Position = -1
        self.File_Name = None
    def Read(self):
        File_Name = str(self.File_Name)
        File_Text = None
        _FH = open(File_Name, "r")
        File_Text = _FH.read()
        _FH.close()
        self.Input = File_Text
    def Write(self):
        File_Name = str(self.File_Name)
        File_Text = str(self.Input)
        _FH = open(File_Name, "w")
        _FH.write(File_Text)
        _FH.close()
class Goal_Statement (Class_Statement):
    pass
class Feature_Assignment_Statement (Line_Statement):
    def __init__(self):
        super().__init__()
        self.Class_Name = None
        self.Property_Name = None
    def Fallback_Generate(self):
        Prop = str(self.Property_Name)
        Cls = str(self.Class_Name)
        Parent = ''
        if self.Parent.Name is not None:
            Parent = self.Parent.Name.Fallback
        Code = '.= ' + str(Parent) + ' ' + str(Prop) + ' (new ' + str(Cls) + str(self.Fallback_Args()) + ');'
        self.Fallback = Code
class List_Feature_Statement (Feature_Assignment_Statement):
    def Fallback_Generate(self):
        Prop = str(self.Property_Name)
        Cls = str(self.Class_Name)
        Parent = ''
        if self.Parent.Name is not None:
            Parent = self.Parent.Name.Fallback
        Code = 'list List_' + str(Prop) + str(self.Fallback_Args()) + ';' + str('\n')
        if str(Parent) > '':
            Code += '.= ' + str(Parent) + ' ' + str(Prop) + ' List_' + str(Prop) + ';'
        self.Fallback = Code
class Symbol_Statement (Scoped_Statement):
    pass
class Entity_Definition_Statement (Statement):
    def Fallback_Generate(self):
        zdebug.zbreak()
        Name = str(self.Name.Fallback)
        Parent = ''
        if self.Parent.Name is not None:
            Parent = self.Parent.Name.Fallback
        Code = 'entity.new ' + str(Name) + ' ' + str(self.Class_Name) + str(self.Fallback_Args()) + ';' + str('\n')
        if str(Parent) > '':
            Code += '.= ' + str(Parent) + ' ' + str(Name) + ' ' + str(Name) + ';' + str('\n')
        Code += str(self.Block.Fallback_Statements)
        self.Fallback = Code
class Operation (Named_Element):
    def Gal_Add_Token(self, Token):
        if isinstance(Token, Start_Token):
            return 1
        if isinstance(Token, Token_Operation_End):
            self.Elements.extend([Token])
            self.End_Position = Token.End_Position
            return -1
        if isinstance(Token, Token_Comma):
            return -1
        if isinstance(Token, End_Token):
            self.Error = 'Expected end-operation token'
            return -999
        # comment "TODO:" 'handle comma here';
        if isinstance(Token, Start_Token):
            return 1
        self.Elements.extend([Token])
        if self.Verb is not None:
            self.Arguments.extend([Token])
            self.Listargs.extend([Token])
        else:
            self.Verb = Token.Input
            Token.Is_Verb = True
        self.End_Position = Token.End_Position
        return 0
    def Gal_Generate(self):
        Gal_Code = '(' + str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        Gal_Code += ')'
        self.Gal = Gal_Code
    def Debug_Generate(self):
        Gal_Code = '(' + str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        Gal_Code += ')'
        self.Debug = Gal_Code
    def Fallback_Generate(self):
        Gal_Code = '(' + str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Fallback)
        Gal_Code += ')'
        self.Fallback = Gal_Code
class Syntax (Named_Element):
    def __init__(self):
        super().__init__()
        self.Chain_Backward = False
        self.Chain_Forward = False
    def Gal_Add_Token(self, Token):
        if isinstance(Token, Start_Token):
            return 1
        if isinstance(Token, Token_Syntax_End):
            self.Elements.extend([Token])
            self.End_Position = Token.End_Position
            return -1
        if isinstance(Token, Token_Comma):
            return -1
        if isinstance(Token, End_Token):
            self.Error = 'Expected syntax end token'
            return -999
        # comment "TODO:" 'handle comma here';
        if isinstance(Token, Start_Token):
            return 1
        self.Elements.extend([Token])
        if self.Verb is not None:
            self.Arguments.extend([Token])
            self.Listargs.extend([Token])
        else:
            self.Verb = Token.Input
            Token.Is_Verb = True
        self.End_Position = Token.End_Position
        return 0
    def Gal_Generate(self):
        # comment 'writelineSyntax Gal_Generate  (i To_String)';
        First_Char = '['
        Last_Char = ']'
        if self.Chain_Backward:
            First_Char = ''
        if self.Chain_Forward:
            Last_Char = ','
        First_Char = '['
        Last_Char = ']'
        Gal_Code = str(First_Char) + str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        Gal_Code += str(Last_Char)
        self.Gal = Gal_Code
    def Debug_Generate(self):
        First_Char = '['
        Last_Char = ']'
        if self.Chain_Backward:
            First_Char = ''
        if self.Chain_Forward:
            Last_Char = ','
        First_Char = '['
        Last_Char = ']'
        Gal_Code = str(First_Char) + str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        Gal_Code += str(Last_Char)
        self.Debug = Gal_Code
    def Fallback_Generate(self):
        # comment 'writelineSyntax Fallback_Generate  (i To_String)';
        First_Char = '['
        Last_Char = ']'
        if self.Chain_Backward:
            First_Char = ''
        if self.Chain_Forward:
            Last_Char = ','
        First_Char = '['
        Last_Char = ']'
        Gal_Code = str(First_Char) + str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Fallback)
        Gal_Code += str(Last_Char)
        self.Fallback = Gal_Code
class Keyvalue (Named_Element):
    def Gal_Add_Token(self, Token):
        if isinstance(Token, Start_Token):
            return 1
        if isinstance(Token, Token_Keyvalue_End):
            self.Elements.extend([Token])
            self.End_Position = Token.End_Position
            return -1
        if isinstance(Token, End_Token):
            # comment "TODO:" 'log error here';
            return -999
        self.Elements.extend([Token])
        self.Arguments.extend([Token])
        self.Listargs.extend([Token])
        self.End_Position = Token.End_Position
        return 0
    def Gal_Generate(self):
        Gal_Code = '<'
        Between = ''
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += str(Between) + str(Argument.Gal)
            Between = ' '
        Gal_Code += '>'
        self.Gal = Gal_Code
    def Debug_Generate(self):
        Gal_Code = '<'
        Between = ''
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += str(Between) + str(Argument.Gal)
            Between = ' '
        Gal_Code += '>'
        self.Debug = Gal_Code
    def Fallback_Generate(self):
        Gal_Code = '<'
        Between = ''
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += str(Between) + str(Argument.Fallback)
            Between = ' '
        Gal_Code += '>'
        self.Fallback = Gal_Code
class Repeating_Operation (Operation):
    def Mumps_Generate(self):
        Between = ''
        Code = ''
        Argument = None
        for Argument in self.Arguments:
            Code += str(Between) + str(Argument.Mumps_Atom())
            Between = self.__class__.Mumps_Operator
        self.M_Expr = Code
    def Javascript_Generate(self):
        Between = ''
        Operation = ' ' + str(self.__class__.Js_Operator) + ' '
        Code = ''
        Argument = None
        for Argument in self.Arguments:
            Code += str(Between) + str(Argument.Javascript_Atom(self.__class__.Js_Precedence))
            Between = Operation
        self.Javascript = Code
    def Python_Generate(self):
        Between = ''
        Operation = ' ' + str(self.__class__.Py_Operator) + ' '
        Code = ''
        Argument = None
        for Argument in self.Arguments:
            Code += str(Between) + str(Argument.Python_Atom(self.__class__.Py_Precedence))
            Between = Operation
        self.Python = Code
class Binary_Operation (Operation):
    def Mumps_Generate(self):
        First = self.Arguments[0]
        Second = self.Arguments[1]
        First_M = str(First.M_Expression())
        Second_M = str(Second.M_Atom())
        Code = str(First_M) + str(self.__class__.Mumps_Operator) + str(Second_M)
        self.M_Expr = Code
    def Javascript_Generate(self):
        First = self.Arguments[0]
        Second = self.Arguments[1]
        Precedence = self.__class__.Js_Precedence
        First_Js = str(First.Javascript_Atom(Precedence))
        Second_Js = str(Second.Javascript_Atom(Precedence))
        Code = str(First_Js) + ' ' + str(self.__class__.Js_Operator) + ' ' + str(Second_Js)
        self.Javascript = Code
    def Python_Generate(self):
        First = self.Arguments[0]
        Second = self.Arguments[1]
        Precedence = self.__class__.Py_Precedence
        First_Py = str(First.Python_Atom(Precedence))
        Second_Py = str(Second.Python_Atom(Precedence))
        Code = str(First_Py) + ' ' + str(self.__class__.Py_Operator) + ' ' + str(Second_Py)
        self.Python = Code
class String_Binary_Operation (Operation):
    def Mumps_Generate(self):
        First = self.Arguments[0]
        Second = self.Arguments[1]
        First_M = str(First.M_Expression())
        Second_M = str(Second.M_Atom())
        Code = str(First_M) + str(self.__class__.Mumps_Operator) + str(Second_M)
        self.M_Expr = Code
    def Javascript_Generate(self):
        First = self.Arguments[0]
        Second = self.Arguments[1]
        Precedence = self.__class__.Js_Precedence
        First_Js = str(First.Javascript_Atom(Precedence))
        Second_Js = str(Second.Javascript_Atom(Precedence))
        Code = str(First_Js) + ' ' + str(self.__class__.Js_Operator) + ' ' + str(Second_Js)
        self.Javascript = Code
    def Python_Generate(self):
        First = self.Arguments[0]
        Second = self.Arguments[1]
        Precedence = self.__class__.Py_Precedence
        First_Py = str(First.Python_Atom(Precedence))
        Second_Py = str(Second.Python_Atom(Precedence))
        if not isinstance(First, Quote):
            First_Py = 'str('  +  First_Py  +  ')'
        if not isinstance(Second, Quote):
            Second_Py = 'str('  +  Second_Py  +  ')'
        Code = str(First_Py) + ' ' + str(self.__class__.Py_Operator) + ' ' + str(Second_Py)
        self.Python = Code
class Invocation_Operation (Operation):
    pass
class Unary_Operation (Operation):
    def __init__(self):
        super().__init__()
        self.First = None
    def Mumps_Generate(self):
        First_M = str(self.First.M_Atom())
        Code = str(self.__class__.Mumps_Operator) + str(First_M)
        self.M_Atom = Code
    def Javascript_Generate(self):
        Precedence = self.__class__.Js_Precedence
        First_Js = str(self.First.Javascript_Atom(Precedence))
        Code = str(self.__class__.Js_Operator) + '(' + str(First_Js) + ')'
        self.Javascript = Code
    def Python_Generate(self):
        Precedence = self.__class__.Py_Precedence
        First_Py = str(self.First.Python_Atom(Precedence))
        Code = str(self.__class__.Py_Operator) + ' ' + str(First_Py)
        self.Python = Code
class String_Unary_Operation (Unary_Operation):
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Precedence = self.__class__.Py_Precedence
        First_Py = str(self.First.Python_Atom(Precedence))
        if not isinstance(self.First, Quote):
            zdebug.zbreak()
            First_Py = 'str('  +  First_Py  +  ')'
        Code = str(self.__class__.Py_Operator) + ' ' + str(First_Py)
        self.Python = Code
class Append_Args_Operation (Repeating_Operation):
    def Attributes(self):
        Argument = None
        for Argument in self.Arguments:
            Argument.Usge = 'string'
class Noun_Syntax (Syntax):
    pass
class Declare_Syntax (Syntax):
    def Python_Generate(self):
        Code = str(self.Variable.Python)
        if self.Value is not None:
            Code += ' = ' + str(self.Value.Python)
        self.Python = Code
    def Javascript_Generate(self):
        Code = str(self.Variable.Javascript)
        if self.Value is not None:
            Code += ' = ' + str(self.Value.Javascript)
        self.Javascript = Code
# comment 'Language.gal';
class Language:
    Verbose = False
    Language_Name = 'Language'
    Languages = {}
    Generator_Name = None
    @classmethod
    def Initialize(cls):
        Name = str(cls.Language_Name)
        # comment 'dict.assign [: Language Languages] Name [class.self]';
    def Get(self, Element):
        pass
    def Generate(self, Element):
        pass
class Gal (Language):
    Verbose = False
    def Get(self, Element):
        if Element.Gal is not None:
            return Element.Gal
        return '<Undefined>'
    def Generate(self, Element):
        Element.Gal_Generate()
    @classmethod
    def Parse_Element(cls, Element):
        Token = Element.Tokens[0]
        Next = Element.Tokens[1]
        Parent = Element
        Parent.Document = Element
        # comment 'writelineParent Equals Element:  (. Parent To_String)';
        Document = Element
        End = len(Element.Tokens) - 1
        Position = None
        Comma_Mode = 'unsupported'
        Child = Factory.Create_Element(Token, Next, Document, Parent, Comma_Mode)
        Stack = []
        if cls.Verbose:
            print("Gal_Parse push first child ", Child.To_String(), sep='')
        Stack.extend([Child])
        Parent = Child
        Comma = False
        for Position in range(1, End+1):
            if cls.Verbose:
                print("")
            Token = Element.Tokens[Position]
            Comma = isinstance(Token, Token_Comma)
            if cls.Verbose:
                print("Parse Token ", Token.To_String(), " with stack ", len(Stack), ' comma ', Comma, ' mode ', Comma_Mode, sep='')
            # comment 'writelineParse Token  (. Token To_String) with stack  (list.length Stack) comma  Comma mode  Comma_Mode';
            if Child:
                Status = Child.Gal_Add_Token(Token)
                if cls.Verbose:
                    print("    Element '", Child.To_String(), "' returned status '", Status, "' on Token '", Token.To_String(), "' stack length ", len(Stack), ' comma mode ', Comma_Mode, sep='')
                if Status == 0:
                    if isinstance(Token, Value_Token) and not Token.Is_Verb:
                        if cls.Verbose:
                            print("Appending value token to document body")
                        Element.Document_Body.extend([Token])
                    continue
                if Status < 0:
                    Stack_Length = len(Stack)
                    Elem_String = str(Child.To_String())
                    if cls.Verbose:
                        print("Going to pop with ", Stack_Length, " elements, element ", Elem_String, sep='')
                    if len(Stack) > 0:
                        Child = Stack.pop()
                        if len(Stack) > 0:
                            Parent = Stack[-1]
                            # comment 'writelineParent Stack Last:  (. Parent To_String)';
                        else:
                            Parent = Element
                            # comment 'writelineParent must equal Element:  (. Parent To_String)';
                            # comment 'writelineChild was  (. Child To_String)';
                        if isinstance(Child, Syntax):
                            Comma_Mode = 'syntax'
                        elif isinstance(Child, Operation):
                            Comma_Mode = 'operation'
                        elif isinstance(Child, Keyvalue):
                            Comma_Mode = 'keyvalue'
                        else:
                            Comma_Mode = 'unsupported'
                        if isinstance(Child, Statement) and Child.Block is not None:
                            Element.Document_Body.extend([Child.Block])
                        Element.Document_Body.extend([Child])
                        if cls.Verbose:
                            print('Adding element ', Child.To_String(), ' to parent ', Parent.To_String(), sep='')
                        Parent.Gal_Add_Element(Child)
                        if len(Stack) > 0:
                            Child = Stack[-1]
                        else:
                            Child = None
                            if cls.Verbose:
                                print("Stack empty, null element")
                    else:
                        Child = None
                        Parent = Element
                        if cls.Verbose:
                            print("Empty stack, element null")
                    if not Comma:
                        continue
                else:
                    if cls.Verbose:
                        print("Positive Status ", Status, " on Token ", Token.To_String(), " in element ", Element.To_String(), " stack length ", len(Stack), sep='')
            if Position < End:
                Next = Element.Tokens[Position + 1]
            else:
                Next = None
            if isinstance(Token, End_Token):
                if cls.Verbose:
                    print("Detected End Token ", Token.To_String(), " in element ", Child.To_String(), sep='')
            Child = Factory.Create_Element(Token, Next, Document, Parent, Comma_Mode)
            Stack.extend([Child])
            Parent = Child
            if cls.Verbose:
                print("Create/Push Element ", Child.To_String(), " stack ", len(Stack), " body elements ", len(Element.Document_Body), sep='')
class Mumps (Language):
    def Get(self, Element):
        if Element.Mumps is not None:
            return Element.Mumps
        return '<Undefined>'
    def Generate(self, Element):
        Element.Mumps_Generate()
    def Parse_Element(self, Element):
        pass
class Fallback (Language):
    def Get(self, Element):
        if Element.Fallback is not None:
            return Element.Fallback
        return '<Undefined>'
    def Generate(self, Element):
        Element.Fallback_Generate()
    def Parse_Element(self, Element):
        pass
class Python (Language):
    def Get(self, Element):
        if Element.Python is not None:
            return Element.Python
        return '<Undefined>'
    def Generate(self, Element):
        Element.Python_Generate()
    def Parse_Element(self, Element):
        pass
class Javascript (Language):
    def Get(self, Element):
        if Element.Javascript is not None:
            return Element.Javascript
        return '<Undefined>'
    def Generate(self, Element):
        Element.Javascript_Generate()
    def Parse_Element(self, Element):
        pass
class Python_Fallback (Language):
    def Get(self, Element):
        if Element.Python is not None:
            return Element.Python
        return '<Undefined>'
    def Generate(self, Element):
        # comment 'Avoid causing undefined errors in parents.';
        self.Python = ''
        try:
            Element.Python_Generate()
            Element.Fallback = Element.Gal
        except Exception:
            pass
    def Parse_Element(self, Element):
        pass
class Javascript_Fallback (Language):
    def Get(self, Element):
        if Element.Javascript is not None:
            return Element.Javascript
        return '<Undefined>'
    def Generate(self, Element):
        # comment 'Avoid causing undefined errors in parents.';
        self.Javascript = ''
        try:
            Element.Javascript_Generate()
            Element.Fallback = Element.Gal
        except Exception:
            pass
    def Parse_Element(self, Element):
        pass
class Sql (Language):
    def Get(self, Element):
        if Element.Sql is not None:
            return Element.Sql
        return '<Undefined>'
    def Generate(self, Element):
        Element.Sql_Generate()
    def Parse_Element(self, Element):
        pass
class Debug (Language):
    def Get(self, Element):
        if Element.Debug is not None:
            return Element.Debug
        return '<Undefined>'
    def Generate(self, Element):
        Element.Debug_Generate()
class Php (Language):
    def Get(self, Element):
        if Element.Php is not None:
            return Element.Php
        return '<Undefined>'
    def Generate(self, Element):
        Element.Php_Generate()
class Java (Language):
    def Get(self, Element):
        if Element.Java is not None:
            return Element.Java
        return '<Undefined>'
    def Generate(self, Element):
        Element.Java_Generate()
class Raku (Language):
    def Get(self, Element):
        if Element.Raku is not None:
            return Element.Raku
        return '<Undefined>'
    def Generate(self, Element):
        Element.Raku_Generate()
class Language_File (Gal_File):
    pass
class Gal_Input (Language_File):
    def __init__(self):
        super().__init__()
        self.Name = None
    def Tokenize(self):
        self.Gal_Tokenize()
    def Parse(self):
        Gal.Parse_Element(self)
class Gal_Output (Language_File):
    def Generate(self, Document):
        This_Element = None
        for This_Element in Document.Document_Body:
            try:
                This_Element.Gal_Generate()
            except Exception as Error:
                # comment 'debug;';
                Input_Code = str(This_Element.Get_Input())
                print("error generating gal: ", Error, ' code: ', Input_Code, sep='')
                This_Element.Error = Error
        Document.Gal_Generate()
    def Get(self, Element):
        if Element.Gal is not None:
            return Element.Gal
        return ''
class Test_Output (Language_File):
    def Generate(self, Document):
        This_Element = None
        for This_Element in Document.Document_Body:
            try:
                This_Element.Test_Generate()
            except Exception as Error:
                # comment 'debug;';
                Input_Code = str(This_Element.Get_Input())
                print("error generating test: ", Error, ' code: ', Input_Code, sep='')
                This_Element.Error = Error
        Document.Test_Generate()
    def Get(self, Element):
        if Element.Test_Case is not None:
            return Element.Test_Case
        return ''
class Fallback_Output (Language_File):
    def Generate(self, Document):
        Gal_Out = Gal_Output()
        Gal_Out.Generate(Document)
        This_Element = None
        for This_Element in Document.Document_Body:
            try:
                This_Element.Fallback_Generate()
            except Exception as Error:
                # comment 'debug;';
                Input_Code = str(This_Element.Get_Input())
                print("error generating fallback`: ", Error, ' code: ', Input_Code, sep='')
                This_Element.Error = Error
        Document.Fallback_Generate()
    def Get(self, Element):
        if Element.Fallback is not None:
            return Element.Fallback
        return ''
class Python_Output (Language_File):
    def Get(self, Element):
        if Element.Python is not None:
            return Element.Python
        return ''
    def Generate(self, Document):
        Gal_Out = Gal_Output()
        Gal_Out.Generate(Document)
        # comment 'entity.new Fall_Out Fallback_Output';
        # comment '. Fall_Out Generate Document';
        This_Element = None
        for This_Element in Document.Document_Body:
            try:
                This_Element.Python_Generate()
            except Exception as Error:
                # comment 'debug;';
                Input_Code = str(This_Element.Get_Input())
                print("error generating python`: ", Error, ' code: ', Input_Code, sep='')
                This_Element.Error = Error
        Document.Python_Generate()
class Javascript_Output (Language_File):
    def Get(self, Element):
        if Element.Javascript is not None:
            return Element.Javascript
        return ''
    def Generate(self, Document):
        Gal_Out = Gal_Output()
        Gal_Out.Generate(Document)
        # comment 'entity.new Fall_Out Fallback_Output';
        # comment '. Fall_Out Generate Document';
        This_Element = None
        for This_Element in Document.Document_Body:
            try:
                This_Element.Javascript_Generate()
            except Exception as Error:
                # comment 'debug;';
                Input_Code = str(This_Element.Get_Input())
                print("error generating javascript`: ", Error, ' code: ', Input_Code, sep='')
                This_Element.Error = Error
        Document.Javascript_Generate()
# comment 'Atomic_Operation.gal';
class Operation_And (Repeating_Operation):
    Gal_Keyword = 'and'
    Gs_Keyword = 'and'
    Aliases = " and & && "
    Mumps_Operator = '&'
    Js_Precedence = 6
    Js_Operator = '&&'
    Py_Operator = 'and'
    Py_Precedence = 6
    Php_Operator = 'and'
    Php_Precedence = 6
    def Attributes(self):
        Argument = None
        for Argument in self.Arguments:
            Argument.Usage = 'flag'
class Operation_Add (Repeating_Operation):
    Gal_Keyword = '+'
    Gs_Keyword = '+'
    Aliases = " add "
    Mumps_Operator = '+'
    Js_Precedence = 6
    Py_Precedence = 6
    Php_Precedence = 6
    Js_Operator = '+'
    Py_Operator = '+'
    Php_Operator = '+'
    def Attributes(self):
        Argument = None
        for Argument in self.Arguments:
            Argument.Usage = 'number'
class Operation_Append (Append_Args_Operation):
    Gal_Keyword = 'append'
    Gs_Keyword = 'append'
    Js_Precedence = 6
    Py_Precedence = 6
    Php_Precedence = 6
    Py_Operator = ' + '
    Js_Operator = ' + '
    Php_Operator = ' + '
    def Attributes(self):
        Argument = None
        for Argument in self.Arguments:
            Argument.Usage = 'string'
class Operation_Call (Invocation_Operation):
    Gal_Keyword = '.'
    Gs_Keyword = '.'
    Aliases = " call "
    def __init__(self):
        super().__init__()
        self.Target = None
        self.Method = None
    def Python_Generate(self):
        Python_Code = str(self.Target.Python) + '.' + str(self.Method.Python) + '(' + str(self.Python_Args(', ')) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Target.Javascript) + '.' + str(self.Method.Javascript) + '(' + str(self.Javascript_Args(', ')) + ')'
        self.Javascript = Javascript_Code
    # comment "php [my Target Php]. [my Method Php]( (i Php_Args ', '))";
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Target')
        self.Target = self.Listargs.pop(0)
        self.Target.Usage = 'value'
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Method')
        self.Method = self.Listargs.pop(0)
        self.Method.Usage = 'method'
class Operation_Colon (Invocation_Operation):
    Gal_Keyword = ':'
    Gs_Keyword = ':'
    Aliases = " cm classmethod class.method colon "
    def __init__(self):
        super().__init__()
        self.Target = None
        self.Method = None
    def Python_Generate(self):
        Python_Code = str(self.Target.Python) + '.' + str(self.Method.Python) + '(' + str(self.Python_Args(', ')) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Target.Javascript) + '.' + str(self.Method.Javascript) + '(' + str(self.Javascript_Args(', ')) + ')'
        self.Javascript = Javascript_Code
    # comment "php [my Target Php]. [my Method Php]( (i Php_Args ', '))";
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Target')
        self.Target = self.Listargs.pop(0)
        self.Target.Usage = 'class'
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Method')
        self.Method = self.Listargs.pop(0)
        self.Method.Usage = 'method'
class Operation_Classpropget (Operation):
    Gal_Keyword = 'classpropget'
    Gs_Keyword = 'classpropget'
    def __init__(self):
        super().__init__()
        self.First = None
        self.Second = None
    def Python_Generate(self):
        Class_Name = None
        Property_Name = None
        if self.Second is not None:
            Class_Name = self.First.Python
            Property_Name = self.Second.Python
        else:
            Class_Name = 'self.__class__'
            Property_Name = self.First.Python
        Code = str(Class_Name) + '.' + str(Property_Name)
        self.Python = Code
    def Javascript_Generate(self):
        Class_Name = None
        Property_Name = None
        if self.Second is not None:
            Class_Name = self.First.Javascript
            Property_Name = self.Second.Javascript
        else:
            Class_Name = 'this.constructor'
            if self.Method_Context is not None and isinstance(self.Method_Context, Class_Method_Statement):
                Class_Name = 'this'
            Property_Name = self.First.Javascript
        Code = str(Class_Name) + '.' + str(Property_Name)
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Second = self.Listargs.pop(0)
class Operation_Contains (Binary_Operation):
    Gal_Keyword = 'contains'
    Gs_Keyword = 'contains'
    def __init__(self):
        super().__init__()
        self.String = None
        self.Search = None
    def Python_Generate(self):
        Python_Code = str(self.Search.Python) + ' in ' + str(self.String.Python)
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.String.Javascript) + '.includes(' + str(self.Search.Javascript) + ')'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument String')
        self.String = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Search')
        self.Search = self.Listargs.pop(0)
class Operation_Defined (Unary_Operation):
    Gal_Keyword = 'defined'
    Gs_Keyword = 'defined'
    Js_Precedence = 6
    Py_Precedence = 6
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = str(self.First.Python) + ' is not None'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + ' !== undefined'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_Dictionary_Get (Operation):
    Gal_Keyword = 'dict.get'
    Gs_Keyword = 'dict.get'
    Aliases = " key.get "
    def __init__(self):
        super().__init__()
        self.Dictionary = None
        self.Key = None
    def Python_Generate(self):
        Python_Code = str(self.Dictionary.Python) + '[' + str(self.Key.Python) + ']'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Dictionary.Javascript) + '[' + str(self.Key.Javascript) + ']'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Dictionary')
        self.Dictionary = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Key')
        self.Key = self.Listargs.pop(0)
class Operation_Key_Exists (Operation):
    Gal_Keyword = 'key.exists'
    Gs_Keyword = 'key.exists'
    Aliases = " dict.exists "
    def __init__(self):
        super().__init__()
        self.Dictionary = None
        self.Key = None
    # comment 'fallback(defined [key  [my Dictionary Fallback]  [my Key Fallback]])';
    def Python_Generate(self):
        Python_Code = str(self.Key.Python) + ' in ' + str(self.Dictionary.Python) + '.keys()'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Key.Javascript) + ' in ' + str(self.Dictionary.Javascript)
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Dictionary')
        self.Dictionary = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Key')
        self.Key = self.Listargs.pop(0)
class Operation_Divide (Binary_Operation):
    Gal_Keyword = '/'
    Gs_Keyword = '/'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '/'
    Py_Operator = '/'
    def Attributes(self):
        pass
class Operation_Equal (Binary_Operation):
    Gal_Keyword = '='
    Gs_Keyword = '='
    Aliases = " equal eq equals == "
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '=='
    Py_Operator = '=='
    def Attributes(self):
        pass
class Operation_Greater (Binary_Operation):
    Gal_Keyword = 'greater'
    Gs_Keyword = 'greater'
    Aliases = " gt "
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '>'
    Py_Operator = '>'
    def Attributes(self):
        pass
class Operation_Greater_Equal (Binary_Operation):
    Gal_Keyword = 'ge'
    Gs_Keyword = 'ge'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '>='
    Py_Operator = '>='
    def Attributes(self):
        pass
class Operation_Http_Fetch (Operation):
    Gal_Keyword = 'http.fetch'
    Gs_Keyword = 'http.fetch'
    def Attributes(self):
        pass
class Operation_Isa (Binary_Operation):
    Gal_Keyword = 'isa'
    Gs_Keyword = 'isa'
    Js_Precedence = 6
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Class_Name = None
    def Javascript_Generate(self):
        Javascript_Code = str(self.Variable.Javascript) + ' instanceof ' + str(self.Class_Name.Javascript)
        self.Javascript = Javascript_Code
    def Python_Generate(self):
        Python_Code = 'isinstance(' + str(self.Variable.Python) + ', ' + str(self.Class_Name.Python) + ')'
        self.Python = Python_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Operation_Is_Null (Operation):
    Gal_Keyword = 'is.null'
    Gs_Keyword = 'is.null'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Javascript_Generate(self):
        Javascript_Code = '(' + str(self.Variable.Javascript) + ' == null || ' + str(self.Variable.Javascript) + ' == "")'
        self.Javascript = Javascript_Code
    def Python_Generate(self):
        Python_Code = '(' + str(self.Variable.Python) + ' in (None, ""))'
        self.Python = Python_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
class Operation_Less (Binary_Operation):
    Gal_Keyword = 'less'
    Gs_Keyword = 'less'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '<'
    Py_Operator = '<'
    def Attributes(self):
        pass
class Operation_Less_Equal (Binary_Operation):
    Gal_Keyword = 'le'
    Gs_Keyword = 'le'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '<='
    Py_Operator = '<='
    def Attributes(self):
        pass
class Operation_List_Get (Operation):
    Gal_Keyword = 'list.get'
    Gs_Keyword = 'list.get'
    def __init__(self):
        super().__init__()
        self.List = None
        self.Node = None
    def Python_Generate(self):
        if not self.List.Python is not None:
            raise Exception(str(self.Failure_Message('List Python missing')))
        if not self.Node.Python is not None:
            raise Exception(str(self.Failure_Message('Node Python missing')))
        Code = str(self.List.Python) + '[' + str(self.Node.Python) + ']'
        self.Python = Code
    def Javascript_Generate(self):
        if not self.List.Javascript is not None:
            raise Exception(str(self.Failure_Message('List Javascript missing')))
        if not self.Node.Javascript is not None:
            raise Exception(str(self.Failure_Message('Node Javascript missing')))
        Code = str(self.List.Javascript) + '[' + str(self.Node.Javascript) + ']'
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument List')
        self.List = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Node')
        self.Node = self.Listargs.pop(0)
class Operation_List_Last (Unary_Operation):
    Gal_Keyword = 'list.last'
    Gs_Keyword = 'list.last'
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        if not self.First.Python is not None:
            raise Exception(str(self.Failure_Message('List Python missing')))
        Code = str(self.First.Python) + '[-1]'
        self.Python = Code
    def Javascript_Generate(self):
        if not self.First.Javascript is not None:
            raise Exception(str(self.Failure_Message('List Javascript missing')))
        Code = str(self.First.Javascript) + '[' + str(self.First.Javascript) + '.length-1]'
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_List_Length (Unary_Operation):
    Gal_Keyword = 'list.length'
    Gs_Keyword = 'list.length'
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = 'len(' + str(self.First.Python) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.length'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_List_Pop (Unary_Operation):
    Gal_Keyword = 'pop'
    Gs_Keyword = 'pop'
    Aliases = " list.pop "
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = str(self.First.Python) + '.pop()'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.pop()'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_List_Shift (Unary_Operation):
    Gal_Keyword = 'shift'
    Gs_Keyword = 'shift'
    Aliases = " list.shift "
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = str(self.First.Python) + '.pop(0)'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.shift()'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_List_Split (Binary_Operation):
    Gal_Keyword = 'split'
    Gs_Keyword = 'split'
    Aliases = " list.split "
    def __init__(self):
        super().__init__()
        self.String = None
        self.Delimiter = None
    def Javascript_Generate(self):
        Javascript_Code = str(self.String.Javascript) + '.split(' + str(self.Delimiter.Javascript) + ')'
        self.Javascript = Javascript_Code
    def Python_Generate(self):
        Python_Code = str(self.String.Python) + '.split(' + str(self.Delimiter.Python) + ')'
        self.Python = Python_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument String')
        self.String = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Delimiter')
        self.Delimiter = self.Listargs.pop(0)
class Operation_Lowercase (Unary_Operation):
    Gal_Keyword = 'lowercase'
    Gs_Keyword = 'lowercase'
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = str(self.First.Python) + '.lower()'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.toLowerCase()'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_Is_Lowercase (Unary_Operation):
    Gal_Keyword = 'islower'
    Gs_Keyword = 'islower'
    Aliases = " is.lower is.lowercase "
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = str(self.First.Python) + '.islower()'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.match(/[a-z]/)'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_Is_Alpha (Unary_Operation):
    Gal_Keyword = 'isalpha'
    Gs_Keyword = 'isalpha'
    Aliases = " is.lower is.lowercase "
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = str(self.First.Python) + '.isalpha()'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.match(/[a-zA-Z]/)'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_Multiply (Repeating_Operation):
    Gal_Keyword = '*'
    Gs_Keyword = '*'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '*'
    Py_Operator = '*'
    def Attributes(self):
        pass
class Operation_New (Invocation_Operation):
    Gal_Keyword = 'new'
    Gs_Keyword = 'new'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Python_Generate(self):
        Python_Code = str(self.Class_Name.Python) + '(' + str(self.Python_Args(', ')) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'new ' + str(self.Class_Name.Javascript) + '(' + str(self.Javascript_Args(', ')) + ')'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Operation_Not (Unary_Operation):
    Gal_Keyword = 'not'
    Gs_Keyword = 'not'
    Aliases = " ! "
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '!'
    Py_Operator = 'not'
    def __init__(self):
        super().__init__()
        self.First = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_Not_Equal (Binary_Operation):
    Gal_Keyword = '!='
    Gs_Keyword = '!='
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '!='
    Py_Operator = '!='
    def Attributes(self):
        pass
class Operation_Not_Null (Operation):
    Gal_Keyword = 'not.null'
    Gs_Keyword = 'not.null'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Javascript_Generate(self):
        Javascript_Code = '(' + str(self.Variable.Javascript) + ' !== undefined && ' + str(self.Variable.Javascript) + ' > "")'
        self.Javascript = Javascript_Code
    def Python_Generate(self):
        Python_Code = '(' + str(self.Variable.Python) + ' is not None and str(' + str(self.Variable.Python) + ') > "")'
        self.Python = Python_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
class Operation_Or (Repeating_Operation):
    Gal_Keyword = 'or'
    Gs_Keyword = 'or'
    Aliases = " | "
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '||'
    Py_Operator = 'or'
    def Attributes(self):
        pass
class Operation_Round (Operation):
    Gal_Keyword = 'round'
    Gs_Keyword = 'round'
    def __init__(self):
        super().__init__()
        self.Number = None
        self.Decimals = None
    def Python_Generate(self):
        Python_Code = 'round(' + str(self.Number.Python) + ', ' + str(self.Decimals.Python) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Number.Javascript) + '.toFixed(' + str(self.Decimals.Javascript) + ')'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Number')
        self.Number = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Decimals')
        self.Decimals = self.Listargs.pop(0)
class Operation_Sql_Escape (Unary_Operation):
    Gal_Keyword = 'sql.escape'
    Gs_Keyword = 'sql.escape'
    def __init__(self):
        super().__init__()
        self.First = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_Sql_Query (Unary_Operation):
    Gal_Keyword = 'sql.query'
    Gs_Keyword = 'sql.query'
    def __init__(self):
        super().__init__()
        self.First = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_String (Unary_Operation):
    Gal_Keyword = 'string'
    Gs_Keyword = 'string'
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = 'str(' + str(self.First.Python) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'String(' + str(self.First.Javascript) + ')'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_String_Equal (String_Binary_Operation):
    Gal_Keyword = 's='
    Gs_Keyword = 's='
    Aliases = " string.eq "
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '=='
    Py_Operator = '=='
    def Attributes(self):
        pass
class Operation_String_Greater (String_Binary_Operation):
    Gal_Keyword = 'string.gt'
    Gs_Keyword = 'string.gt'
    Aliases = " string.gt "
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '>'
    Py_Operator = '>'
    def Attributes(self):
        pass
class Operation_String_Greater_Equal (String_Binary_Operation):
    Gal_Keyword = 'string.ge'
    Gs_Keyword = 'string.ge'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '>='
    Py_Operator = '>='
    def Attributes(self):
        pass
class Operation_String_Length (String_Unary_Operation):
    Gal_Keyword = 'string.length'
    Gs_Keyword = 'string.length'
    Aliases = " length "
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = 'len(' + str(self.First.Python) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.length'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_String_Less (String_Binary_Operation):
    Gal_Keyword = 'string.lt'
    Gs_Keyword = 'string.lt'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '<'
    Py_Operator = '<'
    def Attributes(self):
        pass
class Operation_String_Less_Equal (String_Binary_Operation):
    Gal_Keyword = 'string.le'
    Gs_Keyword = 'string.le'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '<='
    Py_Operator = '<='
    def Attributes(self):
        pass
class Operation_String_Not_Equal (String_Binary_Operation):
    Gal_Keyword = 'string.ne'
    Gs_Keyword = 'string.ne'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '!='
    Py_Operator = '!='
    def Attributes(self):
        pass
class Operation_Substring (Operation):
    Gal_Keyword = 'substring'
    Gs_Keyword = 'substring'
    def __init__(self):
        super().__init__()
        self.String_Value = None
        self.Start_Index = None
        self.Length = None
    def Javascript_Generate(self):
        Code = str(self.String_Value.Javascript) + '.substr(' + str(self.Start_Index.Javascript)
        if self.Length is not None:
            Code += ', ' + str(self.Length.Javascript)
        Code += ')'
        self.Javascript = Code
    def Python_Generate(self):
        SVal = str(self.String_Value.Python)
        Start = str(self.Start_Index.Python)
        Code = None
        if self.Length is not None:
            Len = str(self.Length.Python)
            if str(Len) == '1':
                Code = SVal  +  '['  +  Start  +  ']'
            else:
                Code = SVal  +  '['  +  Start  +  ':('  +  Start  +  ')+('  +  Len  +  ')]'
        else:
            Code = SVal  +  '['  +  Start  +  ':]'
        self.Python = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument String_Value')
        self.String_Value = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Start_Index')
        self.Start_Index = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Length = self.Listargs.pop(0)
class Operation_Subtract (Binary_Operation):
    Gal_Keyword = '-'
    Gs_Keyword = '-'
    Js_Precedence = 6
    Py_Precedence = 6
    Js_Operator = '-'
    Py_Operator = '-'
    def Attributes(self):
        pass
class Operation_Time_String (Operation):
    Gal_Keyword = 'time.string'
    Gs_Keyword = 'time.string'
    def Python_Generate(self):
        Python_Code = 'datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = '(new Date().toISOString())'
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Operation_Uppercase (Unary_Operation):
    Gal_Keyword = 'uppercase'
    Gs_Keyword = 'uppercase'
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = str(self.First.Python) + '.upper()'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.toUpperCase()'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_Titlecase (Unary_Operation):
    Gal_Keyword = 'titlecase'
    Gs_Keyword = 'titlecase'
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = str(self.First.Python) + '.title()'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.toUpperCase()'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_Is_Uppercase (Unary_Operation):
    Gal_Keyword = 'isupper'
    Gs_Keyword = 'isupper'
    Aliases = " is.upper is.uppercase "
    def __init__(self):
        super().__init__()
        self.First = None
    def Python_Generate(self):
        Python_Code = str(self.First.Python) + '.isupper()'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.First.Javascript) + '.match(/[A-Z]/)'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_We (Invocation_Operation):
    Gal_Keyword = 'we'
    Gs_Keyword = 'we'
    def __init__(self):
        super().__init__()
        self.Method = None
    def Python_Generate(self):
        Python_Code = 'self.__class__.' + str(self.Method.Python) + '(' + str(self.Python_Args(', ')) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Class_Name = 'this.constructor'
        if self.Method_Context is not None and isinstance(self.Method_Context, Class_Method_Statement):
            Class_Name = 'this'
        Code = str(Class_Name) + '.' + str(self.Method.Javascript) + '(' + str(self.Javascript_Args(', ')) + ')'
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Method')
        self.Method = self.Listargs.pop(0)
class Operation_Whitespace (Unary_Operation):
    Gal_Keyword = 'whitespace'
    Gs_Keyword = 'whitespace'
    def __init__(self):
        super().__init__()
        self.First = None
    def Javascript_Generate(self):
        Javascript_Code = '!' + str(self.First.Javascript) + '.match(/\\S/)'
        self.Javascript = Javascript_Code
    def Python_Generate(self):
        Python_Code = 'not(re.match(r"\\S",' + str(self.First.Python) + '))'
        self.Python = Python_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
class Operation_Int2char (Operation):
    Gal_Keyword = 'int2char'
    Gs_Keyword = 'int2char'
    def __init__(self):
        super().__init__()
        self.Integer = None
    def Python_Generate(self):
        Python_Code = 'chr(' + str(self.Integer.Python) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'String.fromCharCode(' + str(self.Integer.Javascript) + ')'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Integer')
        self.Integer = self.Listargs.pop(0)
class Operation_Char2int (Operation):
    Gal_Keyword = 'char2int'
    Gs_Keyword = 'char2int'
    def __init__(self):
        super().__init__()
        self.Character = None
    def Python_Generate(self):
        Python_Code = 'ord(' + str(self.Character.Python) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Character.Javascript) + '.charCodeAt(0)'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Character')
        self.Character = self.Listargs.pop(0)
class Operation_Environment (Operation):
    Gal_Keyword = 'env'
    Gs_Keyword = 'env'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Python_Generate(self):
        Python_Code = 'os.environ[' + str(self.Variable.Python) + ']'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'process.env[' + str(self.Variable.Javascript) + ']'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
class Syntax_Is (Syntax):
    Gal_Keyword = 'is'
    Gs_Keyword = 'is'
    def __init__(self):
        super().__init__()
        self.Superclass = None
    def Attributes(self):
        self.Superclass = self.Listargs.pop(0)
        # comment 'writelineIS ToString:  (i To_String)';
        # comment 'writelineParent ToString:  (. [my Parent] To_String)';
        self.Parent.Base_Class = True
    def Python_Generate(self):
        Python_Code = '(' + str(self.Superclass.Python) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = ' extends ' + str(self.Superclass.Javascript)
        self.Javascript = Javascript_Code
class Syntax_Dot (Syntax):
    Gal_Keyword = '.'
    Gs_Keyword = '.'
    def Python_Generate(self):
        Python_Code = str(self.Python_Arguments('.'))
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Javascript_Arguments('.'))
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Syntax_Colon (Syntax):
    Gal_Keyword = ':'
    Gs_Keyword = ':'
    def Python_Generate(self):
        Python_Code = str(self.Python_Arguments('.'))
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Javascript_Arguments('.'))
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Syntax_Key (Syntax):
    Gal_Keyword = 'key'
    Gs_Keyword = 'key'
    def __init__(self):
        super().__init__()
        self.Dictionary = None
        self.Key = None
    def Python_Generate(self):
        Python_Code = str(self.Dictionary.Python) + '[' + str(self.Key.Python) + ']'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Dictionary.Javascript) + '[' + str(self.Key.Javascript) + ']'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Dictionary')
        self.Dictionary = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Key')
        self.Key = self.Listargs.pop(0)
class Syntax_Node (Syntax):
    Gal_Keyword = 'node'
    Gs_Keyword = 'node'
    def __init__(self):
        super().__init__()
        self.List = None
        self.Node = None
    def Python_Generate(self):
        Python_Code = str(self.List.Python) + '[' + str(self.Node.Python) + ']'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.List.Javascript) + '[' + str(self.Node.Javascript) + ']'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument List')
        self.List = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Node')
        self.Node = self.Listargs.pop(0)
class Syntax_Line (Syntax):
    Gal_Keyword = 'line'
    Gs_Keyword = 'line'
    def __init__(self):
        super().__init__()
        self.Count = None
    def Python_Generate(self):
        Code = "'\\n'"
        if self.Count is not None:
            Code += '*' + str(self.Count.Python)
        self.Python = Code
    def Javascript_Generate(self):
        Code = '"\\n"'
        if self.Count is not None:
            Code += '.repeat(' + str(self.Count.Javascript) + ')'
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) > 0:
            self.Count = self.Listargs.pop(0)
class Syntax_Tab (Syntax):
    Gal_Keyword = 'tab'
    Gs_Keyword = 'tab'
    def __init__(self):
        super().__init__()
        self.Count = None
    def Python_Generate(self):
        Code = '"\\t"'
        if self.Count is not None:
            Code += '*' + str(self.Count.Python)
        self.Python = Code
    def Javascript_Generate(self):
        Code = '"\\t"'
        if self.Count is not None:
            Code += '.repeat(' + str(self.Count.Javascript) + ')'
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) > 0:
            self.Count = self.Listargs.pop(0)
class Syntax_Backslash (Syntax):
    Gal_Keyword = 'backslash'
    Gs_Keyword = 'backslash'
    def __init__(self):
        super().__init__()
        self.Count = None
    def Python_Generate(self):
        Code = "gal.backslash("
        if self.Count is not None:
            Code += str(self.Count.Python)
        Code += ')'
        self.Python = Code
    def Javascript_Generate(self):
        Code = "gal.backslash("
        if self.Count is not None:
            Code += str(self.Count.Javascript)
        Code += ')'
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) > 0:
            self.Count = self.Listargs.pop(0)
class Syntax_Indent (Syntax):
    Gal_Keyword = 'indent'
    Gs_Keyword = 'indent'
    def __init__(self):
        super().__init__()
        self.Count = None
    def Python_Generate(self):
        Code = '"    "'
        if self.Count is not None:
            Code += '*' + str(self.Count.Python)
        self.Python = Code
    def Javascript_Generate(self):
        Code = '"    "'
        if self.Count is not None:
            Code += '.repeat(' + str(self.Count.Javascript) + ')'
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) > 0:
            self.Count = self.Listargs.pop(0)
class Syntax_String (Declare_Syntax):
    Gal_Keyword = 'string'
    Gs_Keyword = 'string'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Syntax_Number (Declare_Syntax):
    Gal_Keyword = 'number'
    Gs_Keyword = 'number'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Syntax_Integer (Declare_Syntax):
    Gal_Keyword = 'integer'
    Gs_Keyword = 'integer'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Syntax_Entity (Declare_Syntax):
    Gal_Keyword = 'entity'
    Gs_Keyword = 'entity'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Syntax_Variant (Declare_Syntax):
    Gal_Keyword = 'variant'
    Gs_Keyword = 'variant'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Syntax_Flag (Declare_Syntax):
    Gal_Keyword = 'flag'
    Gs_Keyword = 'flag'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Syntax_Dictionary (Declare_Syntax):
    Gal_Keyword = 'dictionary'
    Gs_Keyword = 'dictionary'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Syntax_List (Declare_Syntax):
    Gal_Keyword = 'list'
    Gs_Keyword = 'list'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Syntax_Class (Syntax):
    Gal_Keyword = 'class'
    Gs_Keyword = 'class'
    def __init__(self):
        super().__init__()
        self.Expression = None
    def Fallback_Generate(self):
        Target = 'our'
        if self.Expression is not None:
            Target = ': '  +  self.Expression.Fallback
        Code = '[' + str(Target) + ' Global]'
    def Python_Generate(self):
        Entity = 'self.__class__'
        if self.Method_Context is not None:
            if isinstance(self.Method_Context, Class_Method_Statement):
                Entity = 'cls'
        if self.Expression is not None:
            Entity = self.Expression.Python  +  '.__class__'
        Code = str(Entity)
        Argument = None
        for Argument in self.Listargs:
            Code += '.' + str(Argument.Python)
        self.Python = Code
    def Javascript_Generate(self):
        Entity = 'this'
        if self.Expression is not None:
            Entity = self.Expression.Javascript
        Code = str(Entity) + '.constructor'
        Argument = None
        for Argument in self.Listargs:
            Code += '.' + str(Argument.Javascript)
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) > 0:
            self.Expression = self.Listargs.pop(0)
class Syntax_My_Class (Syntax):
    Gal_Keyword = 'my.class'
    Gs_Keyword = 'my.class'
    Aliases = " self.class me.class us "
    def Python_Generate(self):
        Python_Code = 'self.__class__'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'this.constructor'
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Syntax_Class_Name (Syntax):
    Gal_Keyword = 'class.name'
    Gs_Keyword = 'class.name'
    def __init__(self):
        super().__init__()
        self.Entity = None
    def Python_Generate(self):
        Entity_Code = 'self'
        if self.Entity is not None:
            Entity_Code = self.Entity.Python_Atom(99)
        Code = str(Entity_Code) + '.__class__.__name__'
        self.Python = Code
    def Javascript_Generate(self):
        Entity_Code = 'this'
        if self.Entity is not None:
            Entity_Code = self.Entity.Javascript_Atom(99)
        Code = str(Entity_Code) + '.constructor.name'
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) > 0:
            self.Entity = self.Listargs.pop(0)
class Syntax_Class_Property (Syntax):
    Gal_Keyword = 'class.property'
    Gs_Keyword = 'class.property'
    def __init__(self):
        super().__init__()
        self.First = None
        self.Second = None
    def Python_Generate(self):
        Class_Name = None
        Property_Name = None
        if self.Second is not None:
            Class_Name = self.First.Python
            Property_Name = self.Second.Python
        else:
            # comment 'writeline************ debug this here *******************';
            if not self.Method_Context is not None:
                zdebug.zbreak()
                raise Exception('No Method Context in class property ' + str(self.First.Python))
            Context = self.Method_Context
            # comment 'dv$Context';
            Class_Name = Context.Python_Class
            # comment 'dv$Class_Name';
            Property_Name = self.First.Python
        Code = str(Class_Name) + '.' + str(Property_Name)
        self.Python = Code
    def Javascript_Generate(self):
        Class_Name = None
        Property_Name = None
        if self.Second is not None:
            Class_Name = self.First.Javascript
            Property_Name = self.Second.Javascript
        else:
            Class_Name = 'this.constructor'
            if self.Method_Context is not None and isinstance(self.Method_Context, Class_Method_Statement):
                Class_Name = 'this'
            Property_Name = self.First.Javascript
        Code = str(Class_Name) + '.' + str(Property_Name)
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument First')
        self.First = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Second = self.Listargs.pop(0)
class Syntax_True (Noun_Syntax):
    Gal_Keyword = 'true'
    Gs_Keyword = 'true'
    def Python_Generate(self):
        Python_Code = 'True'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'true'
        self.Javascript = Javascript_Code
    def Mumps_Generate(self):
        Mumps_Code = '1'
        self.Mumps = Mumps_Code
    def Attributes(self):
        pass
class Syntax_False (Noun_Syntax):
    Gal_Keyword = 'false'
    Gs_Keyword = 'false'
    def Python_Generate(self):
        Python_Code = 'False'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'false'
        self.Javascript = Javascript_Code
    def Mumps_Generate(self):
        Mumps_Code = '0'
        self.Mumps = Mumps_Code
    def Attributes(self):
        pass
class Syntax_Null (Noun_Syntax):
    Gal_Keyword = 'null'
    Gs_Keyword = 'null'
    def Python_Generate(self):
        Python_Code = 'None'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'undefined'
        self.Javascript = Javascript_Code
    def Mumps_Generate(self):
        Mumps_Code = '""'
        self.Mumps = Mumps_Code
    def Attributes(self):
        pass
class Syntax_Infinity (Syntax):
    Gal_Keyword = 'infinity'
    Gs_Keyword = 'infinity'
    def Python_Generate(self):
        Python_Code = "float('inf')"
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'Infinity'
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Syntax_Negative_Infinity (Syntax):
    Gal_Keyword = '-infinity'
    Gs_Keyword = '-infinity'
    def Python_Generate(self):
        Python_Code = "-float('inf')"
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'Number.NEGATIVE_INFINITY'
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
# comment 'Atomic_Statement_AK.gal';
class Statement_Add (Line_Statement):
    Gal_Keyword = 'add'
    Gs_Keyword = 'add'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Python_Generate(self):
        Python_Code = str(self.Variable.Python) + ' += ' + str(self.Python_Args(' + ')) + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Variable.Javascript) + ' += ' + str(self.Javascript_Args(' + ')) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
class Statement_Append (Append_Args_Statement):
    Gal_Keyword = 'append'
    Gs_Keyword = 'append'
    Aliases = " string.append "
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Python_Generate(self):
        Python_Code = str(self.Variable.Python) + ' += ' + str(self.Python_String_Args(' + ')) + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Variable.Javascript) + ' += ' + str(self.Javascript_Args(' + ')) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
class Statement_Assign (Scoped_Statement):
    Gal_Keyword = '='
    Gs_Keyword = '='
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        self.Variable = self.Listargs.pop(0)
        self.Value = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            Message = "Too many arguments: 2 expected"
            self.Error = Message
            raise Exception(str(Message))
    def Mumps_Generate(self):
        Mumps_Code = ' set ' + str(self.Variable.Mumps) + '=' + str(self.Value.Mumps) + str('\n')
        self.Mumps = Mumps_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Variable.Javascript) + ' = ' + str(self.Value.Javascript) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Python_Generate(self):
        if not self.Variable.Python is not None:
            raise Exception(str(self.Failure_Message('missing Variable Python')))
        if not self.Value.Python is not None:
            raise Exception(str(self.Failure_Message('missing Value Python')))
        Code = str(self.Variable.Python) + ' = ' + str(self.Value.Python) + str('\n')
        self.Python = Code
class Statement_Break (Line_Statement):
    Gal_Keyword = 'break'
    Gs_Keyword = 'break'
    def Python_Generate(self):
        Python_Code = 'break' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'break;' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Call (Invocation_Statement):
    Gal_Keyword = '.'
    Gs_Keyword = '.'
    def __init__(self):
        super().__init__()
        self.Target = None
        self.Method = None
    def Python_Generate(self):
        Python_Code = str(self.Target.Python) + '.' + str(self.Method.Python) + '(' + str(self.Python_Args(', ')) + ')' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Target.Javascript) + '.' + str(self.Method.Javascript) + '(' + str(self.Javascript_Args(', ')) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Target')
        self.Target = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Method')
        self.Method = self.Listargs.pop(0)
class Statement_Colon (Invocation_Statement):
    Gal_Keyword = ':'
    Gs_Keyword = ':'
    Aliases = " c. "
    def __init__(self):
        super().__init__()
        self.Target = None
        self.Method = None
    def Python_Generate(self):
        Python_Code = str(self.Target.Python) + '.' + str(self.Method.Python) + '(' + str(self.Python_Args(', ')) + ')' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Target.Javascript) + '.' + str(self.Method.Javascript) + '(' + str(self.Javascript_Args(', ')) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Target')
        self.Target = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Method')
        self.Method = self.Listargs.pop(0)
class Statement_Catch (Scoped_Statement):
    Gal_Keyword = 'catch'
    Gs_Keyword = 'catch'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Python_Generate(self):
        Code = 'except Exception'
        if self.Variable is not None:
            Code += ' as ' + str(self.Variable.Python)
        Code += str(self.Python_Block())
        self.Python = Code
    def Javascript_Generate(self):
        Code = 'catch'
        if self.Variable is not None:
            Code += ' (' + str(self.Variable.Javascript) + ')'
        Code += str(self.Javascript_Block())
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) > 0:
            self.Variable = self.Listargs.pop(0)
class Statement_Continue (Line_Statement):
    Gal_Keyword = 'continue'
    Gs_Keyword = 'continue'
    def Python_Generate(self):
        Python_Code = 'continue' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'continue;' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Class_Method (Class_Method_Statement):
    Gal_Keyword = 'class.method'
    Gs_Keyword = 'class.method'
    def __init__(self):
        super().__init__()
        self.Return_Type = None
        self.Method_Name = None
        self.Python_Class = 'cls'
        self.Method_Signature = None
    def Attributes(self):
        # comment 'writelineClass Method attributes';
        self.Return_Type = self.Listargs.pop(0)
        self.Method_Name = self.Listargs.pop(0)
        self.Method_Context = self
        Header = 'class.method'
        Argument = None
        for Argument in self.Arguments:
            # comment 'The arguments must be consistent, because we need to know the header before generation begins.';
            Header += ' ' + str(Argument.Get_Input())
        self.Method_Signature = Header
        # comment 'writelineSaved class method header:  Header';
    def Python_Generate(self):
        Code = '@classmethod' + str('\n') + 'def ' + str(self.Method_Name.Python) + '(cls'
        Args = str(self.Python_Args(', '))
        if str(Args) > '':
            Code += ', ' + str(Args)
        Code += ')' + str(self.Python_Block())
        self.Python = Code
    def Javascript_Generate(self):
        Javascript_Code = 'static ' + str(self.Method_Name.Javascript) + '(' + str(self.Javascript_Args(', ')) + ')' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
class Statement_Class_Property (Class_Property_Statement):
    Gal_Keyword = 'class.property'
    Gs_Keyword = 'class.property'
    def __init__(self):
        super().__init__()
        self.Data_Type = None
        self.Property_Name = None
        self.Value = None
    def Python_Generate(self):
        Name_Code = str(self.Property_Name.Python)
        Value_Code = 'None'
        DT = str(self.Data_Type.Input)
        DT = ' '  +  DT  +  ' '
        if DT in ' dict dictionary hash ':
            Value_Code = '{}'
        elif DT in ' list array ':
            Value_Code = '[]'
        if self.Value is not None:
            Value_Code = self.Value.Python
        Code = str(Name_Code) + ' = ' + str(Value_Code) + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Name_Code = str(self.Property_Name.Javascript)
        Value_Code = 'undefined'
        DT = str(self.Data_Type.Input)
        DT = ' '  +  DT  +  ' '
        if DT in ' dict dictionary hash ':
            Value_Code = '{}'
        elif DT in ' list array ':
            Value_Code = '[]'
        if self.Value is not None:
            Value_Code = self.Value.Javascript
        Code = 'static ' + str(Name_Code) + ' = ' + str(Value_Code) + ';' + str('\n')
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Data_Type')
        self.Data_Type = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Property_Name')
        self.Property_Name = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Statement_Comment (Comment_Statement):
    Gal_Keyword = 'comment'
    Gs_Keyword = 'comment'
    def Fallback_Generate(self):
        Gal_Code = 'comment ' + str(self.Enquote(self.Argument_String())) + ';'
        self.Fallback = Gal_Code
    def Python_Generate(self):
        Code = ''
        Arg = str(self.Get_Input())
        Lines = Arg.split('\n')
        for Arg in Lines:
            Code += '# ' + str(Arg) + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Javascript_Code = '/* ' + str(self.Get_Input()) + ' */' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Constructor (Constructor_Statement):
    Gal_Keyword = 'constructor'
    Gs_Keyword = 'constructor'
    def Python_Generate(self):
        Code = 'def __init__(self'
        Args = str(self.Python_Args(', '))
        if str(Args) > '':
            Code += ', ' + str(Args)
        Code += '):' + str('\n') + str("    ") + 'super().__init__()' + str('\n')
        if self.Parent.Generate_Constructor:
            Code += str("    ") + 'self.propinit()' + str('\n')
        Code += str(self.Python_Statements())
        self.Python = Code
    def Javascript_Generate(self):
        Code = 'constructor('
        Args = str(self.Javascript_Args(', '))
        if str(Args) > '':
            Code += str(Args)
        Code += ') {' + str('\n') + str("    ") + 'super();' + str('\n')
        if self.Parent.Generate_Constructor:
            Code += str("    ") + 'this.propinit();' + str('\n')
        Code += str(self.Javascript_Statements()) + '}' + str('\n')
        self.Javascript = Code
    def Attributes(self):
        pass
class Statement_Debug (Line_Statement):
    Gal_Keyword = 'debug'
    Gs_Keyword = 'debug'
    def Python_Generate(self):
        Python_Code = 'zdebug.zbreak()' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'debugger;' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Debug_If (Line_Statement):
    Gal_Keyword = 'debugif'
    Gs_Keyword = 'debugif'
    def Python_Generate(self):
        Python_Code = 'if ' + str(self.Python_Args(',')) + ':' + str('\n') + str("    ") + 'zdebug.zbreak()' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'if ' + str(self.Javascript_Args(',')) + str('\n') + '{' + str('\n') + str("    ") + 'debugger;' + str('\n') + '}' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Debug_Stack (Line_Statement):
    Gal_Keyword = 'debug.stack'
    Gs_Keyword = 'debug.stack'
    def Attributes(self):
        pass
class Statement_Debug_Variable (Line_Statement):
    Gal_Keyword = 'debug.variable'
    Gs_Keyword = 'debug.variable'
    def Python_Generate(self):
        Code = ""
        Argument = None
        for Argument in self.Arguments:
            Arg_Name = str(Argument.Python)
            Code += 'try:' + str('\n') + str("    ") + 'print("' + str(Arg_Name) + ':", ' + str(Arg_Name) + ');' + str('\n') + 'except Exception:' + str('\n') + str("    ") + 'print("' + str(Arg_Name) + ':", "<ERROR>")' + str('\n')
            self.Python = Code
    def Javascript_Generate(self):
        Code = ""
        Argument = None
        for Argument in self.Arguments:
            Arg_Name = str(Argument.Javascript)
            Code += 'try {' + str('\n') + str("    ") + 'console.log("' + str(Arg_Name) + ':", ' + str(Arg_Name) + ');' + str('\n') + '}' + str('\n') + 'catch {' + str('\n') + str("    ") + 'console.log("' + str(Arg_Name) + ':", "<ERROR>");' + str('\n') + '}' + str('\n')
            self.Javascript = Code
    def Attributes(self):
        pass
class Statement_Dictionary (Scoped_Statement):
    Gal_Keyword = 'dict'
    Gs_Keyword = 'dict'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Python_Generate(self):
        Variable_Code = str(self.Variable.Python)
        Value_Code = ""
        Between = ''
        Argument = None
        for Argument in self.Listargs:
            Value_Code += str(Between) + str(Argument.Python)
            Between = ', '
        Code = str(Variable_Code) + ' = {' + str(Value_Code) + '}' + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Variable_Code = str(self.Variable.Javascript)
        Value_Code = ""
        Between = ''
        Argument = None
        for Argument in self.Listargs:
            Value_Code += str(Between) + str(Argument.Javascript)
            Between = ', '
        Code = 'var ' + str(Variable_Code) + '= {' + str(Value_Code) + '};' + str('\n')
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
class Statement_Dictionary_Assign (Scoped_Statement):
    Gal_Keyword = 'dict.='
    Gs_Keyword = 'dict.='
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Key = None
        self.Value = None
    def Python_Generate(self):
        Python_Code = str(self.Variable.Python) + '[' + str(self.Key.Python) + '] = ' + str(self.Value.Python) + ';' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Variable.Javascript) + '[' + str(self.Key.Javascript) + '] = ' + str(self.Value.Javascript) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Key')
        self.Key = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Value')
        self.Value = self.Listargs.pop(0)
class Statement_Else (If_Statement):
    Gal_Keyword = 'else'
    Gs_Keyword = 'else'
    def Python_Generate(self):
        Python_Code = 'else' + str(self.Python_Block())
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'else' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Else_If (If_Statement):
    Gal_Keyword = 'else.if'
    Gs_Keyword = 'else.if'
    def __init__(self):
        super().__init__()
        self.Condition = None
    def Python_Generate(self):
        Python_Code = 'elif ' + str(self.Condition.Python) + str(self.Python_Block())
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'else if (' + str(self.Condition.Javascript) + ')' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Condition')
        self.Condition = self.Listargs.pop(0)
class Statement_Entity (Declare_Statement):
    Gal_Keyword = 'entity'
    Gs_Keyword = 'entity'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Statement_Error (Append_Args_Statement):
    Gal_Keyword = 'error'
    Gs_Keyword = 'error'
    def Python_Generate(self):
        Python_Code = 'raise Exception(' + str(self.Python_String_Args(' + ')) + ')' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'throw ' + str(self.Javascript_Args(' + ')) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_File_Append (Line_Statement):
    Gal_Keyword = 'file.append'
    Gs_Keyword = 'file.append'
    def __init__(self):
        super().__init__()
        self.File_Name = None
        self.Appended_Text = None
    def Python_Generate(self):
        Python_Code = 'gal.file_append(' + str(self.File_Name.Python) + ',' + str(self.Appended_Text.Python) + ')' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'gal.file_append(' + str(self.File_Name.Javascript) + ',' + str(self.Appended_Text.Javascript) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument File_Name')
        self.File_Name = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Appended_Text')
        self.Appended_Text = self.Listargs.pop(0)
class Statement_File_Readall (Line_Statement):
    Gal_Keyword = 'file.readall'
    Gs_Keyword = 'file.readall'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.File_Name = None
    def Python_Generate(self):
        Python_Code = '_FH = open(' + str(self.File_Name.Python) + ', "r")' + str('\n') + str(self.Variable.Python) + ' = _FH.read()' + str('\n') + '_FH.close()' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Varname = str(self.Variable.Javascript)
        File_Name = str(self.File_Name.Javascript)
        Code = str(Varname) + ' = gal.file_reader.readFileSync(' + str(File_Name) + ",'utf8');" + str('\n')
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument File_Name')
        self.File_Name = self.Listargs.pop(0)
class Statement_File_Dump (Line_Statement):
    Gal_Keyword = 'file.dump'
    Gs_Keyword = 'file.dump'
    def __init__(self):
        super().__init__()
        self.File_Text = None
        self.File_Name = None
    def Python_Generate(self):
        Python_Code = '_FH = open(' + str(self.File_Name.Python) + ', "w")' + str('\n') + '_FH.write(' + str(self.File_Text.Python) + ')' + str('\n') + '_FH.close()' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'gal.file_reader.writeFileSync(' + str(self.File_Name.Javascript) + ', ' + str(self.File_Text.Javascript) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument File_Text')
        self.File_Text = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument File_Name')
        self.File_Name = self.Listargs.pop(0)
class Statement_Flag (Declare_Statement):
    Gal_Keyword = 'flag'
    Gs_Keyword = 'flag'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Statement_Foreach (Scoped_Statement):
    Gal_Keyword = 'foreach'
    Gs_Keyword = 'foreach'
    def __init__(self):
        super().__init__()
        self.List = None
        self.Variable = None
    def Python_Generate(self):
        Python_Code = 'for ' + str(self.Variable.Python) + ' in ' + str(self.List.Python) + str(self.Python_Block())
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'for (' + str(self.Variable.Javascript) + ' of ' + str(self.List.Javascript) + ')' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument List')
        self.List = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
class Statement_Forever (Scoped_Statement):
    Gal_Keyword = 'forever'
    Gs_Keyword = 'forever'
    def Python_Generate(self):
        Python_Code = 'while True' + str(self.Python_Block())
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'while (true)' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Forgive (Scoped_Statement):
    Gal_Keyword = 'forgive'
    Gs_Keyword = 'forgive'
    def Python_Generate(self):
        Python_Code = 'try' + str(self.Python_Block()) + 'except Exception:' + str('\n') + str("    ") + 'pass' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'try' + str(self.Javascript_Block()) + 'catch { } ' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Forward (Line_Statement):
    Gal_Keyword = 'forward'
    Gs_Keyword = 'forward'
    def __init__(self):
        super().__init__()
        self.Name = None
    def Python_Generate(self):
        Python_Code = '# forward ' + str(self.Name.Python) + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = '// forward ' + str(self.Name.Javascript) + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
class Statement_For_Range (For_Statement):
    Gal_Keyword = 'for.range'
    Gs_Keyword = 'for.range'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Start_Index = None
        self.End_Index = None
    def Python_Generate(self):
        if not self.Variable.Python is not None:
            raise Exception(str(self.Failure_Message('Variable Python not defined')))
        if not self.Start_Index.Python is not None:
            raise Exception(str(self.Failure_Message('Start Index Python not defined')))
        if not self.End_Index.Python is not None:
            raise Exception(str(self.Failure_Message('End Index Python not defined')))
        Code = 'for ' + str(self.Variable.Python) + ' in range(' + str(self.Start_Index.Python) + ', ' + str(self.End_Index.Python) + '+1)' + str(self.Python_Block())
        self.Python = Code
    def Javascript_Generate(self):
        if not self.Variable.Javascript is not None:
            raise Exception(str(self.Failure_Message('Variable Javascript not defined')))
        if not self.Start_Index.Javascript is not None:
            raise Exception(str(self.Failure_Message('Start Index Javascript not defined')))
        if not self.End_Index.Javascript is not None:
            raise Exception(str(self.Failure_Message('End Index Javascript not defined')))
        Code = 'for (' + str(self.Variable.Javascript) + '=' + str(self.Start_Index.Javascript) + '; ' + str(self.Variable.Javascript) + '<=' + str(self.End_Index.Javascript) + '; ' + str(self.Variable.Javascript) + '++)' + str(self.Javascript_Block())
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Start_Index')
        self.Start_Index = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument End_Index')
        self.End_Index = self.Listargs.pop(0)
class Statement_Increment (Statement):
    Gal_Keyword = 'increment'
    Gs_Keyword = 'increment'
    def __init__(self):
        super().__init__()
        self.Numeric = None
    # comment "python [my Numeric Python] ' += 1' [line];";
    def Python_Generate(self):
        Python_Code = str(self.Numeric.Python) + " += 1" + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Numeric.Javascript) + "++;" + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Numeric')
        self.Numeric = self.Listargs.pop(0)
class Statement_And (Statement):
    Gal_Keyword = 'and'
    Gs_Keyword = 'and'
    def __init__(self):
        super().__init__()
        self.Flag = None
        self.Value = None
    def Python_Generate(self):
        Python_Code = str(self.Flag.Python) + " &= " + str(self.Value.Python) + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Flag.Javascript) + " &= " + str(self.Value.Javascript) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Flag')
        self.Flag = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Value')
        self.Value = self.Listargs.pop(0)
class Statement_If (If_Statement):
    Gal_Keyword = 'if'
    Gs_Keyword = 'if'
    def __init__(self):
        super().__init__()
        self.Condition = None
    def Python_Generate(self):
        Python_Code = 'if ' + str(self.Condition.Python) + str(self.Python_Block())
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'if (' + str(self.Condition.Javascript) + ')' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Condition')
        self.Condition = self.Listargs.pop(0)
class Statement_Iterate (Scoped_Statement):
    Gal_Keyword = 'iterate'
    Gs_Keyword = 'iterate'
    def __init__(self):
        super().__init__()
        self.Dictionary = None
        self.Key_Variable = None
        self.Value_Variable = None
    def Python_Generate(self):
        Python_Code = 'for ' + str(self.Key_Variable.Python) + ', ' + str(self.Value_Variable.Python) + ' in ' + str(self.Dictionary.Python) + '.items()' + str(self.Python_Block())
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'for ([' + str(self.Key_Variable.Javascript) + ', ' + str(self.Value_Variable.Javascript) + '] of Object.entries(' + str(self.Dictionary.Javascript) + '))' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Dictionary')
        self.Dictionary = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Key_Variable')
        self.Key_Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Value_Variable')
        self.Value_Variable = self.Listargs.pop(0)
class Statement_Integer (Declare_Statement):
    Gal_Keyword = 'integer'
    Gs_Keyword = 'integer'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Statement_Join (Assign_Statement):
    Gal_Keyword = 'join'
    Gs_Keyword = 'join'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.List = None
        self.Delimiter = None
    # comment 'python [my Variable Python] =  [my List Python].join( [my Delimiter Python]) [line]';
    def Python_Generate(self):
        Python_Code = str(self.Variable.Python) + ' = ' + str(self.Delimiter.Python) + '.join(' + str(self.List.Python) + ')' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Variable.Javascript) + ' = ' + str(self.List.Javascript) + '.join(' + str(self.Delimiter.Javascript) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument List')
        self.List = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Delimiter')
        self.Delimiter = self.Listargs.pop(0)
class Statement_Know (Line_Statement):
    Gal_Keyword = 'know'
    Gs_Keyword = 'know'
    def Attributes(self):
        pass
# comment 'Atomic_Statement_LZ.gal';
class Statement_List (Declare_Statement):
    Gal_Keyword = 'list'
    Gs_Keyword = 'list'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Attributes(self):
        self.Variable = self.Listargs.pop(0)
    def Python_Generate(self):
        Variable = str(self.Variable.Python)
        Args = str(self.Python_Args(', '))
        Code = str(Variable) + ' = [' + str(Args) + ']' + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Variable = str(self.Variable.Javascript)
        Args = str(self.Javascript_Args(', '))
        Code = 'var ' + str(Variable) + ' = [' + str(Args) + '];' + str('\n')
        self.Javascript = Code
class Statement_List_Clear (Line_Statement):
    Gal_Keyword = 'list.clear'
    Gs_Keyword = 'list.clear'
    def __init__(self):
        super().__init__()
        self.List = None
    def Python_Generate(self):
        Python_Code = str(self.List.Python) + '.clear()'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.List.Javascript) + ' = [];'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument List')
        self.List = self.Listargs.pop(0)
class Statement_List_Copy (Declare_Statement):
    Gal_Keyword = 'list.copy'
    Gs_Keyword = 'list.copy'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
    def Python_Generate(self):
        Variable = str(self.Variable.Python)
        Value = '[]'
        if self.Value is not None:
            Value = self.Value.Python
        Code = str(Variable) + ' = ' + str(Value) + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Variable = str(self.Variable.Javascript)
        Value = '[]'
        if self.Value is not None:
            Value = self.Value.Javascript
        Code = 'var ' + str(Variable) + ' = ' + str(Value) + ';' + str('\n')
        self.Javascript = Code
class Statement_List_Append (Append_Args_Statement):
    Gal_Keyword = 'push'
    Gs_Keyword = 'push'
    Aliases = " list.push list.append "
    def __init__(self):
        super().__init__()
        self.List = None
    def Python_Generate(self):
        Python_Code = str(self.List.Python) + '.extend([' + str(self.Python_Args(', ')) + '])' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.List.Javascript) + '.push(' + str(self.Javascript_Args(', ')) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument List')
        self.List = self.Listargs.pop(0)
class Statement_List_Delete (Line_Statement):
    Gal_Keyword = 'list.delete'
    Gs_Keyword = 'list.delete'
    Aliases = " list.remove list.splice "
    def __init__(self):
        super().__init__()
        self.List = None
        self.Index = None
        self.Count = None
    def Python_Generate(self):
        Python_Code = 'del ' + str(self.List.Python) + '[' + str(self.Index.Python) + ':' + str(self.Index.Python) + '+' + str(self.Count.Python) + ']' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.List.Javascript) + '.splice(' + str(self.Index.Javascript) + ', ' + str(self.Count.Javascript) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument List')
        self.List = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Index')
        self.Index = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Count')
        self.Count = self.Listargs.pop(0)
class Statement_Main (Method_Statement):
    Gal_Keyword = 'main'
    Gs_Keyword = 'main'
    def __init__(self):
        super().__init__()
        self.Signatures = {}
        self.Python_Class = '__foobar__'
    def Python_Generate(self):
        Code = "if __name__ == '__main__'"
        if len(self.Listargs) > 0:
            Code += ':' + str('\n') + str("    ") + 'try:' + str('\n') + str("    "*2) + '(' + str(self.Python_Args(', ')) + ') = sys.argv[1:]' + str('\n') + str("    ") + 'except:' + str('\n') + str("    "*2) + 'pass' + str('\n')
            # comment `print("Usage: python", sys.argv[0], "(i Python_Args ' ')") [line , indent 2]sys.exit() [line]`;
            Code += str(self.Python_Statements())
        else:
            Code += str(self.Python_Block())
        self.Python = Code
    def Javascript_Generate(self):
        Args_Code = 'let [_node, _code, ' + str(self.Javascript_Args(', ')) + '] = process.argv;' + str('\n')
        Statement = None
        Statements_Code = ''
        for Statement in self.Block.Statements:
            Statements_Code += str(Statement.Javascript)
        Code = '/* Main Program Body */' + str('\n') + str(Args_Code) + str(Statements_Code) + str('\n')
        self.Javascript = Code
    def Mumps_Generate(self):
        Mumps_Code = 'main ; main entry point' + str('\n') + str(self.Block.Mumps) + str("    ") + 'quit' + str('\n')
        self.Mumps = Mumps_Code
    def Attributes(self):
        pass
class Statement_Method (Method_Statement):
    Gal_Keyword = 'method'
    Gs_Keyword = 'method'
    def __init__(self):
        super().__init__()
        self.Return_Type = None
        self.Method_Name = None
        self.Python_Class = 'self.__class__'
    def Attributes(self):
        self.Return_Type = self.Listargs.pop(0)
        self.Method_Name = self.Listargs.pop(0)
        self.Method_Context = self
    def Python_Generate(self):
        Code = 'def ' + str(self.Method_Name.Python) + '(self'
        Args = str(self.Python_Args(', '))
        Block = str(self.Python_Block())
        if str(Args) > '':
            Code += ', ' + str(Args)
        Code += ')' + str(Block)
        self.Python = Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Method_Name.Javascript) + '(' + str(self.Javascript_Args(', ')) + ')' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
class Statement_Module (Line_Statement):
    Gal_Keyword = 'module'
    Gs_Keyword = 'module'
    def Attributes(self):
        pass
class Statement_Number (Declare_Statement):
    Gal_Keyword = 'number'
    Gs_Keyword = 'number'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Statement_Property (Property_Statement):
    Gal_Keyword = 'property'
    Gs_Keyword = 'property'
    def __init__(self):
        super().__init__()
        self.Data_Type = None
        self.Property_Name = None
        self.Value = None
    def Python_Generate(self):
        Name_Code = str(self.Property_Name.Python)
        Value_Code = 'None'
        DT = str(self.Data_Type.Input)
        DT = ' '  +  DT  +  ' '
        if DT in ' dict dictionary hash ':
            Value_Code = '{}'
        elif DT in ' list array ':
            Value_Code = '[]'
        # comment 'writelineproperty before defined';
        if self.Value is not None:
            Value_Code = self.Value.Python
        # comment 'writelineproperty after defined';
        Code = 'self.' + str(Name_Code) + ' = ' + str(Value_Code) + str('\n')
        # comment 'writelineProperty Code  Code';
        self.Python = Code
    def Javascript_Generate(self):
        Name_Code = str(self.Property_Name.Javascript)
        Value_Code = 'undefined'
        DT = str(self.Data_Type.Input)
        DT = ' '  +  DT  +  ' '
        if DT in ' dict dictionary hash ':
            Value_Code = '{}'
        elif DT in ' list array ':
            Value_Code = '[]'
        if self.Value is not None:
            Value_Code = self.Value.Javascript
        Code = 'this.' + str(Name_Code) + ' = ' + str(Value_Code) + ';' + str('\n')
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Data_Type')
        self.Data_Type = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Property_Name')
        self.Property_Name = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Statement_Propset (Assign_Statement):
    Gal_Keyword = '.='
    Gs_Keyword = '.='
    def __init__(self):
        super().__init__()
        self.Target = None
        self.Property = None
        self.Expression = None
    def Python_Generate(self):
        Python_Code = str(self.Target.Python) + '.' + str(self.Property.Python) + ' = ' + str(self.Expression.Python) + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Target.Javascript) + '.' + str(self.Property.Javascript) + ' = ' + str(self.Expression.Javascript) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Target')
        self.Target = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Property')
        self.Property = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Expression')
        self.Expression = self.Listargs.pop(0)
class Statement_Classpropset (Assign_Statement):
    Gal_Keyword = ':='
    Gs_Keyword = ':='
    def __init__(self):
        super().__init__()
        self.Target = None
        self.Property = None
        self.Expression = None
    def Python_Generate(self):
        Python_Code = str(self.Target.Python) + '.' + str(self.Property.Python) + ' = ' + str(self.Expression.Python) + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Target.Javascript) + '.' + str(self.Property.Javascript) + ' = ' + str(self.Expression.Javascript) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Target')
        self.Target = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Property')
        self.Property = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Expression')
        self.Expression = self.Listargs.pop(0)
class Statement_Our_Equal (Assign_Statement):
    Gal_Keyword = 'our='
    Gs_Keyword = 'our='
    Aliases = " our.= us= us.= ours= ours.= "
    def __init__(self):
        super().__init__()
        self.Property = None
        self.Expression = None
    def Python_Generate(self):
        Python_Code = 'cls.' + str(self.Property.Python) + ' = ' + str(self.Expression.Python) + str('\n')
        self.Python = Python_Code
    # comment "TODO:" 'javascript context this.prototype vs this';
    def Javascript_Generate(self):
        Javascript_Code = 'this.' + str(self.Property.Javascript) + ' = ' + str(self.Expression.Javascript) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Property')
        self.Property = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Expression')
        self.Expression = self.Listargs.pop(0)
class Statement_Read_Line (Read_Statement):
    Gal_Keyword = 'readline'
    Gs_Keyword = 'readline'
    def Python_Generate(self):
        Argument = None
        Argument_Python = None
        Code = ''
        for Argument in self.Arguments:
            Argument_Python = Argument.Python
            if isinstance(Argument, Quote):
                pass
            if isinstance(Argument, Token_Name):
                Code += str(Argument_Python) + ' = input()' + str('\n')
            else:
                Code += "print(" + str(Argument_Python) + ",sep='',end='')" + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Argument = None
        Argument_Javascript = None
        Code = ''
        for Argument in self.Arguments:
            Argument_Javascript = Argument.Javascript
            if isinstance(Argument, Quote):
                pass
            if isinstance(Argument, Token_Name):
                Code += str(Argument_Javascript) + ' = console.input();' + str('\n')
            else:
                Code += 'console.log(' + str(Argument_Javascript) + ');' + str('\n')
        self.Python = Code
    def Attributes(self):
        pass
class Statement_Replace (Line_Statement):
    Gal_Keyword = 'replace'
    Gs_Keyword = 'replace'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Search_Text = None
        self.Replace_Text = None
    def Python_Generate(self):
        Python_Code = str(self.Variable.Python) + ' = ' + str(self.Variable.Python) + '.replace(' + str(self.Search_Text.Python) + ', ' + str(self.Replace_Text.Python) + ')' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Variable.Javascript) + ' = ' + str(self.Variable.Javascript) + '.replaceAll(' + str(self.Search_Text.Javascript) + ', ' + str(self.Replace_Text.Javascript) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Search_Text')
        self.Search_Text = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Replace_Text')
        self.Replace_Text = self.Listargs.pop(0)
class Statement_Return (Line_Statement):
    Gal_Keyword = 'return'
    Gs_Keyword = 'return'
    def __init__(self):
        super().__init__()
        self.Value = None
    def Python_Generate(self):
        Value_Python = ''
        if self.Value is not None:
            Value_Python += ' ' + str(self.Value.Python)
        Code = 'return' + str(Value_Python) + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Value_Javascript = ''
        if self.Value is not None:
            Value_Javascript += ' ' + str(self.Value.Javascript)
        Code = 'return' + str(Value_Javascript) + ';' + str('\n')
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Statement_Sort (Line_Statement):
    Gal_Keyword = 'sort'
    Gs_Keyword = 'sort'
    def __init__(self):
        super().__init__()
        self.List = None
        self.Method = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument List')
        self.List = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Method = self.Listargs.pop(0)
class Statement_String (Append_Args_Statement):
    Gal_Keyword = 'string'
    Gs_Keyword = 'string'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Attributes(self):
        self.Variable = self.Listargs.pop(0)
        self.Variable.Usage = 'variable'
        Argument = None
        for Argument in self.Listargs:
            Argument.Usage = 'string'
    def Python_Generate(self):
        Var_Code = str(self.Variable.Python)
        Val_Code = None
        if len(self.Listargs) > 0:
            Val_Code = self.Python_String_Args(' + ')
        else:
            Val_Code = "None"
        Code = str(Var_Code) + ' = ' + str(Val_Code) + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Var_Code = str(self.Variable.Javascript)
        Val_Code = None
        if len(self.Listargs) > 0:
            Val_Code = ' = '  +  self.Javascript_Args(' + ')
        else:
            Val_Code = ""
        Code = 'var ' + str(Var_Code) + str(Val_Code) + ';' + str('\n')
        self.Javascript = Code
class Statement_Try (Scoped_Statement):
    Gal_Keyword = 'try'
    Gs_Keyword = 'try'
    def Python_Generate(self):
        Python_Code = 'try' + str(self.Python_Block())
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'try' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Variant (Declare_Statement):
    Gal_Keyword = 'variant'
    Gs_Keyword = 'variant'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Value = self.Listargs.pop(0)
class Statement_While (Scoped_Statement):
    Gal_Keyword = 'while'
    Gs_Keyword = 'while'
    def __init__(self):
        super().__init__()
        self.Condition = None
    def Python_Generate(self):
        Python_Code = 'while ' + str(self.Condition.Python) + str(self.Python_Block())
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'while (' + str(self.Condition.Javascript) + ')' + str(self.Javascript_Block())
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Condition')
        self.Condition = self.Listargs.pop(0)
class Statement_Write (Append_Args_Statement):
    Gal_Keyword = 'write'
    Gs_Keyword = 'write'
    def Python_Generate(self):
        Code = 'print(' + str(self.Python_Args(', '))
        if len(self.Listargs) > 1:
            Code += ",sep=''"
        Code += ",end='')" + str('\n')
        self.Python = Code
    def Attributes(self):
        pass
class Statement_Class (Class_Statement):
    Gal_Keyword = 'class'
    Gs_Keyword = 'class'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Debug_Generate(self):
        Gal_Code = str(self.__class__.Gal_Keyword)
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += ' ' + str(Argument.Gal)
        if self.Block is not None:
            self.Block.Debug_Generate()
            Gal_Code += str(self.Block.Gal)
        else:
            Gal_Code += ';'
        self.Debug = Gal_Code
    def Fallback_Generate(self):
        Name = str(self.Class_Name.Input)
        Owner_Class = Compiler.Instance.Get_Class(Name)
        Statement = None
        Argument = None
        if self.Am(Owner_Class):
            Ancestor = ''
            if len(self.Listargs) > 0:
                Ancestor += ' ' + str(self.Listargs[-1].Fallback)
            Arguments = ' ' + str(self.Class_Name.Fallback) + ' ' + str(Ancestor)
            Class_Properties = ''
            Prop = None
            for Prop in self.Class_Property_Statements:
                Prop.Fallback_Generate()
                Class_Properties += str(Prop.Fallback)
            Block = str(Class_Properties)
            if self.Constructor is not None:
                self.Constructor.Fallback_Generate()
                Thiscon = str(self.Indent(self.Constructor.Fallback))
                Block += str(Thiscon)
            Prop_Code = ''
            for Prop in self.Property_Statements:
                Prop.Fallback_Generate()
                Block += str(Prop.Fallback) + str('\n')
            MBGal = ''
            for Statement in self.Main_Body:
                Statement.Fallback_Generate()
                MBGal += str(Statement.Fallback)
            Block += str(MBGal)
            Block = self.Indent(Block)
            Code = 'class' + str(Arguments) + str('\n') + '{' + str('\n') + str(Block) + '}' + str('\n')
            self.Fallback = Code
        else:
            for Argument in self.Listargs:
                Owner_Class.Listargs.extend([Argument])
            for Statement in self.Block.Statements:
                Owner_Class.Block.Add_Statement(Statement)
                Owner_Class.Append_Statement(Statement)
            if Owner_Class.Block.Fallback is not None:
                Owner_Class.Block.Fallback_Generate()
            if Owner_Class.Fallback is not None:
                Owner_Class.Fallback_Generate()
            self.Fallback = ''
    def Python_Generate(self):
        Null_Block = True
        Arguments = str(self.Python_Arguments(' '))
        Class_Properties = ''
        MBPy = ''
        Prop = None
        Statement = None
        for Prop in self.Class_Property_Statements:
            Class_Properties += str(Prop.Python)
            Null_Block = False
        Block = ''
        Block += str(self.Indent(Class_Properties))
        if self.Constructor is not None:
            Thiscon = str(self.Indent(self.Constructor.Python))
            Block += str(Thiscon)
            Null_Block = False
        if self.Generate_Constructor:
            Null_Block = False
            Prop_Code = ''
            for Prop in self.Property_Statements:
                Prop_Code += str(Prop.Python)
            Function = '__init__'
            Super = str("    ") + 'super().__init__()' + str('\n')
            if self.Constructor is not None:
                Function = 'propinit'
                Super = ''
            Constructor = 'def ' + str(Function) + '(self):' + str('\n')
            Constructor += str(Super)
            Constructor += str(self.Indent(Prop_Code))
            Constructor = self.Indent(Constructor)
            Block += str(Constructor)
        for Statement in self.Main_Body:
            MBPy += str(Statement.Python)
            Null_Block = False
        MBPy = self.Indent(MBPy)
        Block += str(MBPy)
        if Null_Block:
            Block += str("    ") + 'pass' + str('\n')
        Code = 'class ' + str(Arguments) + ':' + str('\n') + str(Block)
        self.Python = Code
    def Javascript_Generate(self):
        Arguments = str(self.Javascript_Arguments(' '))
        if not self.Base_Class:
            Arguments += ' extends gal'
        Class_Properties = ''
        MBjs = ''
        Prop = None
        Statement = None
        for Prop in self.Class_Property_Statements:
            Class_Properties += str(Prop.Javascript)
        Block = ' {' + str('\n')
        Block += str(self.Indent(Class_Properties))
        if self.Generate_Constructor:
            Prop_Code = ''
            for Prop in self.Property_Statements:
                Prop_Code += str(Prop.Javascript)
            Constructor = str(self.Indent(Prop_Code))
            Constructor = self.Indent(Constructor)
            Constructor = "    "  +  'constructor()'  +  '\n'  +  "    "  +  '{'  +  '\n'  +  "    "*2  +  'super();'  +  '\n'  +  Constructor  +  "    "  +  '}'  +  '\n'
            Block += str(Constructor)
        elif self.Constructor is not None:
            Block += str(self.Constructor.Javascript)
        StmtJs = None
        for Statement in self.Main_Body:
            if not Statement.Javascript is not None:
                raise Exception("Class method statement Javascript not defined: " + str(Statement.Gal_Code()))
            Stmt_Js = str(Statement.Javascript)
            MBjs += str(Stmt_Js)
        MBjs = self.Indent(MBjs)
        Block += str(MBjs) + '}' + str('\n')
        Code = 'class ' + str(Arguments) + str(Block)
        self.Javascript = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
        self.Class_Name.Usage = 'class'
# comment 'Fallback.gal';
class Definition_Statement (Scoped_Statement):
    Gal_Keyword = None
    Aliases = None
    Base_Class = None
    def __init__(self):
        super().__init__()
        self.Name_Arg = None
        self.Keyword = None
        self.Root_Type = None
        self.Class_Name = None
        self.Generate_Attributes = None
        self.Argument_Statements = []
        self.Declarations = ''
        self.Name_Prefix = ''
    def Attributes(self):
        self.Name_Arg = self.Listargs.pop(0)
        self.Keyword = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Root_Type = self.Listargs.pop(0)
            # comment 'writelineAssign Root Type:  [my Root_Type Gal]';
        Name = str(self.__class__.Base_Class)
        Name += '_'
        Name += str(self.Name_Arg.Input)
        Token_Entity = Token_Name()
        Token_Entity.Input = Name
        self.Class_Name = Token_Entity
        Compiler.Instance.Add_Class(self)
        Compiler.Instance.Add_Definition(self)
    def Append_Statement(self, Statement):
        # comment 'definition statement append statement';
        self.Block.Statements.extend([Statement])
    def Structure(self):
        if not self.Re_Structure:
            return
        self.Re_Structure = False
        self.Base_Structure()
        self.Generate_Attributes = True
        if self.Block is not None and self.Block.Statements is not None:
            # comment 'writelineMain Structure  [class.name]  [my Name_Arg Input]';
            for Statement in self.Block.Statements:
                # comment 'writelineStructure Statement  [class.name Statement]';
                if isinstance(Statement, Method_Statement) and str(Statement.Method_Name.Input) == 'Attributes':
                    self.Generate_Attributes = False
                elif isinstance(Statement, Argument_Statement):
                    self.Argument_Statements.extend([Statement])
        Element = None
        for Element in self.Elements:
            # comment '.= Element Parent [me]';
            pass
        # comment 'writeline***  [class.name]  [my Name_Arg Input].Structure determined Generate_Attributes is  [my Generate_Attributes] ***';
    def Fallback_Generate(self):
        Class_Name = str(self.__class__.Base_Class) + '_' + str(self.Name_Arg.Fallback)
        Gal_Code = 'class ' + str(Class_Name)
        if self.Root_Type is not None:
            PC = self.Root_Type
            if not PC.Fallback is not None:
                PC.Fallback_Generate()
            Underscore = '_'
            PCFB = str(PC.Fallback)
            Gal_Code += ' [is ' + str(PCFB)
            Gal_Code += str(Underscore)
            Gal_Code += str(self.__class__.Base_Class) + ']'
            # comment 'writelinePCFB  PCFB entity:  (. PC To_String) self:  (i To_String) gal:  [my Gal]';
        else:
            Gal_Code += ' [is ' + str(self.__class__.Base_Class) + ']'
        Gal_Code += str('\n') + '{' + str('\n') + str("    ") + "class.property string Gal_Keyword '" + str(self.Keyword.Fallback) + "';" + str('\n') + str("    ") + "class.property string Gs_Keyword '" + str(self.Keyword.Fallback) + "';" + str('\n')
        if self.Block:
            self.Block.Fallback_Generate()
            Gal_Code += str(self.Block.Fallback_Statements)
        if self.Generate_Attributes:
            Attribute_Statements = ''
            Statement = None
            if self.Block:
                for Statement in self.Block.Statements:
                    if Statement.Gal_Declaration is not None:
                        Attribute_Statements += str(Statement.Gal_Declaration)
                Indented = str(self.Indent(Attribute_Statements))
                # comment 'writeline***  [class.name]  [my Name_Arg Fallack] - Attribute Statements:  Attribute_Statements [line]indented: [line] Indented';
                Attribute_Method = 'method void Attributes' + str('\n') + '{' + str('\n') + str(Indented) + '}' + str('\n')
                Gal_Code += str(self.Indent(Attribute_Method))
        Gal_Code += '}' + str('\n')
        Definition = ': ' + str(Class_Name) + ' Initialize [self];'
        self.Fallback = Gal_Code
        self.Fallback_Declaration = Definition
class Statement_Statement (Definition_Statement):
    Gal_Keyword = 'statement'
    Base_Class = 'Statement'
class Statement_Operation (Definition_Statement):
    Gal_Keyword = 'operation'
    Base_Class = 'Operation'
class Statement_Syntax (Definition_Statement):
    Gal_Keyword = 'syntax'
    Base_Class = 'Syntax'
class Statement_Argument (Argument_Statement):
    Gal_Keyword = 'argument'
    Gs_Keyword = 'argument'
    def __init__(self):
        super().__init__()
        self.Argument_Name = None
        self.Type_Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required Argument_Name')
        self.Argument_Name = self.Listargs.pop(0)
        self.Argument_Name.Usage = 'variable'
        if len(self.Listargs) > 0:
            self.Type_Value = self.Listargs.pop(0)
            self.Type_Value.Usage = 'value'
    def Fallback_Generate(self):
        Definition = 'property entity ' + str(self.Argument_Name.Fallback) + ';'
        Code = "if (= (list.length [. [me] Listargs]) 0)" + str('\n') + "{" + str('\n') + str("    ") + "error 'missing required argument " + str(self.Argument_Name.Fallback) + "';" + str('\n') + "}" + str('\n')
        Code += '.= [me] ' + str(self.Argument_Name.Fallback) + ' (list.shift [. [me] Listargs]);' + str('\n')
        if self.Type_Value is not None:
            Code += '.= [. [me] ' + str(self.Argument_Name.Fallback) + '] Usage ' + str(self.Type_Value.Fallback) + ';' + str('\n')
        self.Gal_Declaration = Code
        self.Fallback = Definition
class Statement_Keyword (Argument_Statement):
    Gal_Keyword = 'keyword'
    Gs_Keyword = 'keyword'
    def __init__(self):
        super().__init__()
        self.Argument_Name = None
        self.Type_Value = None
    def Fallback_Generate(self):
        Definition = 'property entity ' + str(self.Argument_Name.Fallback) + ';'
        Code = "if (= (list.length [. [me] Keywords]) 0)" + str('\n') + "{" + str('\n') + str("    ") + "error 'missing required keyword " + str(self.Argument_Name.Fallback) + "';" + str('\n') + "}" + str('\n')
        Code += '.= [me] ' + str(self.Argument_Name.Fallback) + ' (list.shift [. [me] Keywords]);' + str('\n')
        if self.Type_Value is not None:
            Code += '.= [. [me] ' + str(self.Argument_Name.Fallback) + '] Usage ' + str(self.Type_Value.Fallback) + ';' + str('\n')
        self.Gal_Declaration = Code
        self.Fallback = Definition
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Argument_Name')
        self.Argument_Name = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Type_Value = self.Listargs.pop(0)
class Statement_Optional (Argument_Statement):
    Gal_Keyword = 'optional'
    Gs_Keyword = 'optional'
    def __init__(self):
        super().__init__()
        self.Argument_Name = None
        self.Type_Value = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception(str(self.__class__.__name__) + ' missing required Argument_Name')
        self.Argument_Name = self.Listargs.pop(0)
        self.Argument_Name.Usage = 'variable'
        if len(self.Listargs) > 0:
            self.Type_Value = self.Listargs.pop(0)
            self.Type_Value.Usage = 'value'
    def Fallback_Generate(self):
        Definition = 'property entity ' + str(self.Argument_Name.Fallback) + ';'
        Code = 'if (gt (list.length [. [me] Listargs]) 0)' + str('\n') + '{' + str('\n')
        Code += str("    ") + '.= [me] ' + str(self.Argument_Name.Fallback) + ' (list.shift [. [me] Listargs]);' + str('\n')
        if self.Type_Value is not None:
            Code += str("    ") + '.= [. [me] ' + str(self.Argument_Name.Fallback)
            Code += '] Usage ' + str(self.Type_Value.Fallback) + ';' + str('\n')
        Code += '}' + str('\n')
        self.Gal_Declaration = Code
        self.Fallback = Definition
class Statement_Fallback (Append_Args_Statement):
    Gal_Keyword = 'fallback'
    def Fallback_Generate(self):
        Gal_Code = 'method void Fallback_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Gal_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            Argument_Code = Argument.Fallback
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Fallback]'
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Fallback Gal_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Atomic (Append_Args_Statement):
    Gal_Keyword = 'atomic'
    def Fallback_Generate(self):
        Gal_Code = 'method void Atomic_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Atomic_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            Argument_Code = Argument.Fallback
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Atomic]'
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Atomic Atomic_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Gs (Append_Args_Statement):
    Gal_Keyword = 'gs'
    def Fallback_Generate(self):
        Gal_Code = 'method void Gs_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Gs_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            Argument_Code = Argument.Fallback
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Gs]'
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Gs Gs_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Javascript (Append_Args_Statement):
    Gal_Keyword = 'javascript'
    def Fallback_Generate(self):
        Gal_Code = 'method void Javascript_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Javascript_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            Argument_Code = Argument.Fallback
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Javascript]'
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Javascript Javascript_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Mumps (Append_Args_Statement):
    Gal_Keyword = 'mumps'
    def Fallback_Generate(self):
        Gal_Code = 'method void Mumps_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Mumps_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            Argument_Code = Argument.Fallback
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Mumps]'
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Mumps Mumps_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Python (Line_Statement):
    Gal_Keyword = 'python'
    def Fallback_Generate(self):
        Gal_Code = 'method void Python_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Python_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            Argument_Code = Argument.Fallback
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Python]'
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Python Python_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Php (Line_Statement):
    Gal_Keyword = 'php'
    def Fallback_Generate(self):
        Gal_Code = 'method void Python_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Php_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            Argument_Code = Argument.Fallback
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Php]'
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Php Php_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Java (Line_Statement):
    Gal_Keyword = 'java'
    def Fallback_Generate(self):
        Gal_Code = 'method void Python_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Java_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            Argument_Code = Argument.Fallback
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Java]'
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Java Java_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Raku (Line_Statement):
    Gal_Keyword = 'raku'
    def Fallback_Generate(self):
        Gal_Code = 'method void Python_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Raku_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            Argument_Code = Argument.Fallback
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Raku]'
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Raku Raku_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Gal_Language (Definition_Statement):
    Base_Class = 'Language'
    Gal_Keyword = 'gal.language'
    def __init__(self):
        super().__init__()
        self.Language_Name = None
    # comment "TODO:" 'iterate handlers and append them to the target class. tell each handler the name of its generator method e.g. Python_Generate.';
    def Attributes(self):
        self.Language_Name = self.Listargs.pop(0)
    # comment 'method void Structure';
    def Model(self):
        pass
    def Fallback_Generate(self):
        Gal_Body = str(self.Indent(self.Declarations))
        if self.Block:
            Gal_Body += str(self.Block.Fallback_Statements)
        Gal_Code = 'class ' + str(self.Language_Name.Fallback) + ' [is Language]' + str('\n') + '{' + str('\n') + str(Gal_Body) + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Classify (Method_Statement):
    Gal_Keyword = 'isa'
    Gs_Keyword = 'isa'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
        self.Method_Name = None
        self.Verb_Owner = None
        self.Method_Context = None
        self.Variable_Context = None
        self.Class_Name = None
        self.Method_Signature = None
    def Attributes(self):
        self.Class_Name = self.Listargs.pop(0)
        self.Method_Context = self
        self.Method_Signature = 'method flag '  +  self.Class_Name.Input
    def Model(self):
        if self.Verb_Owner is not None:
            self.Method_Name = self.Verb_Owner.Class_Name
    def Fallback_Generate(self):
        Header = str(self.Parent.Method_Signature)
        Append_To = str(self.Class_Name.Fallback)
        Method = str(Header) + str('\n') + '{' + str('\n') + str(self.Block.Fallback_Statements) + str("    ") + 'return [true];' + str('\n') + '}'
        Code = 'class.append ' + str(Append_To) + str('\n') + '{' + str('\n') + str(self.Indent(Method)) + '}'
        self.Fallback = Code
class Statement_Infer (Method_Statement):
    Gal_Keyword = 'infer'
    Gs_Keyword = 'infer'
    # comment "fallback 'method void Infer' [my Block Fallback];";
    def Fallback_Generate(self):
        Block_Code = ''
        try:
            Block_Code += str(self.Block.Fallback_Statements)
        except Exception:
            pass
        Code = 'method void Infer' + str('\n') + '{' + str('\n') + str(Block_Code) + str("    ") + 'return [true];' + str('\n') + '}'
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Verb (Verb_Statement):
    Gal_Keyword = 'verb'
    Gs_Keyword = 'verb'
    Aliases = " polymorph "
    def __init__(self):
        super().__init__()
        self.DT = None
        self.Class_Name = None
        self.Method_Signature = None
        self.Name_Prefix = ''
        self.Property_Name = None
    def Attributes(self):
        Header = 'method'
        Argument = None
        for Argument in self.Arguments:
            # comment 'The arguments must be consistent, because we need to know the header before generation begins.';
            Header += ' ' + str(Argument.Get_Input())
        self.Method_Signature = Header
        self.DT = self.Listargs.pop(0)
        self.Class_Name = self.Listargs.pop(0)
        Name_Text = str(self.Class_Name.Get_Input())
        self.Property_Name = Name_Text
    def Inference_Context(self):
        return self
    def Gal_Generate(self):
        Code = str(self.Block.Gal_Statements)
        self.Gal = Code
    def Fallback_Generate(self):
        Gal_Code = ''
        self.Fallback = Gal_Code
class Statement_Oho (Statement):
    Gal_Keyword = 'oho'
    Gs_Keyword = 'oho'
    def Fallback_Generate(self):
        Method_Name = 'Oho'
        Arg = None
        for Arg in self.Arguments:
            Method_Name += '_' + str(Arg.Fallback)
        Code = 'comment ". [class] ' + str(Method_Name) + ';";'
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Gal (Append_Args_Statement):
    Gal_Keyword = 'gal'
    def Fallback_Generate(self):
        Gal_Code = 'method void Gal_Generate' + str('\n') + '{' + str('\n') + str("    ") + 'string Gal_Code'
        Argument = None
        Argument_Code = None
        for Argument in self.Arguments:
            if isinstance(Argument, Token_Name):
                Argument_Code = '[my '  +  Argument_Code  +  ' Gal]'
            else:
                Argument_Code = Argument.Gal
            Gal_Code += ' ' + str(Argument_Code)
        Gal_Code += ';' + str('\n') + str("    ") + 'my= Gal Gal_Code;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
class Statement_Inference (Verb_Statement):
    Gal_Keyword = 'inference'
    Gs_Keyword = 'inference'
    Aliases = " polymorph cuckoo "
    def __init__(self):
        super().__init__()
        self.DT = None
        self.Class_Name = None
        self.Method_Signature = None
        self.Method_Name = None
        self.Property_Name = None
    def Attributes(self):
        self.DT = self.Listargs.pop(0)
        self.Class_Name = self.Listargs.pop(0)
        Name_Text = str(self.Class_Name.Get_Input())
        self.Property_Name = Name_Text
        self.Method_Name = 'Infer_'  +  Name_Text
        # comment 'we need to know the header before generation begins.';
        Header = 'method flag ' + str(self.Method_Name)
        Argument = None
        for Argument in self.Listargs:
            Header += ' ' + str(Argument.Get_Input())
        self.Method_Signature = Header
    def Inference_Context(self):
        return self
    def Fallback_Generate(self):
        Cname = str(self.Class_Name.Fallback)
        Block = str(self.Block.Fallback_Statements)
        Code = 'class Inference_' + str(Cname) + ' [is Inference]' + str('\n') + '{' + str('\n') + str("    ") + 'method flag Infer' + str('\n') + str("    ") + '{' + str('\n') + str("    "*2) + 'returnif (not (. [my Owner] Infer_' + str(Cname) + ')) [false];' + str('\n') + str("    "*2) + 'return [true];' + str('\n') + str("    ") + '}' + str('\n') + '}' + str('\n') + str(Block)
        self.Fallback = Code
# comment 'Additions.gal';
class Syntax_My (Syntax):
    Gal_Keyword = 'my'
    Gs_Keyword = 'my'
    Aliases = " self i me this "
    def __init__(self):
        super().__init__()
        self.Has_Arguments = False
    def Attributes(self):
        # comment 'look up the first argument in the parent context to know that it is a list.';
        self.Has_Arguments = len(self.Listargs) > 0
        if self.Has_Arguments:
            Argument = self.Listargs.pop(0)
            # comment "TODO:" 'this must be a token';
            if not isinstance(Argument, Token):
                raise Exception(str(self.Failure_Message("Property name must be a token")))
            Property = str(Argument.Input)
            Definition = self.Lookup(Property)
            if not Definition:
                return
            Data_Type = str(Definition.Data_Type)
            if not Data_Type:
                return
            Argument.Data_Type = Data_Type
            self.Data_Type = Data_Type
    def Fallback_Generate(self):
        Argument = None
        if self.Has_Arguments:
            Gal_Code = '[. [self]'
            for Argument in self.Arguments:
                Gal_Code += ' ' + str(Argument.Fallback)
            Gal_Code += ']'
            self.Fallback = Gal_Code
        else:
            self.Fallback = '[self]'
    def Python_Generate(self):
        # comment 'debug';
        self.Python = 'self'
    def Javascript_Generate(self):
        Javascript_Code = 'this'
        self.Javascript = Javascript_Code
class Operation_Begins (Operation):
    Gal_Keyword = 'begins'
    Gs_Keyword = 'begins'
    def __init__(self):
        super().__init__()
        self.String_Value = None
        self.Begin_Value = None
    # comment 'fallback(substring  [my String_Value Fallback] 0 (string.length  [my Begin_Value Fallback]))';
    def Python_Generate(self):
        Python_Code = str(self.String_Value.Python) + '[:len(' + str(self.Begin_Value.Python) + ')] == ' + str(self.Begin_Value.Python)
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.String_Value.Javascript) + '.substr(0,' + str(self.Begin_Value.Javascript) + '.length) == ' + str(self.Begin_Value.Javascript)
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument String_Value')
        self.String_Value = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Begin_Value')
        self.Begin_Value = self.Listargs.pop(0)
class Operation_Firstchar (Unary_Operation):
    Gal_Keyword = 'firstchar'
    Gs_Keyword = 'firstchar'
    def __init__(self):
        super().__init__()
        self.String_Value = None
    # comment 'fallback(substring  [my String_Value Fallback] 0 1)';
    def Python_Generate(self):
        Python_Code = str(self.String_Value.Python) + '[0]'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.String_Value.Javascript) + '.charAt(0)'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument String_Value')
        self.String_Value = self.Listargs.pop(0)
class Operation_Lastchar (Unary_Operation):
    Gal_Keyword = 'lastchar'
    Gs_Keyword = 'lastchar'
    def __init__(self):
        super().__init__()
        self.String_Value = None
    # comment 'fallback(substring  [my String_Value Fallback] (- (length  [my String_Value Fallback])) 1)';
    def Python_Generate(self):
        Python_Code = str(self.String_Value.Python) + '[-1]'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.String_Value.Javascript) + '.charAt(' + str(self.String_Value.Javascript) + '.length-1)'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument String_Value')
        self.String_Value = self.Listargs.pop(0)
class Operation_I (Invocation_Operation):
    Gal_Keyword = 'i'
    Gs_Keyword = 'i'
    Aliases = " self me this "
    def __init__(self):
        super().__init__()
        self.Method = None
    def Fallback_Generate(self):
        Gal_Code = '(. [self]' + str(self.Fallback_Arguments()) + ')'
        self.Fallback = Gal_Code
    def Python_Generate(self):
        Python_Code = 'self.' + str(self.Method.Python) + '(' + str(self.Python_Args(',')) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'this.' + str(self.Method.Javascript) + '(' + str(self.Javascript_Args(',')) + ')'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Method')
        self.Method = self.Listargs.pop(0)
class Operation_Key_Get (Operation):
    Gal_Keyword = 'key.get'
    Gs_Keyword = 'key.get'
    def __init__(self):
        super().__init__()
        self.Dictionary = None
        self.Key = None
    def Fallback_Generate(self):
        Gal_Code = '[key ' + str(self.Dictionary.Fallback) + ' ' + str(self.Key.Fallback) + ']'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Dictionary')
        self.Dictionary = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Key')
        self.Key = self.Listargs.pop(0)
class Statement_I (Invocation_Statement):
    Gal_Keyword = 'i'
    Gs_Keyword = 'i'
    Aliases = " self this me my "
    def Fallback_Generate(self):
        Gal_Code = '. [self]' + str(self.Fallback_Arguments()) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_We (Invocation_Statement):
    Gal_Keyword = 'we'
    Gs_Keyword = 'we'
    Aliases = " us "
    def Fallback_Generate(self):
        Gal_Code = '. [class]' + str(self.Fallback_Arguments()) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Myclass (Invocation_Statement):
    Gal_Keyword = 'myclass'
    Gs_Keyword = 'myclass'
    Aliases = " my.class "
    def Fallback_Generate(self):
        Gal_Code = '. [my.class]' + str(self.Fallback_Arguments()) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Entity_New (Declare_Statement):
    Gal_Keyword = 'entity.new'
    Gs_Keyword = 'entity.new'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Class = None
    def Fallback_Generate(self):
        Argument = None
        Gal_Code = 'entity ' + str(self.Variable.Fallback) + ' (new ' + str(self.Class.Fallback)
        for Argument in self.Listargs:
            Gal_Code += ' ' + str(Argument.Fallback)
        Gal_Code += ');'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class')
        self.Class = self.Listargs.pop(0)
class Statement_Entity_My_Class (Declare_Statement):
    Gal_Keyword = 'entity.my.class'
    Gs_Keyword = 'entity.my.class'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Fallback_Generate(self):
        Argument = None
        Gal_Code = 'entity ' + str(self.Variable.Fallback) + ' (new [my.class]'
        for Argument in self.Listargs:
            Gal_Code += ' ' + str(Argument.Fallback)
        Gal_Code += ');'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
class Statement_Contif (Line_Statement):
    Gal_Keyword = 'continue.if'
    Gs_Keyword = 'continue.if'
    Aliases = " contif "
    def __init__(self):
        super().__init__()
        self.Condition = None
    def Fallback_Generate(self):
        Gal_Code = 'if ' + str(self.Condition.Fallback) + str('\n') + '{' + str('\n') + str("    ") + 'continue;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Condition')
        self.Condition = self.Listargs.pop(0)
class Statement_Breakif (Line_Statement):
    Gal_Keyword = 'break.if'
    Gs_Keyword = 'break.if'
    Aliases = " breakif "
    def __init__(self):
        super().__init__()
        self.Condition = None
    def Fallback_Generate(self):
        Gal_Code = 'if ' + str(self.Condition.Fallback) + str('\n') + '{' + str('\n') + str("    ") + 'break;' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Condition')
        self.Condition = self.Listargs.pop(0)
class Statement_Alias (Line_Statement):
    Gal_Keyword = 'alias'
    Gs_Keyword = 'alias'
    def Fallback_Generate(self):
        Code = 'class.property string Aliases "'
        Argument = None
        for Argument in self.Arguments:
            Code += ' ' + str(Argument.Fallback)
        Code += ' ";'
        self.Fallback = Code
    def Attributes(self):
        pass
class Operation_Dictionary_Default (Operation):
    Gal_Keyword = 'dict.default'
    Gs_Keyword = 'dict.default'
    def __init__(self):
        super().__init__()
        self.Dictionary = None
        self.Key = None
        self.Default = None
    def Fallback_Generate(self):
        Gal_Code = '(. [: Runtime] Dict_Default ' + str(self.Dictionary.Fallback) + ' ' + str(self.Key.Fallback) + ' ' + str(self.Default.Fallback) + ')'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Dictionary')
        self.Dictionary = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Key')
        self.Key = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Default')
        self.Default = self.Listargs.pop(0)
class Operation_Dictionary_Defined (Operation):
    Gal_Keyword = 'dict.defined'
    Gs_Keyword = 'dict.defined'
    def __init__(self):
        super().__init__()
        self.Dictionary = None
        self.Key = None
    def Fallback_Generate(self):
        Gal_Code = '(. [: Runtime] Dict_Defined ' + str(self.Dictionary.Fallback) + ' ' + str(self.Key.Fallback) + ' ' + str(self.Default.Fallback) + ')'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Dictionary')
        self.Dictionary = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Key')
        self.Key = self.Listargs.pop(0)
class Statement_Entities (Line_Statement):
    Gal_Keyword = 'entities'
    Gs_Keyword = 'entities'
    def Fallback_Generate(self):
        Gal_Code = ''
        Between = ''
        Keyword = 'entities'
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += str(Between) + str(Keyword) + ' ' + str(Argument.Fallback) + ';'
            Between = '\n'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_My_Equal (Assign_Statement):
    Gal_Keyword = 'my='
    Gs_Keyword = 'my='
    Aliases = " self.= i.= "
    def __init__(self):
        super().__init__()
        self.Property = None
        self.Value = None
    def Fallback_Generate(self):
        Gal_Code = '.= [self] ' + str(self.Property.Fallback) + ' ' + str(self.Value.Fallback) + ';'
        self.Fallback = Gal_Code
    def Python_Generate(self):
        Python_Code = 'self.' + str(self.Property.Python) + ' = ' + str(self.Value.Python) + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'this.' + str(self.Property.Javascript) + ' = ' + str(self.Value.Javascript) + ';' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Property')
        self.Property = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Value')
        self.Value = self.Listargs.pop(0)
class Statement_Integers (Line_Statement):
    Gal_Keyword = 'integers'
    Gs_Keyword = 'integers'
    def Fallback_Generate(self):
        Gal_Code = ''
        Between = ''
        Keyword = 'integer'
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += str(Between) + str(Keyword) + ' ' + str(Argument.Fallback) + ';'
            Between = '\n'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Numbers (Line_Statement):
    Gal_Keyword = 'numbers'
    Gs_Keyword = 'numbers'
    def Fallback_Generate(self):
        Gal_Code = ''
        Between = ''
        Keyword = 'number'
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += str(Between) + str(Keyword) + ' ' + str(Argument.Fallback) + ';'
            Between = '\n'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Strings (Line_Statement):
    Gal_Keyword = 'strings'
    Gs_Keyword = 'strings'
    def Fallback_Generate(self):
        Gal_Code = ''
        Between = ''
        Keyword = 'string'
        Argument = None
        for Argument in self.Arguments:
            Gal_Code += str(Between) + str(Keyword) + ' ' + str(Argument.Fallback) + ';'
            Between = '\n'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Return_If (Line_Statement):
    Gal_Keyword = 'returnif'
    Gs_Keyword = 'returnif'
    Aliases = " return.if "
    def __init__(self):
        super().__init__()
        self.Condition = None
        self.Return_Value = None
    def Fallback_Generate(self):
        Code = 'if ' + str(self.Condition.Fallback) + str('\n') + '{' + str('\n') + str("    ") + 'return'
        if self.Return_Value is not None:
            Code += ' ' + str(self.Return_Value.Fallback)
        Code += ';' + str('\n') + '}' + str('\n')
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Condition')
        self.Condition = self.Listargs.pop(0)
        self.Condition.Usage = 'value'
        if len(self.Listargs) > 0:
            self.Return_Value = self.Listargs.pop(0)
            self.Return_Value.Usage = 'value'
class Statement_Ifdef (Scoped_Statement):
    Gal_Keyword = 'ifdef'
    Gs_Keyword = 'ifdef'
    def Python_Generate(self):
        Ifargs = ""
        Argument = None
        for Argument in self.Listargs:
            Ifargs += "ifdef = " + str(Argument.Python) + str('\n')
        Ifargs = self.Indent(Ifargs)
        Block = str(self.Python_Statements())
        Code = "try:" + str('\n') + str(Ifargs) + str(Block)
        Code += "except ValueError:" + str('\n') + str("    ") + "pass" + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Ifargs = ""
        Between = ""
        Argument = None
        for Argument in self.Listargs:
            Ifargs += str(Between) + str(Argument.Javascript) + "!= null"
            Between = " && "
        Block = str(self.Javascript_Block())
        Code = "if (" + str(Ifargs) + ")" + str(Block)
        self.Javascript = Code
    def Attributes(self):
        pass
class Statement_Undef (Scoped_Statement):
    Gal_Keyword = 'undef'
    Gs_Keyword = 'undef'
    def Python_Generate(self):
        Ifargs = ""
        Argument = None
        for Argument in self.Listargs:
            Ifargs += "undef = " + str(Argument.Python) + str('\n')
        Ifargs = self.Indent(Ifargs)
        Block = str(self.Python_Block())
        Code = "try:" + str('\n') + str(Ifargs)
        Code += "except (ValueError, AttributeError)" + str(Block)
        self.Python = Code
    def Javascript_Generate(self):
        Ifargs = ""
        Between = ""
        Argument = None
        for Argument in self.Listargs:
            Ifargs += str(Between) + str(Argument.Javascript) + " == null"
            Between = " || "
        Block = str(self.Javascript_Block())
        Code = "if (" + str(Ifargs) + ")" + str(Block)
        self.Javascript = Code
    def Attributes(self):
        pass
class Statement_New (Line_Statement):
    Gal_Keyword = 'new'
    Gs_Keyword = 'new'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Class = None
    def Python_Generate(self):
        Python_Code = str(self.Variable.Python) + ' = ' + str(self.Class.Python) + '(' + str(self.Python_Args(', ')) + ')' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Variable.Javascript) + ' = new ' + str(self.Class.Javascript) + '(' + str(self.Javascript_Args(', ')) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class')
        self.Class = self.Listargs.pop(0)
class Statement_Verbose (Line_Statement):
    Gal_Keyword = 'verbose'
    Gs_Keyword = 'verbose'
    def Fallback_Generate(self):
        Gal_Code = 'if Verbose { writeline' + str(self.Fallback_Arguments()) + '; }'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Verbosity (Line_Statement):
    Gal_Keyword = 'verbosity'
    Gs_Keyword = 'verbosity'
    def __init__(self):
        super().__init__()
        self.Setting = None
    def Fallback_Generate(self):
        Setting = '[false]'
        if self.Setting is not None:
            Setting = self.Setting.Fallback
        Code = 'flag Verbose ' + str(Setting) + ';'
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) > 0:
            self.Setting = self.Listargs.pop(0)
class Statement_Todo (Comment_Statement):
    Gal_Keyword = 'todo'
    Gs_Keyword = 'todo'
    def Fallback_Generate(self):
        Gal_Code = 'comment "TODO:" ' + str(self.Enquote(self.Argument_String())) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Flowerbox (Comment_Statement):
    Gal_Keyword = 'flowerbox'
    Gs_Keyword = 'flowerbox'
    def Fallback_Generate(self):
        Gal_Code = 'comment "**** " ' + str(self.Enquote(self.Argument_String())) + '" ****";'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Question (Comment_Statement):
    Gal_Keyword = 'question'
    Gs_Keyword = 'question'
    def Fallback_Generate(self):
        Gal_Code = 'comment "QUESTION:" ' + str(self.Enquote(self.Argument_String())) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Answer (Comment_Statement):
    Gal_Keyword = 'question'
    Gs_Keyword = 'question'
    def Fallback_Generate(self):
        Gal_Code = 'comment "ANSWER:" ' + str(self.Enquote(self.Argument_String())) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Write_Line (Append_Args_Statement):
    Gal_Keyword = 'writeline'
    Gs_Keyword = 'writeline'
    def Python_Generate(self):
        Code = 'print(' + str(self.Python_Args(', '))
        if len(self.Listargs) > 1:
            Code += ", sep=''"
        Code += ")" + str('\n')
        self.Python = Code
    def Javascript_Generate(self):
        Javascript_Code = 'console.log(' + str(self.Javascript_Args(', ')) + ');' + str('\n')
        self.Javascript = Javascript_Code
    def Mumps_Generate(self):
        Mumps_Code = ' write ' + str(self.Mumps_Args(',')) + ',!'
        self.Mumps = Mumps_Code
    def Attributes(self):
        pass
class Operation_M_Atom (Invocation_Operation):
    Gal_Keyword = 'm.atom'
    Gs_Keyword = 'm.atom'
    def __init__(self):
        super().__init__()
        self.Element = None
    def Fallback_Generate(self):
        Gal_Code = '(. ' + str(self.Element.Fallback) + ' M_Atom)'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Element')
        self.Element = self.Listargs.pop(0)
class Operation_M_Expr (Invocation_Operation):
    Gal_Keyword = 'm.expr'
    Gs_Keyword = 'm.expr'
    def __init__(self):
        super().__init__()
        self.Element = None
    def Fallback_Generate(self):
        Gal_Code = '(. ' + str(self.Element.Fallback) + ' M_Expr)'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Element')
        self.Element = self.Listargs.pop(0)
class Operation_Mumps (Invocation_Operation):
    Gal_Keyword = 'mumps'
    Gs_Keyword = 'mumps'
    def __init__(self):
        super().__init__()
        self.Element = None
    def Fallback_Generate(self):
        Gal_Code = '(. ' + str(self.Element.Fallback) + ' Mumps)'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Element')
        self.Element = self.Listargs.pop(0)
class Statement_M_Atom (Invocation_Statement):
    Gal_Keyword = 'm.atom'
    Gs_Keyword = 'm.atom'
    def __init__(self):
        super().__init__()
        self.Element = None
        self.Value = None
    def Fallback_Generate(self):
        Gal_Code = '.= ' + str(self.Element.Fallback) + ' M_Atom ' + str(self.Value.Fallback) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Element')
        self.Element = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Value')
        self.Value = self.Listargs.pop(0)
class Statement_M_Expr (Invocation_Statement):
    Gal_Keyword = 'm.expr'
    Gs_Keyword = 'm.expr'
    def __init__(self):
        super().__init__()
        self.Element = None
        self.Value = None
    def Fallback_Generate(self):
        Gal_Code = '.= ' + str(self.Element.Fallback) + ' M_Expr ' + str(self.Value.Fallback) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Element')
        self.Element = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Value')
        self.Value = self.Listargs.pop(0)
class Statement_M (Invocation_Statement):
    Gal_Keyword = 'm'
    Gs_Keyword = 'm'
    def __init__(self):
        super().__init__()
        self.Element = None
        self.Value = None
    def Fallback_Generate(self):
        Gal_Code = '.= ' + str(self.Element.Fallback) + ' Mumps ' + str(self.Value.Fallback) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Element')
        self.Element = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Value')
        self.Value = self.Listargs.pop(0)
class Statement_Unless (If_Statement):
    Gal_Keyword = 'unless'
    Gs_Keyword = 'unless'
    def __init__(self):
        super().__init__()
        self.Condition = None
    def Fallback_Generate(self):
        Gal_Code = 'if (not ' + str(self.Condition.Fallback) + ')' + str(self.Fallback_Block())
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Condition')
        self.Condition = self.Listargs.pop(0)
class Statement_Parser (Class_Statement):
    Gal_Keyword = 'parser'
    Gs_Keyword = 'parser'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        Gal_Code = 'class ' + str(self.Class_Name.Fallback) + '_Parser' + ' [is Parser]' + str(self.Fallback_Args()) + str(self.Fallback_Block())
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Statement_Sequence (Method_Statement):
    Gal_Keyword = 'sequence'
    Gs_Keyword = 'sequence'
    def __init__(self):
        super().__init__()
        self.Rule_Name = None
    def Fallback_Generate(self):
        Body = 'comment "sequence ' + str(self.Rule_Name.Fallback) + '";' + str('\n') + 'integer Start [my Position];' + str('\n') + 'list My_Elements;' + str('\n')
        Argument = None
        for Argument in self.Listargs:
            if isinstance(Argument, Quote) or isinstance(Argument, Syntax_Line):
                Text = str(Argument.Fallback)
                Body += 'if (not (i Parse_Token My_Elements ' + str(Text) + ')) { i Rollback Start (append "' + str(self.Rule_Name.Fallback) + ' expected "' + str(Text) + '"."); return [false]; }' + str('\n')
            elif isinstance(Argument, Token):
                Name = str(Argument.Fallback)
                Body += '= Last Start;' + str('\n') + 'if (not (. [self] Parse_' + str(Name) + ' My_Elements)) {' + str('\n') + str("    ") + 'i Rollback Start "Sequence ' + str(self.Rule_Name.Fallback) + ' expected ' + str(Name) + '.";' + str('\n') + str("    ") + 'return [false];' + str('\n') + '}' + str('\n')
            else:
                Body += str(Argument.Fallback)
        Body += 'integer End [my Position];' + str('\n') + 'entity Element (new ' + str(self.Rule_Name.Fallback) + ');' + str('\n') + '.= Element Start_Position Start;' + str('\n') + '.= Element End_Position End;' + str('\n') + '.= Element Document [self];' + str('\n') + '.= Element Elements My_Elements;' + str('\n') + 'i Add_Element Element;' + str('\n') + 'list.append Parent_Elements Element;' + str('\n') + 'return [true];' + str('\n')
        Body = self.Indent(Body)
        Code = 'method flag Parse_' + str(self.Rule_Name.Fallback) + ' [list Parent_Elements]' + str('\n') + '{' + str('\n') + str(Body) + '}'
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Rule_Name')
        self.Rule_Name = self.Listargs.pop(0)
class Statement_Either (Method_Statement):
    Gal_Keyword = 'either'
    Gs_Keyword = 'either'
    def __init__(self):
        super().__init__()
        self.Rule_Name = None
    def Fallback_Generate(self):
        Body = 'comment "either ' + str(self.Rule_Name.Fallback) + '";' + str('\n')
        Argument = None
        for Argument in self.Listargs:
            if isinstance(Argument, Token):
                Body += 'returnif (. [self] Parse_' + str(Argument.Fallback) + ' Parent_Elements) [true];' + str('\n')
            else:
                Body += str(Argument.Fallback)
        Body = self.Indent(Body)
        Code = 'method flag Parse_' + str(self.Rule_Name.Fallback) + ' [list Parent_Elements]' + str('\n') + '{' + str('\n') + str(Body) + str("    ") + 'return [false];' + str('\n') + '}'
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Rule_Name')
        self.Rule_Name = self.Listargs.pop(0)
class Statement_Token (Method_Statement):
    Gal_Keyword = 'token'
    Gs_Keyword = 'token'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        Name = str(self.Class_Name.Fallback)
        Code = 'method flag Parse_' + str(Name) + ' [list Parent_Elements]' + str('\n') + '{' + str('\n') + str("    ") + 'entity Top_Token (. [self] Top_Token);' + str('\n') + str("    ") + 'returnif (not (isa Top_Token ' + str(Name) + ')) [false];' + str('\n') + str("    ") + 'list.append Parent_Elements Top_Token;' + str('\n') + str("    ") + 'i Consume_Token;' + str('\n') + str("    ") + 'return [true];' + str('\n') + '}'
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Statement_Tokens (Method_Statement):
    Gal_Keyword = 'tokens'
    Gs_Keyword = 'tokens'
    def Fallback_Generate(self):
        Code = ''
        Argument = None
        Between = ''
        for Argument in self.Arguments:
            Name = str(Argument.Fallback)
            Code += str(Between) + 'method flag Parse_' + str(Name) + ' [list Parent_Elements]' + str('\n') + '{' + str('\n') + str("    ") + 'entity Top_Token (. [self] Top_Token);' + str('\n') + str("    ") + 'returnif (not (isa Top_Token ' + str(Name) + ')) [false];' + str('\n') + str("    ") + 'list.append Parent_Elements Top_Token;' + str('\n') + str("    ") + 'i Consume_Token;' + str('\n') + str("    ") + 'return [true];' + str('\n') + '}'
            Between = '\n'
        self.Fallback = Code
    def Attributes(self):
        pass
class Syntax_Repeating (Syntax):
    Gal_Keyword = 'repeating'
    Gs_Keyword = 'repeating'
    Aliases = " required.repeating "
    def __init__(self):
        super().__init__()
        self.Rule = None
    def Fallback_Generate(self):
        Gal_Code = 'comment "repeating ' + str(self.Rule.Fallback) + '";' + str('\n') + 'if (not (. [self] Parse_' + str(self.Rule.Fallback) + ' My_Elements))' + str('\n') + '{' + str('\n') + str("    ") + 'i Rollback Start "Required at least one ' + str(self.Rule.Fallback) + '." ;' + str('\n') + str("    ") + 'return [false];' + str('\n') + '}' + str('\n') + 'forever' + str('\n') + '{' + str('\n') + str("    ") + 'breakif (not (. [self] Parse_' + str(self.Rule.Fallback) + ' My_Elements));' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Rule')
        self.Rule = self.Listargs.pop(0)
class Syntax_Optional (Syntax):
    Gal_Keyword = 'optional'
    Gs_Keyword = 'optional'
    def __init__(self):
        super().__init__()
        self.Rule = None
    def Fallback_Generate(self):
        Gal_Code = 'comment "optional ' + str(self.Rule.Fallback) + '";' + str('\n') + 'i Parse_' + str(self.Rule.Fallback) + '  My_Elements;'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Rule')
        self.Rule = self.Listargs.pop(0)
class Syntax_Optrep (Syntax):
    Gal_Keyword = 'optrep'
    Gs_Keyword = 'optrep'
    Aliases = " optional.repeating "
    def __init__(self):
        super().__init__()
        self.Rule = None
    def Fallback_Generate(self):
        Gal_Code = 'comment "optional.repeating ' + str(self.Rule.Fallback) + '";' + str('\n') + 'forever' + str('\n') + '{' + str('\n') + str("    ") + 'breakif (not (. [self] Parse_' + str(self.Rule.Fallback) + ' My_Elements));' + str('\n') + '}' + str('\n')
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Rule')
        self.Rule = self.Listargs.pop(0)
class Syntax_Exclude (Syntax):
    Gal_Keyword = 'exclude'
    Gs_Keyword = 'exclude'
    Aliases = " except "
    def Fallback_Generate(self):
        Code = 'comment "[exclude ' + str(self.Fallback_Args()) + ']";' + str('\n') + 'list Excluded;' + str('\n')
        Argument = None
        for Argument in self.Arguments:
            # comment 'rule name tokens are required, right?';
            Code += 'if (. [self] Parse_' + str(Argument.Fallback) + ' Excluded)' + str('\n') + '{' + str('\n') + str("    ") + 'i Rollback Start "Excluded ' + str(Argument.Fallback) + ' encountered.";' + str('\n') + str("    ") + 'return [false];' + str('\n') + '}' + str('\n')
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Task (Statement):
    Gal_Keyword = 'task'
    Gs_Keyword = 'task'
    def __init__(self):
        super().__init__()
        self.Task_Id = None
    def Fallback_Generate(self):
        Task_Id = str(self.Task_Id.Fallback)
        Code = 'entity Task_' + str(Task_Id) + ' (new Task);' + str('\n')
        Argument = None
        Odd = True
        Property = None
        Value = None
        for Argument in self.Listargs:
            if isinstance(Argument, Token_Comma):
                Odd = True
                continue
            # comment "TODO:" 'do this with keyvalues instead?';
            if Odd:
                Property = self.Pascal_Case(Argument.Fallback)
            else:
                Value = Argument.Fallback
                Code += '.= Task_' + str(Task_Id) + ' ' + str(Property) + ' ' + str(Value) + ';' + str('\n')
            Odd = not Odd
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Task_Id')
        self.Task_Id = self.Listargs.pop(0)
class Statement_Subtask (Statement):
    Gal_Keyword = 'subtask'
    Gs_Keyword = 'subtask'
    def __init__(self):
        super().__init__()
        self.Headline = None
    def Fallback_Generate(self):
        Variable = str(self.Parent.Variable)
        Code = '. ' + str(Variable) + ' Add_Subtask ' + str(self.Headline.Fallback) + ';'
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Headline')
        self.Headline = self.Listargs.pop(0)
class Statement_Book_Gal (Statement):
    Gal_Keyword = 'book.gal'
    Gs_Keyword = 'book.gal'
    def Fallback_Generate(self):
        Code = 'my= Gal'
        Argument = None
        for Argument in self.Arguments:
            if isinstance(Argument, Token_Name):
                Code += ' [my ' + str(Argument.Fallback) + ' Fallback]'
            else:
                Code += ' ' + str(Argument.Fallback)
        if len(self.Arguments) > 1:
            Code = '(append '  +  Code  +  ')'
        Code += ';'
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Book_Fallback (Statement):
    Gal_Keyword = 'book.fallback'
    Gs_Keyword = 'book.fallback'
    def Fallback_Generate(self):
        Code = 'my= Fallback'
        Argument = None
        for Argument in self.Arguments:
            if isinstance(Argument, Token_Name):
                Code += ' [my ' + str(Argument.Fallback) + ' Fallback]'
            else:
                Code += ' ' + str(Argument.Fallback)
        if len(self.Arguments) > 1:
            Code = '(append '  +  Code  +  ')'
        Code += ';'
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Book_Raku (Statement):
    Gal_Keyword = 'book.raku'
    Gs_Keyword = 'book.raku'
    def Fallback_Generate(self):
        Code = 'my= Raku'
        Argument = None
        for Argument in self.Arguments:
            if isinstance(Argument, Token_Name):
                Code += ' [my ' + str(Argument.Fallback) + ' Fallback]'
            else:
                Code += ' ' + str(Argument.Fallback)
        if len(self.Arguments) > 1:
            Code = '(append '  +  Code  +  ')'
        Code += ';'
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Book_Python (Statement):
    Gal_Keyword = 'book.python'
    Gs_Keyword = 'book.python'
    def Fallback_Generate(self):
        Code = 'my= Python'
        Argument = None
        for Argument in self.Arguments:
            if isinstance(Argument, Token_Name):
                Code += ' [my ' + str(Argument.Fallback) + ' Fallback]'
            else:
                Code += ' ' + str(Argument.Fallback)
        if len(self.Arguments) > 1:
            Code = '(append '  +  Code  +  ')'
        Code += ';'
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Book_Javascript (Statement):
    Gal_Keyword = 'book.javascript'
    Gs_Keyword = 'book.javascript'
    def Fallback_Generate(self):
        Code = 'my= Javascript'
        Argument = None
        for Argument in self.Arguments:
            if isinstance(Argument, Token_Name):
                Code += ' [my ' + str(Argument.Fallback) + ' Fallback]'
            else:
                Code += ' ' + str(Argument.Fallback)
        if len(self.Arguments) > 1:
            Code = '(append '  +  Code  +  ')'
        Code += ';'
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Book (Statement):
    Gal_Keyword = 'book'
    Gs_Keyword = 'book'
    def Attributes(self):
        pass
class Statement_Chapter (Statement):
    Gal_Keyword = 'chapter'
    Gs_Keyword = 'chapter'
    Aliases = " chap "
    def Attributes(self):
        pass
class Statement_Section (Statement):
    Gal_Keyword = 'section'
    Gs_Keyword = 'section'
    def Attributes(self):
        pass
class Statement_Overview (Statement):
    Gal_Keyword = 'overview'
    Gs_Keyword = 'overview'
    def Attributes(self):
        pass
class Statement_Expository (Statement):
    Gal_Keyword = 'expository'
    Gs_Keyword = 'expository'
    Aliases = " exposition expo "
    def Attributes(self):
        pass
class Statement_Paragraph (Statement):
    Gal_Keyword = 'paragraph'
    Gs_Keyword = 'paragraph'
    Aliases = " p "
    def Attributes(self):
        pass
class Statement_Shell (Statement):
    Gal_Keyword = 'shell'
    Gs_Keyword = 'shell'
    Aliases = " linux "
    def Attributes(self):
        pass
class Statement_Summary (Statement):
    Gal_Keyword = 'summary'
    Gs_Keyword = 'summary'
    def Attributes(self):
        pass
class Statement_Title (Statement):
    Gal_Keyword = 'title'
    Gs_Keyword = 'title'
    def Attributes(self):
        pass
class Statement_Description (Statement):
    Gal_Keyword = 'description'
    Gs_Keyword = 'description'
    Aliases = " desc "
    def Attributes(self):
        pass
class Statement_Codefile (Statement):
    Gal_Keyword = 'codefile'
    Gs_Keyword = 'codefile'
    Aliases = " code "
    def __init__(self):
        super().__init__()
        self.Equal = None
    def Python_Generate(self):
        Python_Code = 'Code = ' + str(self.Python_Args(' + ')) + str('\n')
        self.Python = Python_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Equal')
        self.Equal = self.Listargs.pop(0)
class Syntax_Italic (Syntax):
    Gal_Keyword = 'italic'
    Gs_Keyword = 'italic'
    def Attributes(self):
        pass
class Statement_Definition (Comment_Statement):
    Gal_Keyword = 'definition'
    Gs_Keyword = 'definition'
    def Fallback_Generate(self):
        Gal_Code = 'comment "DEFINITION: "' + str(self.Fallback_Args()) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Token_Mode (Line_Statement):
    Gal_Keyword = 'tokenmode'
    Gs_Keyword = 'tokenmode'
    def __init__(self):
        super().__init__()
        self.Mode_Name = None
    def Fallback_Generate(self):
        Gal_Code = '= Mode ' + str(self.Enquote(self.Mode_Name.Fallback)) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Mode_Name')
        self.Mode_Name = self.Listargs.pop(0)
class Operation_Token_Mode (Operation):
    Gal_Keyword = 'tokenmode'
    Gs_Keyword = 'tokenmode'
    def __init__(self):
        super().__init__()
        self.Mode_Name = None
    def Fallback_Generate(self):
        Gal_Code = '(s= Mode ' + str(self.Enquote(self.Mode_Name.Fallback)) + ')'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Mode_Name')
        self.Mode_Name = self.Listargs.pop(0)
class Operation_Is_Ident (Operation):
    Gal_Keyword = 'isident'
    Gs_Keyword = 'isident'
    def __init__(self):
        super().__init__()
        self.Character = None
    def Fallback_Generate(self):
        Gal_Code = '(or (isalpha ' + str(self.Character.Fallback) + ') (contains "0123456789_" ' + str(self.Character.Fallback) + '))'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Character')
        self.Character = self.Listargs.pop(0)
class Statement_Token_Append (Line_Statement):
    Gal_Keyword = 'token.append'
    Gs_Keyword = 'token.append'
    def __init__(self):
        super().__init__()
        self.Token_Entity = None
        self.Character = None
        self.Position = None
    def Fallback_Generate(self):
        Gal_Code = 'append [. ' + str(self.Token_Entity.Fallback) + ' Input] ' + str(self.Character.Fallback) + ';' + str('\n') + '= [. ' + str(self.Token_Entity.Fallback) + ' Location End_Position] ' + str(self.Position.Fallback) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Token_Entity')
        self.Token_Entity = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Character')
        self.Character = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Position')
        self.Position = self.Listargs.pop(0)
class Statement_New_Token (Line_Statement):
    Gal_Keyword = 'newtoken'
    Gs_Keyword = 'newtoken'
    def __init__(self):
        super().__init__()
        self.Token_Entity = None
        self.Class = None
        self.Mode = None
        self.Character = None
        self.Start = None
        self.End = None
    def Fallback_Generate(self):
        Gal_Code = '= ' + str(self.Token_Entity.Fallback) + ' (new Token_' + str(self.Class.Fallback) + ' [self] ' + str(self.Character.Fallback) + ' ' + str(self.Start.Fallback) + ' ' + str(self.End.Fallback) + ');' + str('\n') + 'list.append [my Tokens Symbol_Value] ' + str(self.Token_Entity.Fallback) + ';' + str('\n') + '= Mode ' + str(self.Enquote(self.Mode.Fallback)) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Token_Entity')
        self.Token_Entity = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class')
        self.Class = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Mode')
        self.Mode = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Character')
        self.Character = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Start')
        self.Start = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument End')
        self.End = self.Listargs.pop(0)
class Statement_Skip_Token (Line_Statement):
    Gal_Keyword = 'skiptoken'
    Gs_Keyword = 'skiptoken'
    def __init__(self):
        super().__init__()
        self.Token_Entity = None
        self.Class = None
        self.Mode = None
        self.Character = None
        self.Start = None
        self.End = None
    def Fallback_Generate(self):
        Gal_Code = '= ' + str(self.Token_Entity.Fallback) + ' (new Token_' + str(self.Class.Fallback) + ' [self] ' + str(self.Character.Fallback) + ' ' + str(self.Start.Fallback) + ' ' + str(self.End.Fallback) + ');' + str('\n') + 'comment `' + str(self.Class.Fallback) + ' tokens are not appended to the token list.`' + str('\n') + '= Mode ' + str(self.Enquote(self.Mode.Fallback)) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Token_Entity')
        self.Token_Entity = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class')
        self.Class = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Mode')
        self.Mode = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Character')
        self.Character = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Start')
        self.Start = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument End')
        self.End = self.Listargs.pop(0)
class Statement_Generate (Method_Statement):
    Gal_Keyword = 'generate'
    Gs_Keyword = 'generate'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
        self.Method_Name = None
        self.Verb_Owner = None
        self.Method_Context = None
        self.Variable_Context = None
        self.Class_Name = None
        self.Method_Signature = None
        self.Property_Name = None
    def Attributes(self):
        self.Class_Name = self.Listargs.pop(0)
    def Fallback_Generate(self):
        Context = self.Inference_Context()
        Property_Name = str(Context.Property_Name)
        Header = str(self.Parent.Method_Signature)
        Append_To = str(self.Class_Name.Fallback)
        Args_Code = ''
        Argument = None
        for Argument in self.Listargs:
            if isinstance(Argument, Token_Name):
                Args_Code += ' [. [self] ' + str(Argument.Fallback) + ' ' + str(Property_Name) + ']'
            else:
                Args_Code += ' ' + str(Argument.Fallback)
        if str(Args_Code) > '          ':
            Args_Code = 'string Gen '  +  Args_Code  +  ';'  +  '\n'  +  '.= [self] '  +  Property_Name  +  ' Gen;'  +  '\n'
            Args_Code = self.Indent(Args_Code)
        Statements = ''
        if self.Block.Fallback_Statements is not None and str(self.Block.Fallback_Statements) > '':
            Statements = self.Block.Fallback_Statements
        Method_Code = str(Header) + str('\n') + '{' + str('\n') + str(Statements) + str(Args_Code) + str("    ") + 'return [true];' + str('\n') + '}' + str('\n')
        Method_Code = self.Indent(Method_Code)
        Code = 'class.append ' + str(Append_To) + str('\n') + '{' + str('\n') + str(Method_Code) + '}'
        self.Fallback = Code
class Statement_I_Equal (Assign_Statement):
    Gal_Keyword = 'i='
    Gs_Keyword = 'i='
    Aliases = " self= "
    def __init__(self):
        super().__init__()
        self.Value = None
        self.Certainty = None
    def Fallback_Generate(self):
        Context = self.Inference_Context()
        Property_Name = str(Context.Property_Name)
        # comment 'writelineProperty Name  Property_Name';
        Code = 'my= ' + str(Property_Name) + ' ' + str(self.Value.Fallback) + ';'
        # comment 'append Code [line]writeline "properrty  Property_Name: <" [my  Property_Name] ">";';
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Value')
        self.Value = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Certainty = self.Listargs.pop(0)
class Statement_Arguments (Scoped_Statement):
    Gal_Keyword = 'arguments'
    Gs_Keyword = 'arguments'
    def Fallback_Generate(self):
        Gal_Code = 'method void Process_Arguments' + str(self.Fallback_Block())
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Symbol (Class_Statement):
    Gal_Keyword = 'symbol'
    Gs_Keyword = 'symbol'
    def __init__(self):
        super().__init__()
        self.Value_Type = None
        self.Class_Name = None
        self.Property_Name = None
    def Process_Arguments(self):
        self.Property_Name = self.Class_Name.Input
    def Fallback_Generate(self):
        Class_Name = str(self.Class_Name.Fallback)
        Statements = ''
        if self.Block.Fallback_Statements is not None and str(self.Block.Fallback_Statements) > '':
            Statements = self.Block.Fallback_Statements
        Ancestor_Name = 'Symbol'
        Type = str(self.Value_Type.Fallback)
        Body = '''{''' + str('\n') + str("    ") + '''property entity Symbol_Object;''' + str('\n') + str("    ") + '''property ''' + str(Type) + ''' Symbol_Value;''' + str('\n') + str("    ") + '''constructor [entity Object]''' + str('\n') + str("    ") + '''{''' + str('\n') + str("    "*2) + '''my= Symbol_Object Object;''' + str('\n') + str("    ") + '''}''' + str('\n') + str(Statements) + '''}'''
        Code = 'class ' + str(Class_Name) + ' [is ' + str(Ancestor_Name) + ']' + str(Body)
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Value_Type')
        self.Value_Type = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Statement_Contest (Class_Statement):
    Gal_Keyword = 'contest'
    Gs_Keyword = 'contest'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        Class_Name = 'Contest_' + str(self.Class_Name.Fallback)
        Statements = ''
        if self.Block.Fallback_Statements is not None and str(self.Block.Fallback_Statements) > '':
            Statements = self.Block.Fallback_Statements
        Ancestor_Name = 'Contest'
        Body = '''{''' + str('\n') + str("    ") + '''attribute number Score;''' + str('\n') + str("    ") + '''attribute entity Winner;''' + str('\n') + str(Statements) + '''}'''
        Code = 'class ' + str(Class_Name) + ' [is ' + str(Ancestor_Name) + ']' + str(Body)
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Statement_Currency (Class_Statement):
    Gal_Keyword = 'currency'
    Gs_Keyword = 'currency'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        Class_Name = 'Currency_' + str(self.Class_Name.Fallback)
        Statements = ''
        if self.Block.Fallback_Statements is not None and str(self.Block.Fallback_Statements) > '':
            Statements = self.Block.Fallback_Statements
        Ancestor_Name = 'Currency'
        Body = '''{''' + str('\n') + str("    ") + '''class.attribute list Instances;''' + str('\n') + str("    ") + '''attribute number Amount;''' + str('\n') + str("    ") + '''attribute entity Owner;''' + str('\n') + str("    ") + '''constructor''' + str('\n') + str("    ") + '''{''' + str('\n') + str("    "*2) + '''list.append [. [my.class] Instances] [self];''' + str('\n') + str("    "*2) + '''''' + str('\n') + str("    ") + '''}''' + str('\n') + str(Statements) + '''}'''
        Code = 'class ' + str(Class_Name) + ' [is ' + str(Ancestor_Name) + ']' + str(Body)
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Statement_Principle (Scoped_Statement):
    Gal_Keyword = 'principle'
    Gs_Keyword = 'principle'
    def __init__(self):
        super().__init__()
        self.Name = None
    def Gal_Generate(self):
        Body_Code = ''
        Class_Code = ''
        Statement = None
        for Statement in self.Block.Statements:
            if isinstance(Statement, Class_Statement):
                Class_Code += str(Statement.Gal) + str('\n')
            else:
                Body_Code += str(Statement.Gal) + str('\n')
        # comment 'separation due to apparent bug in bootstrap compiler.';
        Code = str('\n') + 'class Principle_' + str(self.Name.Gal) + str('\n') + '{' + str('\n')
        Code += str(Body_Code) + '}' + str('\n'*2)
        Code += str(Class_Code) + str('\n')
        Code += 'comment "Principle ' + str(self.Name.Gal) + ' ends.";' + str('\n'*2)
        self.Gal_Statements = Code
        self.Gal = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
class Statement_English (Line_Statement):
    Gal_Keyword = 'english'
    Gs_Keyword = 'english'
    def Fallback_Generate(self):
        Args = str(self.Fallback_Arguments())
        if len(self.Arguments) > 1:
            Args = '(append '  +  Args  +  ')'
        Code = 'class.property string English ' + str(Args) + ';'
        self.Fallback = ''
        self.Fallback_Declaration = Code
    def Attributes(self):
        pass
class Statement_Require_That (Line_Statement):
    Gal_Keyword = 'require.that'
    Gs_Keyword = 'require.that'
    def __init__(self):
        super().__init__()
        self.Condition = None
    def Fallback_Generate(self):
        Gal_Code = 'returnif (not ' + str(self.Condition.Fallback) + ') [false];'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Condition')
        self.Condition = self.Listargs.pop(0)
class Statement_Require_That_I (Line_Statement):
    Gal_Keyword = 'require.that.i'
    Gs_Keyword = 'require.that.i'
    def Fallback_Generate(self):
        Gal_Code = 'returnif (not (i ' + str(self.Fallback_Arguments()) + ')) [false];'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Dialect (Scoped_Statement):
    Gal_Keyword = 'dialect'
    Gs_Keyword = 'dialect'
    def __init__(self):
        super().__init__()
        self.Name = None
        self.English = None
    def Fallback_Generate(self):
        Name = str(self.Name.Fallback)
        Body = ''
        Fback = ''
        if self.English is not None:
            Body += 'property string English ' + str(self.English.Fallback) + ';' + str('\n')
        Statement = None
        for Statement in self.Block.Statements:
            if Statement.Fallback_Declaration is not None:
                Body += str(Statement.Fallback_Declaration) + str('\n')
            if Statement.Fallback is not None:
                Fback += str(Statement.Fallback) + str('\n')
        Method = 'method flag Initialize' + str('\n') + '{' + str('\n') + str(self.Indent(Fback)) + str('\n') + str("    ") + 'return [true];' + str('\n') + '}'
        Body = self.Indent(Body)
        Method = self.Indent(Method)
        Code = 'class Dialect_' + str(Name) + ' [is Dialect]' + str('\n') + '{' + str('\n') + str(self.Indent(Method)) + str(self.Indent(Body)) + '}' + str('\n')
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
        self.Name.Usage = 'string'
        if len(self.Listargs) > 0:
            self.English = self.Listargs.pop(0)
            self.English.Usage = 'string'
class Statement_Statements (Line_Statement):
    Gal_Keyword = 'statements'
    Gs_Keyword = 'statements'
    def Fallback_Generate(self):
        Arg = None
        Statement = 'ERROR_UNKNOWN_STATEMENT'
        Keyword = 'ERROR_UNKNOWN_KEYWORD'
        Code = ''
        for Arg in self.Arguments:
            if isinstance(Arg, Token_Comma):
                continue
            if isinstance(Arg, Quote):
                Keyword = Arg.Fallback
                Code += 'dict.= [my Statements] ' + str(Keyword) + ' (new ' + str(Statement) + ');' + str('\n')
            elif isinstance(Arg, Token_Name):
                Statement = Arg.Fallback
            else:
                raise Exception('unexpected statements argument')
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Operations (Line_Statement):
    Gal_Keyword = 'operations'
    Gs_Keyword = 'operations'
    def Fallback_Generate(self):
        Arg = None
        Operation = 'ERROR_UNKNOWN_OPERATION'
        Keyword = 'ERROR_UNKNOWN_KEYWORD'
        Code = ''
        for Arg in self.Arguments:
            if isinstance(Arg, Token_Comma):
                continue
            if isinstance(Arg, Quote):
                Keyword = Arg.Fallback
                Code += 'dict.= [my Operations] ' + str(Keyword) + ' (new ' + str(Operation) + ');' + str('\n')
            elif isinstance(Arg, Token_Name):
                Operation = Arg.Fallback
            else:
                raise Exception('unexpected operations argument')
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Syntaxes (Line_Statement):
    Gal_Keyword = 'syntaxes'
    Gs_Keyword = 'syntaxes'
    def Fallback_Generate(self):
        Arg = None
        Syntax = 'ERROR_UNKNOWN_SYNTAX'
        Keyword = 'ERROR_UNKNOWN_KEYWORD'
        Code = ''
        for Arg in self.Arguments:
            if isinstance(Arg, Token_Comma):
                continue
            if isinstance(Arg, Quote):
                Keyword = Arg.Fallback
                Code += 'dict.= [my Syntaxes] ' + str(Keyword) + ' (new ' + str(Syntax) + ');' + str('\n')
            elif isinstance(Arg, Token_Name):
                Syntax = Arg.Fallback
            else:
                raise Exception('unexpected syntaxes argument')
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Requirement (Scoped_Statement):
    Gal_Keyword = 'requirement'
    Gs_Keyword = 'requirement'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        Name = str(self.Class_Name.Fallback)
        Full_Name = 'Requirement_' + str(Name)
        Fallback_Lines = ''
        Fallback_Declarations = ''
        Statement = None
        for Statement in self.Block.Statements:
            Fallback_Lines += str(Statement.Fallback) + str('\n')
            if Statement.Fallback_Declaration is not None:
                # comment 'append Fallback_Declarations [. Statement Fallback_Declaration] [line]';
                pass
        Fallback_Block = str('\n') + '{' + str('\n') + str(self.Indent(Fallback_Declarations)) + '}'
        Code = 'class ' + str(Full_Name) + ' [is Requirement]' + str(Fallback_Block)
        Code += str(Fallback_Lines)
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Statement_Spell (Scoped_Statement):
    Gal_Keyword = 'spell'
    Gs_Keyword = 'spell'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        Name = str(self.Class_Name.Fallback)
        Full_Name = 'Spell_' + str(Name)
        Fallback_Lines = ''
        Fallback_Declarations = ''
        Statement = None
        for Statement in self.Block.Statements:
            Fallback_Lines += str(Statement.Fallback) + str('\n')
            if Statement.Fallback_Declaration is not None:
                # comment 'append Fallback_Declarations [. Statement Fallback_Declaration] [line]';
                pass
        Fallback_Block = str('\n') + '{' + str('\n') + str(self.Indent(Fallback_Declarations)) + '}'
        Code = 'class ' + str(Full_Name) + ' [is Spell]' + str(Fallback_Block)
        Code += str(Fallback_Lines)
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Statement_Goal (Scoped_Statement):
    Gal_Keyword = 'goal'
    Gs_Keyword = 'goal'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        Name = str(self.Class_Name.Fallback)
        Full_Name = 'Goal_' + str(Name)
        Fallback_Lines = ''
        Fallback_Declarations = ''
        Statement = None
        for Statement in self.Block.Statements:
            Fallback_Lines += str(Statement.Fallback) + str('\n')
            if Statement.Fallback_Declaration is not None:
                # comment 'append Fallback_Declarations [. Statement Fallback_Declaration] [line]';
                pass
        Fallback_Block = str('\n') + '{' + str('\n') + str(self.Indent(Fallback_Declarations)) + '}'
        Code = 'class ' + str(Full_Name) + ' [is Goal]' + str(Fallback_Block)
        Code += str(Fallback_Lines)
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Syntax_Class_Lookup (Syntax):
    Gal_Keyword = 'lookup'
    Gs_Keyword = 'lookup'
    def __init__(self):
        super().__init__()
        self.Name = None
    def Fallback_Generate(self):
        Gal_Code = '(. [: Compiler Instance] Get_Class ' + str(self.Name.Fallback) + ')'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
class Statement_File_Copy (Line_Statement):
    Gal_Keyword = 'file.copy'
    Gs_Keyword = 'file.copy'
    def __init__(self):
        super().__init__()
        self.Source_File = None
        self.Target_File = None
    def Fallback_Generate(self):
        Gal_Code = '''shell 'cp "''' + str(self.Source_File.Unquoted()) + '''" "''' + str(self.Target_File.Unquoted()) + '''"';'''
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Source_File')
        self.Source_File = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Target_File')
        self.Target_File = self.Listargs.pop(0)
class Statement_File_Append_File (Line_Statement):
    Gal_Keyword = 'file.append.file'
    Gs_Keyword = 'file.append.file'
    def __init__(self):
        super().__init__()
        self.Source_File = None
        self.Target_File = None
    def Fallback_Generate(self):
        Gal_Code = '''shell 'cat "''' + str(self.Source_File.Unquoted()) + '''">>"''' + str(self.Target_File.Unquoted()) + '''"';'''
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Source_File')
        self.Source_File = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Target_File')
        self.Target_File = self.Listargs.pop(0)
class Operation_File_Exists (Operation):
    Gal_Keyword = 'file.exists'
    Gs_Keyword = 'file.exists'
    def __init__(self):
        super().__init__()
        self.File_Name = None
    def Python_Generate(self):
        Python_Code = 'gal.file_exists(' + str(self.File_Name.Python) + ')'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'gal.file_exists(' + str(self.File_Name.Javascript) + ');'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument File_Name')
        self.File_Name = self.Listargs.pop(0)
class Statement_Infers (Line_Statement):
    Gal_Keyword = 'infers'
    Gs_Keyword = 'infers'
    def __init__(self):
        super().__init__()
        self.Inference = None
    def Model(self):
        Inference_Name = str(self.Inference.Input)
        Class_Name = 'Unknown'
        if self.Class_Context is not None:
            Class_Name = self.Class_Context.Class_Name.Input
        elif self.Parent is not None and self.Parent.Class_Name is not None:
            Class_Name = self.Parent.Class_Name.Input
        Owner_Class = Compiler.Instance.Get_Class(Class_Name)
        if Owner_Class and Owner_Class.Infer_Inits is not None:
            Owner_Class.Infer_Inits += 'list.append [my Inferences Symbol_Value] (new Inference_' + str(Inference_Name) + ' [self]);' + str('\n')
    def Fallback_Generate(self):
        self.Fallback = ''
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Inference')
        self.Inference = self.Listargs.pop(0)
class Statement_Infer_Inits (Line_Statement):
    Gal_Keyword = 'infer.inits'
    Gs_Keyword = 'infer.inits'
    def Fallback_Generate(self):
        Class_Name = str(self.Class_Context.Class_Name.Fallback)
        Owner_Class = Compiler.Instance.Get_Class(Class_Name)
        self.Fallback = Owner_Class.Infer_Inits
    def Attributes(self):
        pass
class Syntax_Symbol (Syntax):
    Gal_Keyword = 'attribute'
    Gs_Keyword = 'attribute'
    def Fallback_Generate(self):
        Arg = None
        Code = '[. '
        for Arg in self.Arguments:
            Code += ' ' + str(Arg.Fallback)
        Code += ' Symbol_Value]'
        self.Fallback = Code
    def Attributes(self):
        pass
class Syntax_Class_Symbol (Syntax):
    Gal_Keyword = 'class.attribute'
    Gs_Keyword = 'class.attribute'
    def Fallback_Generate(self):
        Arg = None
        Code = '[: '
        for Arg in self.Arguments:
            Code += ' ' + str(Arg.Fallback)
        Code += ' Symbol_Value]'
        self.Fallback = Code
    def Attributes(self):
        pass
class Syntax_My_Symbol (Syntax):
    Gal_Keyword = 'my.attribute'
    Gs_Keyword = 'my.attribute'
    def Fallback_Generate(self):
        Arg = None
        Code = '[my '
        for Arg in self.Arguments:
            Code += ' ' + str(Arg.Fallback)
        Code += ' Symbol_Value]'
        self.Fallback = Code
    def Attributes(self):
        pass
class Statement_Goalspell (Scoped_Statement):
    Gal_Keyword = 'goal.spell'
    Gs_Keyword = 'goal.spell'
    def __init__(self):
        super().__init__()
        self.Name = None
        self.Description = None
    def Fallback_Generate(self):
        Gal_Code = 'goal ' + str(self.Name.Fallback) + ' ' + str(self.Description.Fallback) + ';' + str('\n') + 'spell ' + str(self.Name.Fallback) + str(self.Fallback_Block())
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Description')
        self.Description = self.Listargs.pop(0)
class Statement_Read_Character (Line_Statement):
    Gal_Keyword = 'read.char'
    Goalspell_Keyword = 'read.char'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Python_Generate(self):
        Python_Code = str(self.Variable.Python) + ' = gal.read_char()' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = str(self.Variable.Javascript) + ' = gal.read_char();' + str('\n')
        self.Javascript = Javascript_Code
    # comment "c '// TODO: read character ' Variable [line];";
    def Mumps_Generate(self):
        Mumps_Code = 'read *' + str(self.Variable.Mumps) + str('\n')
        self.Mumps = Mumps_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required Variable')
        self.Variable = self.Listargs.pop(0)
class Statement_Read_Character_Timed (Line_Statement):
    Gal_Keyword = 'read.char.timed'
    Goalspell_Keyword = 'read.char.timed'
    def __init__(self):
        super().__init__()
        self.Variable = None
        self.Timeout = None
    def Python_Generate(self):
        Python_Code = str(self.Variable.Python) + ' = gal.read_char_timed(' + str(self.Timeout.Python) + ')' + str('\n')
        self.Python = Python_Code
    # comment "c '// TODO: read character ' Variable ' timeout ' Timeout [line];";
    def Mumps_Generate(self):
        Mumps_Code = str("    ") + 'read *' + str(self.Variable.Mumps) + ':' + str(self.Timeout.Mumps) + str('\n') + str("    ") + 'set ' + str(self.Variable.Mumps) + '=$char(' + str(self.Variable.Mumps) + ')' + str('\n')
        self.Mumps = Mumps_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required Variable')
        self.Variable = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required Timeout')
        self.Timeout = self.Listargs.pop(0)
class Statement_Feature (Symbol_Statement):
    Gal_Keyword = 'feature'
    Gs_Keyword = 'feature'
    def __init__(self):
        super().__init__()
        self.Type = None
        self.Name = None
        self.Keyword = None
        self.Symbol_Class = None
    def Fallback_Generate(self):
        Type = str(self.Type.Fallback)
        Name = str(self.Name.Fallback)
        Keyword = str(self.Keyword.Fallback)
        Symbol_Class = str(self.Symbol_Class.Fallback)
        Code = 'attribute ' + str(Type) + ' ' + str(Name) + ' ' + str(Symbol_Class) + ';'
        Declaration = 'symbol ' + str(Type) + ' ' + str(Name) + ' ' + str(Symbol_Class) + str(self.Fallback_Block()) + str('\n') + 'statement ' + str(Name) + ' ' + str(Keyword) + ' Feature_Assignment' + str('\n') + '{' + str('\n') + str("    ") + 'property string Property_Name ' + str(self.Enquote(Name)) + ';' + str('\n') + str("    ") + '''fallback 'entity.new ' ''' + str(Name) + ''' ' ' ''' + str(Symbol_Class) + ''' (i Fallback_Args) ';' [line]''' + str('\n') + str("    "*2) + '''[my Block Fallback_Statements];''' + str('\n') + '}' + str('\n')
        self.Fallback = Declaration
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Type')
        self.Type = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Keyword')
        self.Keyword = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Symbol_Class')
        self.Symbol_Class = self.Listargs.pop(0)
class Statement_Thing (Symbol_Statement):
    Gal_Keyword = 'thing'
    Gs_Keyword = 'thing'
    def __init__(self):
        super().__init__()
        self.Name = None
        self.Keyword = None
    def Fallback_Generate(self):
        Name = str(self.Name.Fallback)
        Keyword = str(self.Keyword.Fallback)
        Declaration = ''
        Statement = None
        for Statement in self.Block.Statements:
            if Statement.Fallback_Declaration is not None:
                Declaration += str(Statement.Fallback_Declaration) + str('\n')
        Code = 'class Thing_' + str(Name) + str('\n') + '{' + str('\n') + str(Declaration) + str(self.Block.Fallback_Statements) + '}' + 'statement ' + str(Name) + ' ' + str(Keyword) + ' Object_Definition' + str('\n') + '{' + str('\n') + str("    ") + '''fallback 'entity.new ' ''' + str(Name) + ''' ' ' Thing_''' + str(Name) + ''' (i Fallback_Args) ';' [line]''' + str('\n') + str("    "*2) + '''[my Block Fallback_Statements];''' + str('\n') + '}' + str('\n')
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Keyword')
        self.Keyword = self.Listargs.pop(0)
class Statement_Camera (Entity_Definition_Statement):
    Gal_Keyword = 'camera'
    Gs_Keyword = 'camera'
    def __init__(self):
        super().__init__()
        self.Class_Name = 'Camera'
        self.Name = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
class Statement_Scene (Entity_Definition_Statement):
    Gal_Keyword = 'scene'
    Gs_Keyword = 'scene'
    def __init__(self):
        super().__init__()
        self.Class_Name = 'Scene'
        self.Name = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
class Statement_Box (Entity_Definition_Statement):
    Gal_Keyword = 'box'
    Gs_Keyword = 'box'
    def __init__(self):
        super().__init__()
        self.Class_Name = 'Box'
        self.Name = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
class Statement_Position (Entity_Definition_Statement):
    Gal_Keyword = 'position'
    Gs_Keyword = 'position'
    def __init__(self):
        super().__init__()
        self.Class_Name = 'Position'
        self.Name = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
class Statement_Animation (Entity_Definition_Statement):
    Gal_Keyword = 'animation'
    Gs_Keyword = 'animation'
    def __init__(self):
        super().__init__()
        self.Class_Name = 'Animation'
        self.Name = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
class Statement_Center (List_Feature_Statement):
    Gal_Keyword = 'center'
    Gs_Keyword = 'center'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Center'
        self.Class_Name = 'List'
    def Attributes(self):
        pass
class Statement_Color (List_Feature_Statement):
    Gal_Keyword = 'color'
    Gs_Keyword = 'color'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Color'
        self.Class_Name = 'List'
    def Attributes(self):
        pass
class Statement_Rotation (List_Feature_Statement):
    Gal_Keyword = 'rotation'
    Gs_Keyword = 'rotation'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Rotation'
        self.Class_Name = 'List'
    def Attributes(self):
        pass
class Statement_Size (List_Feature_Statement):
    Gal_Keyword = 'size'
    Gs_Keyword = 'size'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Size'
        self.Class_Name = 'List'
    def Attributes(self):
        pass
class Statement_Texture (Feature_Assignment_Statement):
    Gal_Keyword = 'texture'
    Gs_Keyword = 'texture'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Texture'
        self.Class_Name = 'String'
    def Attributes(self):
        pass
class Statement_X (Feature_Assignment_Statement):
    Gal_Keyword = 'x'
    Gs_Keyword = 'x'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'X'
        self.Class_Name = 'Number'
    def Attributes(self):
        pass
class Statement_Y (Feature_Assignment_Statement):
    Gal_Keyword = 'y'
    Gs_Keyword = 'y'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Y'
        self.Class_Name = 'Number'
    def Attributes(self):
        pass
class Statement_Z (Feature_Assignment_Statement):
    Gal_Keyword = 'z'
    Gs_Keyword = 'z'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Z'
        self.Class_Name = 'Number'
    def Attributes(self):
        pass
class Syntax_Red (Syntax):
    Gal_Keyword = 'red'
    Gs_Keyword = 'red'
    def Javascript_Generate(self):
        zdebug.zbreak()
        print('Generate Javascript for red')
    def Attributes(self):
        pass
class Statement_Resource (Feature_Assignment_Statement):
    Gal_Keyword = 'resource'
    Gs_Keyword = 'resource'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Resource'
        self.Class_Name = 'String'
    def Attributes(self):
        pass
class Statement_Workaround (Feature_Assignment_Statement):
    Gal_Keyword = 'workaround'
    Gs_Keyword = 'workaround'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Workaround'
        self.Class_Name = 'String'
    def Attributes(self):
        pass
class Statement_Status (Feature_Assignment_Statement):
    Gal_Keyword = 'status'
    Gs_Keyword = 'status'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Status'
        self.Class_Name = 'String'
    def Attributes(self):
        pass
class Statement_Start (Feature_Assignment_Statement):
    Gal_Keyword = 'start'
    Gs_Keyword = 'start'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Start'
        self.Class_Name = 'Date'
    def Attributes(self):
        pass
class Statement_End (Feature_Assignment_Statement):
    Gal_Keyword = 'end'
    Gs_Keyword = 'end'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'End'
        self.Class_Name = 'Date'
    def Attributes(self):
        pass
class Statement_Foo (Entity_Definition_Statement):
    Gal_Keyword = 'foo'
    Gs_Keyword = 'foo'
    def __init__(self):
        super().__init__()
        self.Class_Name = 'Foo'
        self.Name = None
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Name')
        self.Name = self.Listargs.pop(0)
class Statement_Bar (Feature_Assignment_Statement):
    Gal_Keyword = 'bar'
    Gs_Keyword = 'bar'
    def __init__(self):
        super().__init__()
        self.Property_Name = 'Bar'
        self.Class_Name = 'String'
    def Attributes(self):
        pass
class Statement_Uuid (Line_Statement):
    Gal_Keyword = 'uuid'
    Gs_Keyword = 'uuid'
    def __init__(self):
        super().__init__()
        self.Variable = None
    def Python_Generate(self):
        Python_Code = str(self.Variable.Python) + ' = uuid.uuid4().hex' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'var ' + str(self.Variable.Javascript) + ' = self.crypto.randomUUID();' + str('\n')
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Variable')
        self.Variable = self.Listargs.pop(0)
class Statement_Author (Line_Statement):
    Gal_Keyword = 'author'
    Gs_Keyword = 'author'
    def Fallback_Generate(self):
        Gal_Code = 'comment Author:' + str(self.Fallback_Arguments()) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Syntax_Generator (Syntax):
    Gal_Keyword = 'generator'
    Gs_Keyword = 'generator'
    def Python_Generate(self):
        Python_Code = 'Python_Generator'
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'Javascript_Generator'
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Execute (Statement):
    Gal_Keyword = 'execute'
    Gs_Keyword = 'execute'
    def __init__(self):
        super().__init__()
        self.Target = None
    def Python_Generate(self):
        Python_Code = 'exec(' + str(self.Target.Python) + ', globals())' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = 'eval(' + str(self.Target.Javascript) + ');'
        self.Javascript = Javascript_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Target')
        self.Target = self.Listargs.pop(0)
class Statement_Prompt_Context (Statement):
    Gal_Keyword = 'prompt.context'
    Gs_Keyword = 'prompt.context'
    def Python_Generate(self):
        Python_Code = 'global INPUT' + str('\n') + 'global OUTPUT' + str('\n')
        self.Python = Python_Code
    def Javascript_Generate(self):
        Javascript_Code = ''
        self.Javascript = Javascript_Code
    def Attributes(self):
        pass
class Statement_Element (Statement):
    Gal_Keyword = 'element'
    Gs_Keyword = 'element'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        if not self.Class_Name is not None:
            zdebug.zbreak()
        Code = 'push [my Elements] (new ' + str(self.Class_Name.Fallback) + ');'
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Class_Name')
        self.Class_Name = self.Listargs.pop(0)
# comment 'Goal.gal';
class Statement_Tilda (Invocation_Statement):
    Gal_Keyword = '~'
    Gs_Keyword = '~'
    def __init__(self):
        super().__init__()
        self.Definition = None
    def Fallback_Generate(self):
        Gal_Code = '. [. ' + str(self.Definition.Fallback) + ' Implementor]' + str(self.Fallback_Args()) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Definition')
        self.Definition = self.Listargs.pop(0)
        self.Definition.Usage = 'entity'
class Operation_Tilda (Invocation_Operation):
    Gal_Keyword = '~'
    Gs_Keyword = '~'
    def __init__(self):
        super().__init__()
        self.Definition = None
    def Fallback_Generate(self):
        Gal_Code = '(. [. ' + str(self.Definition.Fallback) + ' Implementor]' + str(self.Fallback_Args()) + ')'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Definition')
        self.Definition = self.Listargs.pop(0)
        self.Definition.Usage = 'entity'
class Syntax_Tilda (Syntax):
    Gal_Keyword = '~'
    Gs_Keyword = '~'
    def __init__(self):
        super().__init__()
        self.Definition = None
    def Fallback_Generate(self):
        Gal_Code = '[. ' + str(self.Definition.Fallback) + ' Implemetor' + str(self.Fallback_Args()) + ']'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Definition')
        self.Definition = self.Listargs.pop(0)
        self.Definition.Usage = 'entity'
class Statement_TildaI (Invocation_Statement):
    Gal_Keyword = '~i'
    Gs_Keyword = '~i'
    def __init__(self):
        super().__init__()
        self.Method = None
    def Fallback_Generate(self):
        Gal_Code = '. [. [self] Implementor] ' + str(self.Method.Fallback) + str(self.Fallback_Args()) + ';'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Method')
        self.Method = self.Listargs.pop(0)
        self.Method.Usage = 'method'
class Operation_TildaI (Invocation_Operation):
    Gal_Keyword = '~i'
    Gs_Keyword = '~i'
    def __init__(self):
        super().__init__()
        self.Method = None
    def Fallback_Generate(self):
        Gal_Code = '(. [. [self] Implementor] ' + str(self.Method.Fallback) + str(self.Fallback_Args()) + ')'
        self.Fallback = Gal_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Method')
        self.Method = self.Listargs.pop(0)
        self.Method.Usage = 'method'
class Syntax_TildaI (Syntax):
    Gal_Keyword = '~i'
    Gs_Keyword = '~i'
    def Fallback_Generate(self):
        Gal_Code = '[. [. [self] Implementor] ' + str(self.Fallback_Args()) + ']'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Interface (Interface_Statement):
    Gal_Keyword = 'interface'
    Gs_Keyword = 'interface'
    def __init__(self):
        super().__init__()
        self.Interface_Name = None
    def Fallback_Generate(self):
        Owner_Class = str(self.Class_Context.Class_Name)
        Owner_Class = Owner_Class.replace(':', '')
        Class_Name = str(self.Interface_Name.Fallback)
        Class_Name = Class_Name.replace(':', '')
        Interface_Name = "'" + str(Class_Name) + "'"
        # comment '= Class_Name (append ":Interface_" Owner_Class "_" Class_Name)';
        Kludge = ":Interface_" + str(Owner_Class)
        Kludge += "_" + str(Class_Name)
        Class_Name = Kludge
        # comment 'Generate the interface class as specified.';
        Class_Args = str(self.Fallback_Args())
        Class_Body = str(self.Fallback_Block())
        Class_Code = 'class ' + str(Class_Name) + str(Class_Args) + ' [is Interface]' + str(Class_Body)
        # comment 'Generate goal interface class property assignment.';
        Interface_Assignment = 'class.property ' + str(Interface_Name) + ' [: ' + str(Class_Name) + '];' + str('\n')
        self.Fallback_Declaration = Interface_Assignment
        self.Fallback = Class_Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Interface_Name')
        self.Interface_Name = self.Listargs.pop(0)
class Statement_Implementor (Line_Statement):
    Gal_Keyword = 'implementor'
    Gs_Keyword = 'implementor'
    def __init__(self):
        super().__init__()
        self.Interface = None
        self.Implementor = None
    def Fallback_Generate(self):
        Interface_Fallback = "'" + str(self.Interface.Fallback) + "'"
        Implementor_Fallback = str(self.Implementor.Fallback)
        Interface_Assignment = 'dict.assign [classprop Interfaces] ' + str(Interface_Fallback) + ' ' + str(Implementor_Fallback) + ';'
        self.Fallback = Interface_Assignment
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Interface')
        self.Interface = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Implementor')
        self.Implementor = self.Listargs.pop(0)
class Statement_Attribute (Property_Statement):
    Gal_Keyword = 'attribute'
    Gs_Keyword = 'attribute'
    def __init__(self):
        super().__init__()
        self.Data_Type = None
        self.Property_Name = None
        self.Class_Name = None
    def Inference_Context(self):
        return self
    def Fallback_Generate(self):
        Property_Fallback = str(self.Property_Name.Fallback)
        Type_Fallback = str(self.Data_Type.Fallback)
        Ancestor_Fallback = 'Attribute'
        Class_Fallback = None
        if self.Class_Name is not None:
            Class_Fallback = self.Class_Name.Fallback
        else:
            Type_Name = str(Type_Fallback[0].upper()) + str(Type_Fallback[1:])
            if str(Type_Name) == 'Entity':
                Type_Name = 'Object'
            Class_Fallback = Type_Name
        Code = 'property entity ' + str(Property_Fallback) + ' (new ' + str(Class_Fallback) + ' [self]);' + str('\n')
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Data_Type')
        self.Data_Type = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Property_Name')
        self.Property_Name = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Class_Name = self.Listargs.pop(0)
class Statement_Class_Attribute (Property_Statement):
    Gal_Keyword = 'class.attribute'
    Gs_Keyword = 'class.attribute'
    def __init__(self):
        super().__init__()
        self.Data_Type = None
        self.Property_Name = None
        self.Class_Name = None
    def Inference_Context(self):
        return self
    def Fallback_Generate(self):
        Property_Fallback = str(self.Property_Name.Fallback)
        Type_Fallback = str(self.Data_Type.Fallback)
        Ancestor_Fallback = 'Attribute'
        Class_Fallback = None
        if self.Class_Name is not None:
            Class_Fallback = self.Class_Name.Fallback
        else:
            Type_Name = str(Type_Fallback[0].upper()) + str(Type_Fallback[1:])
            Class_Fallback = Type_Name
        # comment "Class Property entities don't know their owner!";
        Code = 'class.property entity ' + str(Property_Fallback) + ' (new Class_' + str(Class_Fallback) + ');' + str('\n')
        self.Fallback = Code
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Data_Type')
        self.Data_Type = self.Listargs.pop(0)
        if len(self.Listargs) == 0:
            raise Exception('missing required argument Property_Name')
        self.Property_Name = self.Listargs.pop(0)
        if len(self.Listargs) > 0:
            self.Class_Name = self.Listargs.pop(0)
class Statement_Behavior (Method_Statement):
    Gal_Keyword = 'behavior'
    Gs_Keyword = 'behavior'
    def Fallback_Generate(self):
        Code = 'method' + str(self.Fallback_Args()) + str(self.Fallback_Block())
        self.Fallback = Code
    def Attributes(self):
        pass
class Syntax_Attribute (Syntax):
    Gal_Keyword = 'attribute'
    Gs_Keyword = 'attribute'
    Aliases = " att get value "
    def Fallback_Generate(self):
        Gal_Code = '[. ' + str(self.Fallback_Args()) + ' Attribute_Value]'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Syntax_Certainty (Syntax):
    Gal_Keyword = 'certainty'
    Gs_Keyword = 'certainty'
    Aliases = " cert "
    def Fallback_Generate(self):
        Gal_Code = '[. ' + str(self.Fallback_Args()) + ' Attribute_Certainty]'
        self.Fallback = Gal_Code
    def Attributes(self):
        pass
class Statement_Old_Goal (Goal_Statement):
    Gal_Keyword = 'goal'
    Gs_Keyword = 'goal'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        Name = str(self.Class_Name.Fallback)
        Definitions = ''
        Subgoals = ''
        Statement = None
        for Statement in self.Block.Statements:
            Definition = str(Statement.Fallback_Declaration)
            Subgoal = str(Statement.Fallback)
            if (Definition is not None and str(Definition) > ""):
                Definitions += str(Definition) + str('\n')
            if (Subgoal is not None and str(Subgoal) > ""):
                Subgoals += str(Subgoal) + str('\n')
        Code = 'class Goal_' + str(Name) + ' [is Goal]' + str('\n') + '{' + str('\n') + str(self.Indent(Definitions)) + '}' + str(self.Indent(Subgoals)) + 'comment `End of Goal_' + str(Name) + ' scope.`;' + str('\n'*2)
        self.Fallback = Code
        self.Fallback_Declaration = 'property entity Goal_'  +  Name  +  ' (new Goal_'  +  Name  +  ');'
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required Class_Name')
        self.Class_Name = self.Listargs.pop(0)
class Statement_Test (Goal_Statement):
    Gal_Keyword = 'test'
    Gs_Keyword = 'test'
    def __init__(self):
        super().__init__()
        self.Class_Name = None
    def Fallback_Generate(self):
        Name = str(self.Class_Name.Fallback)
        Definitions = ''
        Subgoals = ''
        Statement = None
        for Statement in self.Block.Statements:
            Definition = str(Statement.Fallback_Declaration)
            Subgoal = str(Statement.Fallback)
            if (Definition is not None and str(Definition) > ""):
                Definitions += str(Definition) + str('\n')
            if (Subgoal is not None and str(Subgoal) > ""):
                Subgoals += str(Subgoal) + str('\n')
        Args = str(self.Fallback_Args())
        Code = 'goal Test_' + str(Name) + ' ' + str(Args) + str('\n') + '{' + str('\n') + str(self.Indent(Definitions)) + '}' + str(self.Indent(Subgoals)) + 'comment `End of Test_' + str(Name) + ' scope.`;' + str('\n'*2)
        self.Fallback = Code
        self.Fallback_Declaration = 'property entity Goal_'  +  Name  +  ' (new Goal_'  +  Name  +  ');'
    def Attributes(self):
        if len(self.Listargs) == 0:
            raise Exception('missing required Class_Name')
        self.Class_Name = self.Listargs.pop(0)
# comment 'Factory.gal';
class Factory:
    Element_Index = {}
    @classmethod
    def Add_Index(cls, Element):
        try:
            cls.Element_Index[Element.__class__.__name__] += 1
        except Exception:
            cls.Element_Index[Element.__class__.__name__] = 1
    @classmethod
    def Create_Token(cls, Char, Next, Position):
        New_Token = None
        if Token_Operation_Start.Predict(Char, Next):
            New_Token = Token_Operation_Start()
        elif Token_Operation_End.Predict(Char, Next):
            New_Token = Token_Operation_End()
        elif Token_Syntax_Start.Predict(Char, Next):
            New_Token = Token_Syntax_Start()
        elif Token_Syntax_End.Predict(Char, Next):
            New_Token = Token_Syntax_End()
        elif Token_Block_Start.Predict(Char, Next):
            New_Token = Token_Block_Start()
        elif Token_Block_End.Predict(Char, Next):
            New_Token = Token_Block_End()
        elif Token_Semi.Predict(Char, Next):
            New_Token = Token_Semi()
        elif Token_Comma.Predict(Char, Next):
            New_Token = Token_Comma()
        elif Token_Class_Name.Predict(Char, Next):
            New_Token = Token_Class_Name()
        elif Token_Name.Predict(Char, Next):
            New_Token = Token_Name()
        elif Token_Keyvalue_Start.Predict(Char, Next):
            New_Token = Token_Keyvalue_Start()
        elif Token_Keyvalue_End.Predict(Char, Next):
            New_Token = Token_Keyvalue_End()
        elif Quote.Predict(Char, Next):
            New_Token = Quote()
        elif Token_Space.Predict(Char, Next):
            New_Token = Token_Space()
        elif Number.Predict(Char, Next):
            New_Token = Number()
        else:
            New_Token = Token_Name()
        New_Token.Input = Char
        New_Token.Start_Position = Position
        New_Token.End_Position = Position
        Factory.Add_Index(New_Token)
        return New_Token
    @classmethod
    def Create_Statement(cls, Input_Token, Next, Document, Parent_Element):
        Verb = ' ' + str(Input_Token.Input.lower()) + ' '
        Element = None
        if Verb in ' = assign ':
            Element = Statement_Assign()
        elif Verb in ' . call ':
            Element = Statement_Call()
        elif Verb in ' : c. ':
            Element = Statement_Colon()
        elif Verb in ' .= property.assign property.set propset ':
            Element = Statement_Propset()
        elif Verb in ' := cp.= classpropset ':
            Element = Statement_Classpropset()
        elif Verb in ' ~ tilda ':
            Element = Statement_Tilda()
        elif Verb in ' ~i tildai ':
            Element = Statement_TildaI()
        elif Verb in ' add + += ':
            Element = Statement_Add()
        elif Verb in ' and & &= ':
            Element = Statement_And()
        elif Verb in ' alias ':
            Element = Statement_Alias()
        elif Verb in ' answer ':
            Element = Statement_Answer()
        elif Verb in ' append string.append s+ ':
            Element = Statement_Append()
        elif Verb in ' argument ':
            Element = Statement_Argument()
        elif Verb in ' arguments ':
            Element = Statement_Arguments()
        elif Verb in ' atomic ':
            Element = Statement_Atomic()
        elif Verb in ' attribute ':
            Element = Statement_Attribute()
        elif Verb in ' author ':
            Element = Statement_Author()
        elif Verb in ' behavior ':
            Element = Statement_Behavior()
        elif Verb in ' break ':
            Element = Statement_Break()
        elif Verb in ' break.if breakif ':
            Element = Statement_Breakif()
        elif Verb in ' catch ':
            Element = Statement_Catch()
        elif Verb in ' class class.append class.addendum ':
            Element = Statement_Class()
        elif Verb in ' class.attribute ':
            Element = Statement_Class_Attribute()
        elif Verb in ' class.method classmethod ':
            Element = Statement_Class_Method()
        elif Verb in ' class.property classprop setting our ':
            Element = Statement_Class_Property()
        elif Verb in ' comment ':
            Element = Statement_Comment()
        elif Verb in ' constructor ':
            Element = Statement_Constructor()
        elif Verb in ' contest ':
            Element = Statement_Contest()
        elif Verb in ' continue ':
            Element = Statement_Continue()
        elif Verb in ' continue.if contif ':
            Element = Statement_Contif()
        elif Verb in ' currency ':
            Element = Statement_Currency()
        elif Verb in ' debug d debugger; ':
            Element = Statement_Debug()
        elif Verb in ' debugif di ':
            Element = Statement_Debug_If()
        elif Verb in ' debug.stack ds ':
            Element = Statement_Debug_Stack()
        elif Verb in ' debug.variable dv ':
            Element = Statement_Debug_Variable()
        elif Verb in ' definition ':
            Element = Statement_Definition()
        elif Verb in ' dialect ':
            Element = Statement_Dialect()
        elif Verb in ' dictionary dict hash ':
            Element = Statement_Dictionary()
        elif Verb in ' dictionary.= dict.= hash.= dictionary.assign dict.assign hash.assign ':
            Element = Statement_Dictionary_Assign()
        elif Verb in ' either ':
            Element = Statement_Either()
        elif Verb in ' element ':
            Element = Statement_Element()
        elif Verb in ' else ':
            Element = Statement_Else()
        elif Verb in ' else.if elsif elseif ':
            Element = Statement_Else_If()
        elif Verb in ' english ':
            Element = Statement_English()
        elif Verb in ' entities ':
            Element = Statement_Entities()
        elif Verb in ' entity object ':
            Element = Statement_Entity()
        elif Verb in ' entity.my.class entity.myclass entity.self.class entity.selfclass object.my.class object.myclass object.self.class object.selfclass ':
            Element = Statement_Entity_My_Class()
        elif Verb in ' entity.new new.entity object.new new.object ':
            Element = Statement_Entity_New()
        elif Verb in ' error raise throw ':
            Element = Statement_Error()
        elif Verb in ' either ':
            Element = Statement_Either()
        elif Verb in ' execute ':
            Element = Statement_Execute()
        elif Verb in ' fallback ':
            Element = Statement_Fallback()
        elif Verb in ' infer.inits ':
            Element = Statement_Infer_Inits()
        elif Verb in ' flag boolean bool ':
            Element = Statement_Flag()
        elif Verb in ' file.append ':
            Element = Statement_File_Append()
        elif Verb in ' file.append.file ':
            Element = Statement_File_Append_File()
        elif Verb in ' file.copy.file file.copy ':
            Element = Statement_File_Copy()
        elif Verb in ' file.readall readall ':
            Element = Statement_File_Readall()
        elif Verb in ' file.dump ':
            Element = Statement_File_Dump()
        elif Verb in ' for.range ':
            Element = Statement_For_Range()
        elif Verb in ' foreach list.foreach ':
            Element = Statement_Foreach()
        elif Verb in ' forever ':
            Element = Statement_Forever()
        elif Verb in ' forgive ':
            Element = Statement_Forgive()
        elif Verb in ' forward ':
            Element = Statement_Forward()
        elif Verb in ' gal general.abstract.language general_abstract_language ':
            Element = Statement_Gal()
        elif Verb in ' generate ':
            Element = Statement_Generate()
        elif Verb in ' goalspell goal.spell ':
            Element = Statement_Goalspell()
        elif Verb in ' gs ':
            Element = Statement_Gs()
        elif Verb in ' isa is_a handle classify ':
            Element = Statement_Classify()
        elif Verb in ' i self me this ':
            Element = Statement_I()
        elif Verb in ' if ':
            Element = Statement_If()
        elif Verb in ' ifdef ':
            Element = Statement_Ifdef()
        elif Verb in ' infer ':
            Element = Statement_Infer()
        elif Verb in ' flowerbox ':
            Element = Statement_Flowerbox()
        elif Verb in ' increment ++ ':
            Element = Statement_Increment()
        elif Verb in ' integer int ':
            Element = Statement_Integer()
        elif Verb in ' inference ':
            Element = Statement_Inference()
        elif Verb in ' infers ':
            Element = Statement_Infers()
        elif Verb in ' integers ints ':
            Element = Statement_Integers()
        elif Verb in ' iterate dict.iterate dictionary.iterate hash.iterate ':
            Element = Statement_Iterate()
        elif Verb in ' javascript ':
            Element = Statement_Javascript()
        elif Verb in ' join list.join ':
            Element = Statement_Join()
        elif Verb in ' keyword ':
            Element = Statement_Keyword()
        elif Verb in ' know import use include ':
            Element = Statement_Know()
        elif Verb in ' gal.language ':
            Element = Statement_Gal_Language()
        elif Verb in ' list ':
            Element = Statement_List()
        elif Verb in ' list.append push list.push ':
            Element = Statement_List_Append()
        elif Verb in ' list.delete list.remove list.splice ':
            Element = Statement_List_Delete()
        elif Verb in ' list.copy ':
            Element = Statement_List_Copy()
        elif Verb in ' list.clear ':
            Element = Statement_List_Clear()
        elif Verb in ' main ':
            Element = Statement_Main()
        elif Verb in ' method ':
            Element = Statement_Method()
        elif Verb in ' module ':
            Element = Statement_Module()
        elif Verb in ' mumps ':
            Element = Statement_Mumps()
        elif Verb in ' my= my.= self.= ':
            Element = Statement_My_Equal()
        elif Verb in ' i= it= self= ':
            Element = Statement_I_Equal()
        elif Verb in ' new ':
            Element = Statement_New()
        elif Verb in ' number ':
            Element = Statement_Number()
        elif Verb in ' numbers ':
            Element = Statement_Numbers()
        elif Verb in ' oho optimize.human.outcome optimize_human_outcome':
            Element = Statement_Oho()
        elif Verb in ' operation ':
            Element = Statement_Operation()
        elif Verb in ' operations ':
            Element = Statement_Operations()
        elif Verb in ' optional ':
            Element = Statement_Optional()
        elif Verb in ' our.= our= us.= us= ':
            Element = Statement_Our_Equal()
        elif Verb in ' parser ':
            Element = Statement_Parser()
        elif Verb in ' principle ':
            Element = Statement_Principle()
        elif Verb in ' prompt.context ':
            Element = Statement_Prompt_Context()
        elif Verb in ' property my ':
            Element = Statement_Property()
        elif Verb in ' python ':
            Element = Statement_Python()
        elif Verb in ' question ':
            Element = Statement_Question()
        elif Verb in ' readline read.line ':
            Element = Statement_Read_Line()
        elif Verb in ' replace string.replace ':
            Element = Statement_Replace()
        elif Verb in ' requirement ':
            Element = Statement_Requirement()
        elif Verb in ' spell ':
            Element = Statement_Spell()
        elif Verb in ' goal ':
            Element = Statement_Goal()
        elif Verb in ' read.char ':
            Element = Statement_Read_Character()
        elif Verb in ' read.char.timed ':
            Element = Statement_Read_Character_Timed()
        elif Verb in ' return ':
            Element = Statement_Return()
        elif Verb in ' require.that ':
            Element = Statement_Require_That()
        elif Verb in ' require.that.i ':
            Element = Statement_Require_That_I()
        elif Verb in ' return.if returnif ':
            Element = Statement_Return_If()
        elif Verb in ' sequence ':
            Element = Statement_Sequence()
        elif Verb in ' sort ':
            Element = Statement_Sort()
        elif Verb in ' protocol ':
            Element = Statement_Old_Goal()
        elif Verb in ' skiptoken skip.token ':
            Element = Statement_Skip_Token()
        elif Verb in ' statement ':
            Element = Statement_Statement()
        elif Verb in ' statements ':
            Element = Statement_Statements()
        elif Verb in ' string ':
            Element = Statement_String()
        elif Verb in ' strings ':
            Element = Statement_Strings()
        elif Verb in ' symbol ':
            Element = Statement_Symbol()
        elif Verb in ' syntax ':
            Element = Statement_Syntax()
        elif Verb in ' syntaxes ':
            Element = Statement_Syntaxes()
        elif Verb in ' test ':
            Element = Statement_Test()
        elif Verb in ' todo ':
            Element = Statement_Todo()
        elif Verb in ' token ':
            Element = Statement_Token()
        elif Verb in ' token.append ':
            Element = Statement_Token_Append()
        elif Verb in ' newtoken ':
            Element = Statement_New_Token()
        elif Verb in ' tokenmode ':
            Element = Statement_Token_Mode()
        elif Verb in ' tokens ':
            Element = Statement_Tokens()
        elif Verb in ' try ':
            Element = Statement_Try()
        elif Verb in ' undef undefined ':
            Element = Statement_Undef()
        elif Verb in ' unless ':
            Element = Statement_Unless()
        elif Verb in ' variant ':
            Element = Statement_Variant()
        elif Verb in ' verb polymorph ':
            Element = Statement_Verb()
        elif Verb in ' verbose ':
            Element = Statement_Verbose()
        elif Verb in ' verbosity ':
            Element = Statement_Verbosity()
        elif Verb in ' we us ':
            Element = Statement_We()
        elif Verb in ' myclass ':
            Element = Statement_Myclass()
        elif Verb in ' while ':
            Element = Statement_While()
        elif Verb in ' write ':
            Element = Statement_Write()
        elif Verb in ' writeline say write.line ':
            Element = Statement_Write_Line()
        elif Verb in ' raku ':
            Element = Statement_Raku()
        # comment 'Book Dialect';
        elif Verb in ' book ':
            Element = Statement_Book()
        elif Verb in ' chapter chap ':
            Element = Statement_Chapter()
        elif Verb in ' section ':
            Element = Statement_Section()
        elif Verb in ' overview ':
            Element = Statement_Overview()
        elif Verb in ' expository exposition expo ':
            Element = Statement_Expository()
        elif Verb in ' paragraph p ':
            Element = Statement_Paragraph()
        elif Verb in ' linux shell ':
            Element = Statement_Shell()
        elif Verb in ' summary summ ':
            Element = Statement_Summary()
        elif Verb in ' title ':
            Element = Statement_Title()
        elif Verb in ' description desc ':
            Element = Statement_Description()
        elif Verb in ' codefile code ':
            Element = Statement_Codefile()
        elif Verb in ' book.gal ':
            Element = Statement_Book_Gal()
        elif Verb in ' book.raku ':
            Element = Statement_Book_Raku()
        elif Verb in ' book.fallback ':
            Element = Statement_Book_Fallback()
        elif Verb in ' book.python ':
            Element = Statement_Book_Python()
        elif Verb in ' book.javascript ':
            Element = Statement_Book_Javascript()
        elif Verb in ' feature ':
            Element = Statement_Feature()
        elif Verb in ' thing ':
            Element = Statement_Thing()
        elif Verb in ' resource ':
            Element = Statement_Resource()
        elif Verb in ' task ':
            Element = Statement_Task()
        elif Verb in ' subtask ':
            Element = Statement_Subtask()
        elif Verb in ' workaround ':
            Element = Statement_Workaround()
        elif Verb in ' status ':
            Element = Statement_Status()
        elif Verb in ' start ':
            Element = Statement_Start()
        elif Verb in ' end ':
            Element = Statement_End()
        elif Verb in ' scene ':
            Element = Statement_Scene()
        elif Verb in ' camera ':
            Element = Statement_Camera()
        elif Verb in ' box ':
            Element = Statement_Box()
        elif Verb in ' position ':
            Element = Statement_Position()
        elif Verb in ' animation ':
            Element = Statement_Animation()
        elif Verb in ' center ':
            Element = Statement_Center()
        elif Verb in ' color ':
            Element = Statement_Color()
        elif Verb in ' rotation ':
            Element = Statement_Rotation()
        elif Verb in ' size ':
            Element = Statement_Size()
        elif Verb in ' texture ':
            Element = Statement_Texture()
        elif Verb in ' x ':
            Element = Statement_X()
        elif Verb in ' y ':
            Element = Statement_Y()
        elif Verb in ' z ':
            Element = Statement_Z()
        elif Verb in ' uuid ':
            Element = Statement_Uuid()
        else:
            raise Exception("Unknown Statement '" + str(Input_Token.Input) + "'")
        Element.Elements.extend([Input_Token])
        Element.Verb = Next.Input
        Element.Start_Position = Input_Token.Start_Position
        Element.End_Position = Input_Token.End_Position
        Element.Document = Document
        Element.Parent = Parent_Element
        Element.Block = Block()
        Element.Ensure_Block()
        return Element
    @classmethod
    def Create_Operation(cls, Input_Token, Next, Document, Parent_Element):
        Verb = ' ' + str(Next.Input.lower()) + ' '
        Element = None
        # comment 'Numeric Operations';
        if Verb in ' + add ':
            Element = Operation_Add()
        elif Verb in ' greater gt ':
            Element = Operation_Greater()
        elif Verb in ' greater.equal ge ':
            Element = Operation_Greater_Equal()
        elif Verb in ' divide div / ':
            Element = Operation_Divide()
        elif Verb in ' less lt ':
            Element = Operation_Less()
        elif Verb in ' less.equal le ':
            Element = Operation_Less_Equal()
        elif Verb in ' multiply mult * ':
            Element = Operation_Multiply()
        elif Verb in ' round ':
            Element = Operation_Round()
        elif Verb in ' subtract - ':
            Element = Operation_Subtract()
        # comment 'Logical Operations';
        elif Verb in ' & and ':
            Element = Operation_And()
        elif Verb in ' equal = ':
            Element = Operation_Equal()
        elif Verb in ' != ne not.= not.equal ':
            Element = Operation_Not_Equal()
        elif Verb in ' not ! ':
            Element = Operation_Not()
        elif Verb in ' or | ':
            Element = Operation_Or()
        # comment 'Invocation Operations';
        elif Verb in ' . call ':
            Element = Operation_Call()
        elif Verb in ' : cm class.method ':
            Element = Operation_Colon()
        elif Verb in ' i self me this ':
            Element = Operation_I()
        elif Verb in ' we ':
            Element = Operation_We()
        # comment 'Class Operations';
        elif Verb in ' classpropget ':
            Element = Operation_Classpropget()
        elif Verb in ' new ':
            Element = Operation_New()
        # comment 'Variable Operations';
        elif Verb in ' defined ':
            Element = Operation_Defined()
        elif Verb in ' isnull is.null ':
            Element = Operation_Is_Null()
        elif Verb in ' notnull not.null ':
            Element = Operation_Not_Null()
        elif Verb in ' env environ environment ':
            Element = Operation_Environment()
        # comment 'Dictionary/Hash Operations';
        elif Verb in ' key.get dict.get dictionary.get hash.get ':
            Element = Operation_Key_Get()
        elif Verb in ' key.exists dict.exists dictionary.exists hash.exists ':
            Element = Operation_Key_Exists()
        # comment 'String Operations';
        elif Verb in ' firstchar ':
            Element = Operation_Firstchar()
        elif Verb in ' is.whitespace whitespace ':
            Element = Operation_Whitespace()
        elif Verb in ' lastchar ':
            Element = Operation_Lastchar()
        elif Verb in ' lowercase lower ':
            Element = Operation_Lowercase()
        elif Verb in ' startswith starts.with starts begins beginswith begins.with ':
            Element = Operation_Begins()
        elif Verb in ' string ':
            Element = Operation_String()
        elif Verb in ' string.append append s.append s+ ':
            Element = Operation_Append()
        elif Verb in ' string.contains contains s.contains ':
            Element = Operation_Contains()
        elif Verb in ' string.equal string.eq seq s= s.= ':
            Element = Operation_String_Equal()
        elif Verb in ' string.greater string.gt s.gt sgt ':
            Element = Operation_String_Greater()
        elif Verb in ' string.greater.equal string.ge s.ge sge ':
            Element = Operation_String_Greater_Equal()
        elif Verb in ' string.length length s.length s.len len ':
            Element = Operation_String_Length()
        elif Verb in ' string.less string.lt s.lt slt ':
            Element = Operation_String_Less()
        elif Verb in ' string.less.equal string.le s.le sle ':
            Element = Operation_String_Less_Equal()
        elif Verb in ' string.not.equal string.ne s.ne sne s!= ':
            Element = Operation_String_Not_Equal()
        elif Verb in ' substring ':
            Element = Operation_Substring()
        elif Verb in ' uppercase upper ':
            Element = Operation_Uppercase()
        elif Verb in ' is.lowercase is.lower islower ':
            Element = Operation_Is_Lowercase()
        elif Verb in ' is.uppercase is.upper isupper ':
            Element = Operation_Is_Uppercase()
        elif Verb in ' isalpha ':
            Element = Operation_Is_Alpha()
        elif Verb in ' isident ':
            Element = Operation_Is_Ident()
        elif Verb in ' title.case titlecase ':
            Element = Operation_Titlecase()
        # comment 'Communication Operations';
        elif Verb in ' http.fetch fetch ':
            Element = Operation_Http_Fetch()
        # comment 'Instance Operations';
        elif Verb in ' isa is.a ':
            Element = Operation_Isa()
        # comment 'List Operations';
        elif Verb in ' list.get ':
            Element = Operation_List_Get()
        elif Verb in ' list.last ':
            Element = Operation_List_Last()
        elif Verb in ' list.length ':
            Element = Operation_List_Length()
        elif Verb in ' list.pop pop ':
            Element = Operation_List_Pop()
        elif Verb in ' list.shift shift ':
            Element = Operation_List_Shift()
        elif Verb in ' list.split split ':
            Element = Operation_List_Split()
        # comment 'Database Operations';
        elif Verb in ' sql.escape ':
            Element = Operation_Sql_Escape()
        elif Verb in ' sql.query query ':
            Element = Operation_Sql_Query()
        # comment 'time operations';
        elif Verb in ' time.string ':
            Element = Operation_Time_String()
        # comment 'oho compiler operations';
        elif Verb in ' tokenmode ':
            Element = Operation_Token_Mode()
        elif Verb in ' file.exists ':
            Element = Operation_File_Exists()
        elif Verb in ' char2int ':
            Element = Operation_Char2int()
        elif Verb in ' int2char ':
            Element = Operation_Int2char()
        else:
            raise Exception("Unknown Operation '" + str(Verb) + "' '" + str(Next.Input) + "'")
        Element.Elements.extend([Input_Token])
        Element.Start_Position = Input_Token.Start_Position
        Element.End_Position = Input_Token.End_Position
        Element.Document = Document
        Element.Parent = Parent_Element
        Factory.Add_Index(Element)
        return Element
    @classmethod
    def Create_Syntax(cls, Input_Token, Next, Document, Parent_Element):
        Verb = ' ' + str(Next.Input.lower()) + ' '
        Element = None
        if Verb in ' . property prop p ':
            Element = Syntax_Dot()
        elif Verb in ' ~ attribute att symbol ':
            Element = Syntax_Symbol()
        elif Verb in ' backslash ':
            Element = Syntax_Backslash()
        elif Verb in ' : ':
            Element = Syntax_Colon()
        elif Verb in ' class ':
            Element = Syntax_Class()
        elif Verb in ' class.attribute class.att classatt ':
            Element = Syntax_Class_Symbol()
        elif Verb in ' class.lookup lookup ':
            Element = Syntax_Class_Lookup()
        elif Verb in ' class.name classname ':
            Element = Syntax_Class_Name()
        elif Verb in ' class.property classprop cp our their ':
            Element = Syntax_Class_Property()
        elif Verb in ' dictionary dict hash ':
            Element = Syntax_Dictionary()
        elif Verb in ' entity ':
            Element = Syntax_Entity()
        elif Verb in ' exclude ':
            Element = Syntax_Exclude()
        elif Verb in ' false ':
            Element = Syntax_False()
        elif Verb in ' flag ':
            Element = Syntax_Flag()
        elif Verb in ' generator ':
            Element = Syntax_Generator()
        elif Verb in ' key ':
            Element = Syntax_Key()
        elif Verb in ' indent ':
            Element = Syntax_Indent()
        elif Verb in ' infinity ':
            Element = Syntax_Infinity()
        elif Verb in ' -infinity ':
            Element = Syntax_Negative_Infinity()
        elif Verb in ' integer ':
            Element = Syntax_Integer()
        elif Verb in ' is extends ':
            Element = Syntax_Is()
        elif Verb in ' italic ':
            Element = Syntax_Italic()
        elif Verb in ' line newline ':
            Element = Syntax_Line()
        elif Verb in ' list ':
            Element = Syntax_List()
        elif Verb in ' my self this me i ':
            Element = Syntax_My()
        elif Verb in ' my.attribute my.symbol ':
            Element = Syntax_My_Symbol()
        elif Verb in ' my.class self.class me.class us ':
            Element = Syntax_My_Class()
        elif Verb in ' node ':
            Element = Syntax_Node()
        elif Verb in ' null ':
            Element = Syntax_Null()
        elif Verb in ' number ':
            Element = Syntax_Number()
        elif Verb in ' optional ':
            Element = Syntax_Optional()
        elif Verb in ' optional.repeating optrep ':
            Element = Syntax_Optrep()
        elif Verb in ' repeating ':
            Element = Syntax_Repeating()
        elif Verb in ' string ':
            Element = Syntax_String()
        elif Verb in ' tab ':
            Element = Syntax_Tab()
        elif Verb in ' true ':
            Element = Syntax_True()
        elif Verb in ' variant ':
            Element = Syntax_Variant()
        elif Verb in ' red ':
            Element = Syntax_Red()
        else:
            raise Exception("Unknown Syntax '" + str(Next.Input) + "'")
        Element.Elements.extend([Input_Token])
        Element.Start_Position = Input_Token.Start_Position
        Element.End_Position = Input_Token.End_Position
        Element.Document = Document
        Element.Parent = Parent_Element
        Factory.Add_Index(Element)
        return Element
    @classmethod
    def Create_Keyvalue(cls, Input_Token, Next, Document, Parent_Element):
        print('Creating Keyvalue from input token: ', Input_Token.To_String(), sep='')
        Element = Keyvalue()
        Element.Elements.extend([Input_Token])
        Element.Start_Position = Input_Token.Start_Position
        Element.End_Position = Input_Token.End_Position
        Element.Document = Document
        Element.Parent = Parent_Element
        return Element
    @classmethod
    def Create_Element(cls, Input_Token, Next, Document, Parent_Element, Comma_Mode):
        Element = None
        if isinstance(Input_Token, Token_Operation_Start) or isinstance(Input_Token, Token_Comma) and str(Comma_Mode) == 'operation':
            Element = Factory.Create_Operation(Input_Token, Next, Document, Parent_Element)
        elif isinstance(Input_Token, Token_Syntax_Start) or isinstance(Input_Token, Token_Comma) and str(Comma_Mode) == 'syntax':
            Element = Factory.Create_Syntax(Input_Token, Next, Document, Parent_Element)
        elif isinstance(Input_Token, Token_Keyvalue_Start) or isinstance(Input_Token, Token_Comma) and str(Comma_Mode) == 'keyvalue':
            Element = Factory.Create_Keyvalue(Input_Token, Next, Document, Parent_Element)
        else:
            Element = Factory.Create_Statement(Input_Token, Next, Document, Parent_Element)
        # comment 'string Elem_String (. Element To_String)';
        # comment 'string Parent_String (. Parent_Element To_String)';
        # comment 'writelinecreated  Elem_String with parent  Parent_String';
        return Element
# comment 'Compiler.gal';
class Compiler:
    Instance = None
    def __init__(self):
        super().__init__()
        self.Token_Dialect = False
        self.Element_Dialect = False
        self.Token_List = False
        self.Element_List = False
        self.Show_Output = False
        self.Verbose = False
        self.Test_Errors = []
        self.Generate_Gal = False
        self.Generate_Fallback = False
        self.Sideways = False
        self.Class_Export = False
        self.Verb_Export = False
        self.Class_Keep_Verbs = True
        self.Verb_Keep_Handlers = True
        self.Language = None
        self.Verb_Index = {}
        self.Class_Index = {}
        self.Statements = []
        self.Operations = []
        self.Syntaxes = []
        self.Statement_Index = []
        self.Operation_Index = []
        self.Syntax_Index = []
    def Test(self):
        Element = None
        Test_Count = 0
        Errors = []
        # comment "TODO:" 'my.verbose statement';
        if self.Verbose:
            print('Testing Operations')
        for Element in self.Operations:
            Element.Test(Errors, self.Verbose)
            Test_Count += 1
        if self.Verbose:
            print('Testing Statements')
        for Element in self.Statements:
            Element.Test(Errors, self.Verbose)
            Test_Count += 1
        if self.Verbose:
            print('Testing Syntaxes')
        for Element in self.Syntaxes:
            Element.Test(Errors, self.Verbose)
            Test_Count += 1
        if self.Verbose:
            print('Tests: ', Test_Count, sep='')
            print('Errors: ', len(Errors), sep='')
        # comment "TODO:" 'our= Test_Errors Errors';
    def Add_Verb(self, Statement):
        Signature = str(Statement.Method_Signature)
        self.Verb_Index[Signature] = Statement;
        # comment "writeline 'Successfully added ' Signature ' to verb index.';";
    def Get_Verb(self, Name):
        try:
            return self.Verb_Index[Name]
        except Exception:
            return None
    def Add_Class(self, Statement):
        Name = str(Statement.Name_Prefix) + str(Statement.Class_Name.Input)
        if Name in self.Class_Index.keys():
            Existing = self.Class_Index[Name]
            if Existing.Am_Earlier(self):
                return
        self.Class_Index[Name] = Statement;
        # comment 'writelineSuccessfully added  Name to class index.';
    def Get_Class(self, Name):
        try:
            return self.Class_Index[Name]
        except Exception:
            return None
    def Add_Definition(self, Element):
        if isinstance(Element, Statement_Statement):
            self.Statements.extend([Element])
        elif isinstance(Element, Statement_Operation):
            self.Operations.extend([Element])
        elif isinstance(Element, Statement_Syntax):
            self.Syntaxes.extend([Element])
    def Generate_Factory(self):
        Definition_Methods = 'todo "Tokens";' + str('\n')
        Definition_Methods += str(self.__class__.Generate_Factory_Method('Statement', self.Statements))
        Definition_Methods += str(self.__class__.Generate_Factory_Method('Operation', self.Operations))
        Definition_Methods += str(self.__class__.Generate_Factory_Method('Syntax', self.Syntaxes))
        # comment "TODO:" 'Indent Definition Methods';
        Factory_Code = 'class Factory' + str('\n') + '{' + str('\n') + str(Definition_Methods) + '}' + str('\n')
        return Factory_Code
    def Generate_Factory_Method(self, Type, Definition_List):
        Header = 'method entity Create_' + str(Type) + str(''' [entity Input_Token, entity Next, entity Document, entity Parent_Element]'''  +  '\n'  +  '''{'''  +  '\n'  +  '''    string Verb ' ' (lowercase [. Input_Token Input]) ' ';'''  +  '\n'  +  '''    entity Element;'''  +  '\n'  +  '''''')
        Tail = str('''    else'''  +  '\n'  +  '''    {'''  +  '\n'  +  '''        error "Unknown ''') + str(Type) + str(''' '" [. Input_Token Input] "'";'''  +  '\n'  +  '''    }'''  +  '\n'  +  '''    list.append [. Element Elements] Input_Token;'''  +  '\n'  +  '''    .= Element Verb [. Next Input];'''  +  '\n'  +  '''    .= Element Start_Position [. Input_Token Start_Position];'''  +  '\n'  +  '''    .= Element End_Position [. Input_Token End_Position];'''  +  '\n'  +  '''    .= Element Document Document;'''  +  '\n'  +  '''    .= Element Parent Parent_Element;'''  +  '\n'  +  '''    : Factory Add_Index Element;'''  +  '\n'  +  '''    return Element;'''  +  '\n'  +  '''}''')
        Else = ''
        Definition = None
        Class_Name = None
        Declaration = ''
        for Definition in Definition_List:
            Class_Name = Definition.Class_Name.Input
            Aliases = str(Definition.Aliases)
            Options = ' ' + str(Class_Name) + ' ' + str(Aliases) + ' '
            Declaration += '    ' + str(Else)
            Declaration += 'if (contains "' + str(Options) + '" Verb) { new Element ' + str(Class_Name) + '; }' + str('\n')
            Else = 'else.'
        Code = str(Header) + str(Declaration) + str(Tail)
        return Code
    def Error_Check(self, This_Document, Context):
        Error_Report = ''
        Element_Number = 0
        This_Element = None
        for This_Element in This_Document.Document_Body:
            Element_Number += 1
            if This_Element.Error is not None:
                if str(This_Element.Error) > '':
                    Error_Report += str(Element_Number) + ' ' + str(This_Element.To_String()) + str('\n')
        if str(Error_Report) > '':
            print("ERROR REPORT in ", Context, sep='')
            print(Error_Report)
            raise Exception("EXITING due to error in " + str(Context))
    def Show_Tokens(self, Parser):
        print('Tokens:')
        Item = None
        Item_Number = 0
        for Item in Parser.Tokens:
            Item_Number += 1
            if isinstance(Item, Token):
                print(Item_Number, ' ', Item.To_String(), sep='')
            else:
                print(Item_Number, ': "', Item, '"', sep='')
    def Show_Elements(self, Parser):
        This_Element = None
        Element_Number = 0
        print('Elements:')
        for This_Element in Parser.Document_Body:
            Element_Number += 1
            if isinstance(This_Element, Token) or isinstance(This_Element, Element):
                print(Element_Number, ' ', This_Element.To_String(), sep='')
            else:
                print(Element_Number, ': "', This_Element, '"', sep='')
        print('')
    def Export_Tokens(self, Parser):
        Item = None
        for Item in Parser.Tokens:
            print('element ', Item.__class__.__name__, ';', sep='')
    def Export_Elements(self, Parser):
        This_Element = None
        for This_Element in Parser.Document_Body:
            if isinstance(This_Element, Named_Element):
                print(This_Element.__class__.__name__, " '", This_Element.Gs_Keyword, "',", sep='')
            else:
                print('element ', This_Element.__class__.__name__, ';', sep='')
        print('')
    def Translate(self, Translation, Source, Target):
        if self.Verbose:
            print('translating ', Translation, ' file ', Source, ' to ', Target, sep='')
        Parser = None
        Generator = None
        if str(Translation) == 'gal':
            Parser = Gal_Input()
            Generator = Gal_Output()
            self.Class_Export = True
        elif str(Translation) == 'fallback':
            Parser = Gal_Input()
            Generator = Fallback_Output()
        elif str(Translation) == 'python':
            Parser = Gal_Input()
            Generator = Python_Output()
        elif str(Translation) == 'javascript':
            Parser = Gal_Input()
            Generator = Javascript_Output()
        else:
            raise Exception("Unsupported translation '" + str(Translation) + "'.")
        Parser.File_Name = Source
        Generator.File_Name = Target
        # comment ". [class] Oho;";
        if self.Verbose:
            print('    reading ', Source, sep='')
        Parser.Read()
        if self.Verbose:
            print('    read complete')
        self.Error_Check(Parser, 'reading')
        if self.Verbose:
            print('    tokenizing ', Source, sep='')
        Parser.Tokenize()
        if self.Token_List:
            self.Show_Tokens(Parser)
        if self.Token_Dialect:
            self.Export_Tokens(Parser)
        self.Error_Check(Parser, 'tokenizing')
        if self.Verbose:
            print('    parsing ', Source, sep='')
        Parser.Parse()
        self.Error_Check(Parser, 'parsing')
        if self.Verbose:
            print('    attributes ', Source, sep='')
        Parser.Child_Attributes()
        self.Error_Check(Parser, 'attributes')
        if self.Verbose:
            print('    structure ', Source, sep='')
        Parser.Structure()
        self.Error_Check(Parser, 'structure')
        if self.Verbose:
            print('    model ', Source, sep='')
        Parser.Base_Model()
        self.Error_Check(Parser, 'model')
        if self.Verbose:
            print('    generating ', Target, sep='')
        Generator.Generate(Parser)
        self.Error_Check(Parser, 'generate')
        if self.Element_List:
            self.Show_Elements(Parser)
        if self.Element_Dialect:
            self.Export_Elements(Parser)
        Output_Code = str(Generator.Get(Parser))
        if self.Show_Output:
            print(Output_Code)
        Generator.Input = Output_Code
        Generator.File_Name = Target
        if self.Verbose:
            print('    write ', Target, sep='')
        Generator.Write()
        Test_Target = str(Target) + '.gs'
        Test_Gen = None
        Test_Gen = Test_Output()
        Test_Gen.Generate(Parser)
        Test_Code = str(Test_Gen.Get(Parser))
        Test_Gen.Input = Test_Code
        Test_Gen.File_Name = Test_Target
        Test_Gen.Write()
class Dialect:
    def __init__(self):
        super().__init__()
        self.Name_Prefix = None
        self.Statements = []
        self.Operations = []
        self.Syntaxes = []
    # comment "TODO:" 'Operations, Syntaxes and Elements are lists, not dictionaries.';
    def Import(self):
        Element = None
        Name = None
        for Element in self.Statements:
            for Name in Element.Names:
                self.Statements[Name] = Element;
        for Element in self.Operations:
            for Name in Element.Names:
                self.Operations[Name] = Element;
        for Element in self.Operations:
            for Name in Element.Names:
                self.Operations[Name] = Element;
    def Know(self):
        Element = None
        Prefix = str(self.Name_Prefix) + '.'
        Name = None
        Full_Name = None
        for Element in self.Statements:
            for Name in Element.Names:
                Full_Name = Prefix  +  Name
                self.Statement_Index[Full_Name] = Element;
        for Element in self.Operations:
            for Name in Element.Names:
                Full_Name = Prefix  +  Name
                self.Operation_Index[Full_Name] = Element;
        for Element in self.Syntaxes:
            for Name in Element.Names:
                Full_Name = Prefix  +  Name
                self.Syntax_Index[Full_Name] = Element;
if __name__ == '__main__':
    try:
        (Translation, Source, Target) = sys.argv[1:]
    except:
        pass
    Comp_Instance = None
    Comp_Instance = Compiler()
    Compiler.Instance = Comp_Instance
    Comp_Instance.Translate(Translation, Source, Target)
