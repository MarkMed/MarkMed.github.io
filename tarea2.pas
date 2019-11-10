
{ InCo - Programación 1 }
{ Laboratorio 2019      }

{ esqueleto de archivo tarea2.pas a ser entregado}




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
		while i <= pal1.largo and pal1.info[i] = pal2.info[i] do
			i = i+1;
		if i = (pal1.largo + 1) then
			esPrefijo := prefijo;
		else
			prefijo := false;
			esPrefijo := prefijo;
end;

function igualPalabra(pal1,pal2: TipoPalabra): boolean;
var
	i: integer;
	sonIguales: boolean;
begin
	if pal1.largo <> pal2.largo then
		sonIguales := false;
	else
		i := 1;
        while i <= pal1.largo and pal1.info[i] = pal2.info[i] do
			i = i+1;
        if i <> (pal1.largo + 1) then
            sonIguales := false;
        else
            sonIguales := true;
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
				resultado.hayPalabra := true;
				resultado.palabra := palabradDeVocabulario;
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
					resultado.hayPalabra := true;
					resultado.palabra := palabradDeVocabulario;
	end;
end;

function pertenecePalabra(palabra: TipoPalabra; vocabulario: TipoVocabulario): boolean;
begin
end;

function completarPalabra(prefijo: TipoPalabra; vocabulario: TipoVocabulario): ListaPalabras;
begin
end;

function estanTodas(lista: ListaPalabras; vocabulario: TipoVocabulario): boolean;
begin
end;