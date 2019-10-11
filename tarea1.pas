function MultiplicacionRusa(a, b: integer) : integer;

var numero, numero2, resulta: integer;

begin

  numero := a;
  numero2 := b;
  resulta := 0;

  if (numero >= numero2) then
      repeat

        if (esImpar(numero2)) then
          resulta := resulta + numero;
        numero2 := mitad(numero2);
        numero := doble(numero)

      until (numero2 < 1)
  else
      repeat

        if (esImpar(numero)) then
          resulta := resulta + numero2;
        numero := mitad(numero);
        numero2 := doble(numero2)

      until (numero < 1);

  MultiplicacionRusa := resulta;
end;