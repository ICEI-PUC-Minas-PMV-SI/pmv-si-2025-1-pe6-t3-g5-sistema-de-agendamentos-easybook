CREATE TABLE IF NOT EXISTS appointments (
  id VARCHAR(36) PRIMARY KEY,
  clientId VARCHAR(255) NOT NULL,
  professionalId VARCHAR(255) NOT NULL,
  serviceId VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL
);
