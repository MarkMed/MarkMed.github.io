program TareaDos2019;
{
   Programación 1.   InCo.

   Laboratorio 2019
   Programa principal para la segunda tarea
}

{ este archivo no debe ser modificado }

const
   { definición de constantes}
   MaxLargo       =  17; { máximo largo palabra                }
   MaxVocabulario = 455; { cantidad de palabras en vocabulario }

type
   { definición de tipos }
   RangoIndicePalabra   =  1 .. MaxLargo;
   RangoLargoPalabra    =  0 .. MaxLargo;

   TipoLetra = 'a'..'z'; { letras minúsculas sin ñ ni tildes }

   TipoPalabra =
	  record
		 info  : array [RangoIndicePalabra] of TipoLetra;
		 largo : RangoLargoPalabra
	  end;

   RangoVocabulario     =  1 .. MaxVocabulario;
   TipoVocabulario = array [RangoVocabulario] of TipoPalabra;

   TipoDistancia = 0 .. MaxLargo;

   { resultado de palabra más cercana }
   PosiblePalabra =
		  record case hayPalabra : boolean of
			   true  : (palabra : TipoPalabra);
			   false : ();
		  end;

   ListaPalabras = ^celda;
   celda = record
		 info : TipoPalabra;
		 sig  : ListaPalabras
	end;



function distanciaPalabra(pal1,pal2 : TipoPalabra) : integer;
{ distancia de levenshtein }
type
   MatrizDistancias =
		record
	   dist     : array [0..MaxLargo,0..MaxLargo] of integer;
	   topeFila,topeColumna : 0 .. MaxLargo
	end;
var
   m : MatrizDistancias;
   i,j,costo : integer;

   function minimo(a,b : integer) : integer;
   begin
	  if a <= b then
	 minimo:= a
	  else
	 minimo:= b
   end;  {minimo}


begin {distancia}
   with m do
   begin
	  {topes}
	  topeFila:= pal1.largo;
	  topeColumna:= pal2.largo;
	  
	  {primera fila}
	  for j:= 0 to topeColumna do
	 dist[0,j]:= j;
	  {primera columna}
	  for i:= 0 to topeFila do
	 dist[i,0]:= i;
	  
	  for i:= 1 to topeFila do
	 for j:= 1 to topeColumna do
	 begin
		if pal1.info[i] = pal2.info[j]then
		   costo:= 0
		else
		   costo:= 1;
		dist[i,j]:=
			 minimo(dist[i-1, j] + 1,               { borrar  }
			minimo(dist[i, j-1] + 1,        { agregar }
				   dist[i-1, j-1] + costo)  { cambiar }
			)
	 end;
	  distanciaPalabra:= dist[topeFila,topeColumna]
   end
end;


{con esta directiva se incluyen los subprogramas de tarea2.pas}

