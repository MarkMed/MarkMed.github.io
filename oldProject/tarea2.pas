
{ InCo - Programación 1 }
{ Laboratorio 2019      }

{ esqueleto de archivo tarea2.pas a ser entregado}





var
	i: integer;
	prefijo: boolean;
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
			while (i <= pal1.largo) and (pal1.info[i] = pal2.info[i]) do
				i := i+1;
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
		sonIguales := false
	else
	begin
		i := 1;
        while (i <= pal1.largo) and (pal1.info[i] = pal2.info[i]) do
			i := i+1;
        if i <> (pal1.largo + 1) then
            sonIguales := false
        else
            sonIguales := true
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
			palabradDeVocabulario := vocabulario[i];
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
	for i:=1 to MaxVocabulario do
		begin
			palabradDeVocabulario := vocabulario[i];
			if ( distanciaPalabra(palabra, palabradDeVocabulario) < distancia ) then
				if ( distanciaPalabra(palabra, palabradDeVocabulario) < distanciaPalabra(palabra, resultado) ) then
					begin
						resultado:= palabradDeVocabulario;
						distancia := distanciaPalabra(palabra, palabradDeVocabulario);
					end
				else
					resultado:= palabradDeVocabulario
		end;
end;

function pertenecePalabra(palabra: TipoPalabra; vocabulario: TipoVocabulario): boolean;
var 
	i: integer;
	j: integer;
begin
	while (i <= MaxVocabulario) and ((palabra.largo <> vocabulario[i].largo) or (palabra.largo = vocabulario[i].largo)) do
	begin
		if (palabra.largo = vocabulario[i].largo) then
		begin
			while (j <= palabra.largo) and (palabra.info[j] = vocabulario[i].info[j]) do
				j := j+1;
			if (j = (palabra.largo + 1)) then
				pertenecePalabra := true;
			j := 1;
		end;
		i := i + 1;
	end;
	if i = MaxVocabulario + 1 then
		pertenecePalabra := false
end;

function completarPalabra(prefijo: TipoPalabra; vocabulario: TipoVocabulario): ListaPalabras;
var
	resultado: ListaPalabras;
	i: integer;
	auxPointer: ListaPalabras;
	palabradDeVocabulario: TipoPalabra;
begin
	resultado := nil;
	for i := 1 to MaxVocabulario do
		palabradDeVocabulario := vocabulario[i];
		if esPrefijo(prefijo, palabradDeVocabulario) then
			if resultado = nil then
				begin
					new(resultado);
					resultado^.info := palabradDeVocabulario;
					auxPointer := resultado;
				end
			else
				begin
					new(auxPointer^.sig);
					auxPointer := auxPointer^.sig;
					auxPointer^.info := palabradDeVocabulario;
				end;
	completarPalabra := resultado;
end;

function estanTodas(lista: ListaPalabras; vocabulario: TipoVocabulario): boolean;
var
	auxPointer: ListaPalabras;
	resultado: boolean;
begin
	resultado := false;
	if lista <> nil then
		begin
			auxPointer := lista;
			resultado := true;
			while (auxPointer <> nil) and (pertenecePalabra(auxPointer^.info, vocabulario)) do
				auxPointer := auxPointer^.sig;
			if auxPointer <> nil then
				resultado := false
		end;
	estanTodas := resultado
end;