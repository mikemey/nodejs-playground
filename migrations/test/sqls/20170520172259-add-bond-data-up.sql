DROP PROCEDURE IF EXISTS create_bond_data;
CREATE PROCEDURE create_bond_data()
BEGIN
    DECLARE x, y, current_cid INT;
    SET x = 1;
    
    WHILE x <= 10 DO
        SELECT id INTO current_cid FROM company where name = CONCAT("company_name_", x);
        
        SET y = 1;
        WHILE y <= 3 DO
            INSERT INTO bond (title, constr_budget, ext_rate, sp_rating, issue_dt, rollover_time, company_id)
            VALUES (
                CONCAT("bond_title_", x),
                RAND() * 100000, RAND(),
                'B', CURDATE(), NOW(),
                current_cid
            );
            SET y = y + 1;
        END WHILE;
        SET x = x + 1; 
    END WHILE;
END;
CALL create_bond_data();