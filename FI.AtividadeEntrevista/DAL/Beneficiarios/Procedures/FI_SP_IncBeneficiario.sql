﻿CREATE PROC FI_SP_IncBeneficiario
    @CPF           VARCHAR (20),
	@NOME          VARCHAR (50),
    @IDCLIENTE     VARCHAR (255)
	
AS
BEGIN
	INSERT INTO BENEFICIARIOS (NOME, CPF, IDCLIENTE) 
	VALUES (@NOME, @CPF, @IDCLIENTE)

	SELECT SCOPE_IDENTITY()
END