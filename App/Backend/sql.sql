--1
CREATE TRIGGER TR_PUNTO_A ON PUNTUACIONES
INSTEAD OF
INSERT
AS
BEGIN
	
	DECLARE @_IDPARTICIPANTE  BIGINT
	SELECT @_IDPARTICIPANTE = IDPARTICIPANTE from inserted

	DECLARE @_CANTIDADXCONCURSO INT

	SELECT @_CANTIDADXCONCURSO = COUNT(IDCONCURSO) FROM WHERE IDCREADOR = @_IDPARCIPANTE 
	HAVING COUNT(IDCONCURSO) > 1

	BEGIN TRY

	IF @_CANTIDADXCONCURSO > 0 
	BEGIN
		RAISERROR('PARTICIPO MAS DE UNA VEZ EN UN MISMO CONCURSO',16,1)
	END
	ELSE
	BEGIN
		INSERT PUNTACIONES (IDPARTICIPANTE,IDFOTOGRAFIA, FECHA, PUNTAJE)
		SELECT I.IDPARTICIPANTE,I.IDFOTOGRAFIA, I.FECHA, I.PUNTAJE
		FROM inserted I
	END

	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
	END CATCH
END
GO

--2
CREATE TRIGGER TR_PUNTO_B ON FOTOGRAFIAS
INSTEAD OF
INSERT
AS
BEGIN
	DECLARE @_IDFOTOGRAFIAS BIGINT
	DECLARE @_IDCONCURSOS BIGINT
	DECLARE @_PUNTUACIONES DECIMAL(5,2)
	DECLARE @_RANKINMINIMO DECIMAL(5,2)
	DECLARE @_FECHAFIN DATE
	DECLARE @_FECHAINICIO DATE
	DECLARE @_CANTIDADXCONCURSO INT
	
	IF (SELECT ESTADO FROM inserted) = 0 
	BEGIN
		RAISERROR('EL RANKIN DEL USUARIO ES: 0',16,1)
	END
	ELSE
	BEGIN
		SELECT @_IDFOTOGRAFIAS = ID FROM inserted
		SELECT @_IDCONCURSOS = ID FROM inserted

		SELECT @_CANTIDADXCONCURSO = COUNT(IDCONCURSO) FROM FOTOGRAFIAS WHERE ID = @_IDFOTOGRAFIAS 
		HAVING COUNT(IDCONCURSO) > 1

		SELECT @_RANKINMINIMO = RANKINGMINIMO FROM CONCURSOS WHERE ID = @_IDCONCURSOS
		SELECT @_PUNTUACIONES = SUM(PUNTAJE) FROM IDFOTOGRAFIA = @_IDFOTOGRAFIAS

		SELECT @_FECHAINICIO = INICIO FROM CONCURSOS WHERE ID = @_IDCONCURSOS
		SELECT @_FECHAFIN = FIN FROM CONCURSOS WHERE ID = @_IDCONCURSOS

		BEGIN TRY

			IF GETDATE() >= @_FECHAINICIO AND GETDATE() <= @_FECHAFIN
			BEGIN
				IF @_PUNTUACIONES >= @_RANKINMINIMO 
				BEGIN
					IF @_CANTIDADXCONCURSO = 0
					BEGIN
						INSERT FOTOGRAFIAS (IDCREADOR,IDCONCURSO, TITULO, PUBLICACION, ESTADO)
						SELECT I.IDCREADOR,I.IDCONCURSO, I.TITULO, GETDATE(), 1
						FROM inserted I
					END
					ELSE
					BEGIN
						RAISERROR('PARTICIPO MAS DE UNA VEZ EN UN MISMO CONCURSO',16,1)
					END
				END
				ELSE
				BEGIN
					RAISERROR('NO CUMPLE CON EL RANKIN MINIMO',16,1)
				END
			END
			ELSE
			BEGIN
				RAISERROR('NO SE ENCUENTRA ENTRE LAS FECHAS DEL CONCURSO',16,1)
			END

		END TRY
		BEGIN CATCH
			PRINT ERROR_MESSAGE()
		END CATCH
	END
END
GO

--3
CREATE TRIGGER TR_PUNTO_C ON CONCURSOS
INSTEAD OF
DELETE
AS
BEGIN
	BEGIN TRY

		DECLARE @_IDCONCURSO BIGINT
		SELECT @_IDCONCURSO = ID FROM deleted

		UPDATE CONCURSOS SET ESTADO = 0 WHERE ID = @_IDCONCURSO 
		UPDATE FOTOGRAFIAS SET ESTADO = 0 WHERE IDCONCURSO = @_IDCONCURSO

	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
	END CATCH
END
GO

--4
CREATE PROCEDURE SP_PUNTO_D 
(
@_IDPARTICIPANTE BIGINT
)
AS
BEGIN

	BEGIN TRY

		SELECT TOP 3 
		B.TITULO AS 'NOMBRE CONCURSO',
		C.APELLIDO AS 'APELLIDO',
		C.NOMBRE AS 'NOMBRE',
		A.TITULO AS 'PUBLICACION',
		A.PUBLICACION AS 'FECHA',
		(SELECT AVG(PUNTAJE) FROM PUNTACIONES WHERE IDFOTOGRAFIA = A.ID) AS 'PUNTAJE'
	
		FROM FOTOGRAFIAS A
		INNER JOIN CONCURSOS B ON B.ID = A.IDCONCURSO
		INNER JOIN PARTICIPANTES C ON C.ID = @_IDPARTICIPANTE
		WHERE A.IDCREADOR = @_IDPARTICIPANTE AND ESTADO = 1 ORDER BY PUNTAJE DESC

	END TRY
	BEGIN CATCH
		PRINT ERROR_MESSAGE()
	END CATCH
END
GO