{///////////////////////////////////////////////////////////////////////////////////////////////////////}
function esPrefijo(pal1,pal2: TipoPalabra): boolean;
var
	i: integer;
	prefijo: boolean
begin
	i := 1;
	prefijo := true;
	if pal1.largo = 0 then
		esPrefijo := prefijo;
	if	pal1.largo > pal2.largo then
		begin
			prefijo := false;
			esPrefijo := prefijo;
		end
	else
		begin
			while i <= pal1.largo and pal1.info[i] = pal2.info[i] do
				i = i+1;
			if i <> (pal1.largo + 1) then
				prefijo := false;
			esPrefijo := prefijo;
		end
end;

function igualPalabra(pal1,pal2: TipoPalabra): boolean;
var
	i: integer;
	sonIguales: boolean;
begin
	if pal1.largo <> pal2.largo then
		sonIguales := false;
	else
	begin
		i := 1;
        while i <= pal1.largo and pal1.info[i] = pal2.info[i] do
			i = i+1;
        if i <> (pal1.largo + 1) then
            sonIguales := false;
        else
            sonIguales := true;
	end;
    igualPalabra := sonIguales;
end;

procedure palabraADistancia(palabra: TipoPalabra; vocabulario: TipoVocabulario; distancia: TipoDistancia; var resultado: PosiblePalabra);
var 
	i: integer;
	palabradDeVocabulario: TipoPalabra;
begin
	resultado.hayPalabra:= false;
	for i:=1 to MaxVocabulario do
		begin
			palabradDeVocabulario = vocabulario[i];
			if not resultado.hayPalabra then
				if ( distanciaPalabra(palabra, palabradDeVocabulario) < distancia ) then
				begin
					resultado.hayPalabra := true;
					resultado.palabra := palabradDeVocabulario;
				end
		end;
end;

procedure masCercana(vocabulario: TipoVocabulario; palabra: TipoPalabra; var resultado: TipoPalabra; var distancia: TipoDistancia);
var 
	i: integer;
	palabradDeVocabulario: TipoPalabra;
begin
	resultado.hayPalabra:= false;
	for i:=1 to MaxVocabulario do
		begin
			palabradDeVocabulario = vocabulario[i];
			if ( distanciaPalabra(palabra, palabradDeVocabulario) < distancia ) then
				if resultado.hayPalabra then
					if ( distanciaPalabra(palabra, palabradDeVocabulario) < distanciaPalabra(palabra, resultado.palabra) ) then
						begin
							resultado.palabra := palabradDeVocabulario
							distancia := distanciaPalabra(palabra, palabradDeVocabulario);
						end
					else
						begin
							resultado.hayPalabra := true;
							resultado.palabra := palabradDeVocabulario;
						end
		end;
end;

function pertenecePalabra(palabra: TipoPalabra; vocabulario: TipoVocabulario): boolean;
var 
	i: integer;
	j: integer;
begin
	while i <= MaxVocabulario and (palabra.largo <> vocabulario.[i].largo or palabra.largo = vocabulario[i].largo) do
	begin
		if palabra.largo = vocabulario[i].largo then
			while j <= palabra.largo and (palabra.info[j] = vocabulario[i].info[j]) do
				j := j+1;
			if j = palabra.largo + 1 then
				pertenecePalabra := true;
			j := 1;
		i = i + 1;
	end;
	if i = MaxVocabulario + 1 then
		pertenecePalabra := false;
end;

function completarPalabra(prefijo: TipoPalabra; vocabulario: TipoVocabulario): ListaPalabras;
var
	resultado: ListaPalabras;
	i: integer;
	auxPointer: ListaPalabras;
	palabradDeVocabulario: TipoPalabra;
begin
	resultado: nil;
	for i := 1 to MaxVocabulario do
		palabradDeVocabulario := vocabulario[i];
		if esPrefijo(prefijo, palabradDeVocabulario) then
			if resultado = nil then
				begin
					new(resultado);
					resultado^.info := palabradDeVocabulario;
					auxPointer := resultado;
				end;
			else
				begin
					new(auxPointer^sig);
					auxPointer := auxPointer^sig;
					auxPointer^.info := palabradDeVocabulario;
				end;
	completarPalabra := resultado;
end;

function estanTodas(lista: ListaPalabras; vocabulario: TipoVocabulario): boolean;
begin
end;
{///////////////////////////////////////////////////////////////////////////////////////////////////////}


procedure MostrarPalabra(pal : TipoPalabra);
{ Despliega palabra en la salida entre comillas
  No cambia de línea
}
var
   i : integer;
begin
   write('"');
   for i:= 1 to pal.largo do
	  write(pal.info[i]);
   write('" ');
end;

procedure mostrarPosiblePalabra (ppal : PosiblePalabra);
begin
   if ppal.hayPalabra then
	  mostrarPalabra(ppal.palabra)
   else
	  write('## no se encontró palabra ##')
	  
end;

procedure MostrarListaPalabras(lista : ListaPalabras);
{ muestra lista de palabras en la salida }
begin
   write('[');
   while (lista <> nil) do
   begin
	  MostrarPalabra(lista^.info);
	  lista:= lista^.sig
   end;
   write(']')
end;


procedure BorrarLista(var l : ListaPalabras);
{ vacía una lista de palabras 
  deja la lista en nill}
var
   q : ListaPalabras;
begin
   while l <> nil do
   begin
	  q:= l;
	  l:= l^.sig;
	  dispose(q)
   end;
end;


procedure LeerPalabra(var pal : TipoPalabra);
{ Lee una palabra de la entrada.
  La palabra termina con eol.
 Caracteres fuera de ['a'..'z'] se ignoran.
}
var
   i   : integer;
   car : char;
begin
   i:= 0;
   while not eoln do
   begin
	  read(car);
	  if ('a' <= car) and (car <= 'z') then
	  begin
	 i:= i + 1;
	 pal.info[i]:= car;
	  end

   end;
   readln;
   pal.largo:= i
end;

procedure AgregarPrincipio(palabra : TipoPalabra; var l : ListaPalabras);
{ agrega una palabra al principio de una lista }
var
   p : ListaPalabras;
begin
   new(p);
   p^.info:= palabra;
   p^.sig:= l;
   l:= p
end;

procedure LeerListaPalabras (var lista : ListaPalabras);
{ Lee una lista de palabras.
  Una palabra por línea.
  Termina con la palabra vacía.
  Las palabras se cargan en el orden inverso al ingresado. 
}
var
   palabra : TipoPalabra;
begin
   lista:= nil;
   LeerPalabra(palabra);
   while (palabra.largo <> 0) do
   begin
	  agregarPrincipio(palabra,lista);
	  LeerPalabra(palabra)
   end;
end;


procedure LeerVocabulario(var vocabulario : TipoVocabulario);
{ carga el vocabulario desde un archivo 
  El nombre del archivo viene "cableado" más abajo
}
var
   ff : Text;
   i  : integer;
   
   procedure leerPalLinea(var ff : Text; var palabra : TipoPalabra);
   var
	  i : integer;
   begin
	  with palabra do
	  begin
	 i:= 0;
	 repeat
		i:= i+1;
		read(ff,info[i])
	 until eoln(ff);
	 readln(ff);
	 largo:= i;
	  end;	 
   end;  

begin
   { nombre del archivo }
   assign(ff,'vocabulario.txt');
   reset(ff);
   for i:= 1 to MaxVocabulario do
	  leerPalLinea(ff,vocabulario[i]);
   close(ff)
end;  {LeerVocabulario}

type
   TipoComando = (igualp, pref, pertp, paldist, mascerc, compl, todas, salir, error);
   Comando = record case com: TipoComando  of
		   igualp,    
		   pref       : (pal1,pal2 : TipoPalabra);
		   pertp,    
		   compl,
		   mascerc    : (pal3 : TipoPalabra);
		   paldist    : (pal4 : TipoPalabra; dist    : integer);
		   todas      : (lista : ListaPalabras);
		   salir,
			   error      : ();
		 end;

procedure LeerComando(var cmd : Comando);
{ lectura de operación }
var num : integer;
begin
   { menu }
   writeln('1 - igualPalabra');
   writeln('2 - esPrefijo');
   writeln('3 - pertenecePalabra');
   writeln('4 - palabraADistancia');
   writeln('5 - masCercana');
   writeln('6 - completarPalabra');
   writeln('7 - estanTodas');
   writeln('8 - salir');
   writeln;

   { lectura de código }
   write('Opcion: ');
   readln(num);
   if (num < 9) and (num > 0) then
   begin
	  cmd.com := TipoComando(num-1);
	  case num of
	1,2 :   begin
			 write('Primera Palabra : ');
			 LeerPalabra(cmd.pal1);
			 Write('Segunda Palabra: ');
			 LeerPalabra(cmd.pal2)
			end;
	3,5,6 :  begin
			write('Palabra: ');
			LeerPalabra(cmd.pal3)
		 end;
	4     : begin
		   write('Palabra: ');
		   LeerPalabra(cmd.pal4);
		   write('Distancia: ');
		   readln(cmd.dist)
		end;
	7  :    begin
		   writeln('ingrese palabras, una por línea; termina con palabra vacía');
		   LeerListaPalabras(cmd.lista)
		end;
	  end;
   end
   else cmd.com:= error;
end;

var
   vv        : TipoVocabulario;
   cmd       : Comando;
   palabra   : TipoPalabra;
   pal_o_no  : PosiblePalabra;
   distancia : TipoDistancia;
   lista     : ListaPalabras;
begin
   LeerVocabulario(vv);
   LeerComando(cmd);
   while (cmd.com <> salir) do
   begin
	  write('--> ');
	  case cmd.com of
	igualp :  writeln(igualPalabra(cmd.pal1,cmd.pal2));
	pref   :  writeln(esPrefijo(cmd.pal1,cmd.pal2));
	pertp  :  writeln(pertenecePalabra(cmd.pal3,vv));
	paldist : begin
			 palabraADistancia(cmd.pal4,vv,cmd.dist,pal_o_no);
			 mostrarPosiblePalabra(pal_o_no);
			 writeLn
		  end;
	mascerc : begin
			 masCercana(vv,cmd.pal3,palabra,distancia);
			 mostrarPalabra(palabra);
			 writeln(distancia)
		  end;

	compl   : begin
			 lista:= completarPalabra(cmd.pal3,vv);
			 MostrarListaPalabras(lista);
			 borrarLista(lista);
			 writeLn
		  end;
	todas   : writeLn(estanTodas(cmd.lista,vv));
	error   : writeln('error');
	  end;
	  LeerComando(cmd);
   end;
	

end.
