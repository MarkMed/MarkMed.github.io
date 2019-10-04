program PrincipalTarea1;
type
   EnteroPositivo = 1 .. MaxInt;
var
   num1,num2 : EnteroPositivo;

{ funciones aritméticas }
function doble(x : integer) : integer;
begin
   doble:= x + x
end;

function mitad(x : integer) : integer;
begin
   mitad:= x div 2
end;

function esImpar(n : integer) : boolean;
begin
   esImpar:= odd(n)
end;

function MultiplicacionRusa(a, b: integer) : integer;

var num, num2, resulta, expected: integer;

begin

  num := a;
  num2 := b;
  resulta := 0;

  if(num >= num2) then

    repeat

      if (esImpar(num2)) then
        resulta = resulta + num

      num2 := mitad(num2);
      num := num + num

    until (num2 = 1)

  else

    repeat

      if (esImpar(num))
        resulta := resulta + num2

      num := mitad(num);
      num2 := num2 + num2;

    until (num = 1);

  MultiplicacionRusa := resulta;
end;


begin
   write('Ingrese números: ');
   readln(num1,num2);

   writeln('Resultado: ',MultiplicacionRusa(num1,num2))
end.
