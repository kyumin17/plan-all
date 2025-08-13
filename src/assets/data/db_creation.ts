export const tablegroupCreateCommand = `
CREATE TABLE IF NOT EXISTS "tablegroup" ( 
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL
);
`;

export const timetableCreateCommand2 = `
CREATE TABLE IF NOT EXISTS "timetable" ( 
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "group" INTEGER NOT NULL,
  "name" TEXT NOT NULL, 
  "day" INTEGER NOT NULL, 
  "start_hour" INTEGER NOT NULL, 
  "start_minute" INTEGER NOT NULL, 
  "end_hour" INTEGER NOT NULL, 
  "end_minute" INTEGER NOT NULL, 
  "location" TEXT, 
  "color" TEXT NOT NULL,
  "description" TEXT,
  FOREIGN KEY(group) REFERENCES tablegroup(id) ON DELETE CASCADE
);
`;

export const timetableCreateCommand = `
CREATE TABLE IF NOT EXISTS "timetable" ( 
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL, 
  "day" INTEGER NOT NULL, 
  "start_hour" INTEGER NOT NULL, 
  "start_minute" INTEGER NOT NULL, 
  "end_hour" INTEGER NOT NULL, 
  "end_minute" INTEGER NOT NULL, 
  "location" TEXT, 
  "color" TEXT NOT NULL,
  "description" TEXT
);
`;

export const calendarCreateCommand = `
CREATE TABLE IF NOT EXISTS "calendar" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL, 
  "start_hour" INTEGER, 
  "start_minute" INTEGER, 
  "end_hour" INTEGER, 
  "end_minute" INTEGER, 
  "location" TEXT, 
  "color" TEXT NOT NULL,
  "start_month" INTEGER NOT NULL, 
  "start_date" INTEGER NOT NULL, 
  "end_month" INTEGER NOT NULL, 
  "end_date" INTEGER NOT NULL, 
  "start_year" INTEGER NOT NULL, 
  "end_year" INTEGER NOT NULL, 
  "all_day" INTEGER NOT NULL,
  "description" TEXT
);
`;

export const todoCreateCommand = `
CREATE TABLE IF NOT EXISTS "todo" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT NOT NULL, 
  "color" TEXT NOT NULL,
  "year" INTEGER, 
  "month" INTEGER,
  "date" INTEGER, 
  "hour" INTEGER, 
  "minute" INTEGER, 
  "description" TEXT,
  "is_done" INTEGER
);
`;