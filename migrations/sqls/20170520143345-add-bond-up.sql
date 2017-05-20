CREATE TABLE bond (
     id INT NOT NULL AUTO_INCREMENT,
     title CHAR(200) NOT NULL,
     constr_budget NUMERIC(20,2),
     ext_rate NUMERIC(3, 3),
     sp_rating ENUM('A', 'B', 'C', 'D'),
     issue_dt DATE,
     rollover_time DATETIME,
     company_id INT NOT NULL,
     PRIMARY KEY (id),
     FOREIGN KEY (company_id) REFERENCES company(id)
);
