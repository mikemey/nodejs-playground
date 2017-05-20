DROP PROCEDURE IF EXISTS create_company_data;
CREATE PROCEDURE create_company_data()
BEGIN
    DECLARE x INT;
    SET x = 1;
 
    WHILE x <= 50 DO
        INSERT INTO company (name, corp_no, corp_incorp)
        VALUES (
            CONCAT("company_name_", x),
            RAND() * 100000,
            NOW()
        );
        SET x = x + 1; 
    END WHILE;
END;
CALL create_company_data();