export const scheduleCreateCommand = `
`;

export const timetableCreateCommand = `
CREATE TABLE IF NOT EXISTS timetable (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "name" TEXT    NOT NULL,
  "start_hour"   INTEGER NOT NULL,
  "start_minute" INTEGER NOT NULL,
  "end_hour"     INTEGER NOT NULL,
  "end_minute"   INTEGER NOT NULL,
  "location"     TEXT,
  "color"        TEXT    NOT NULL,
  "start_month"  INTEGER NOT NULL,
  "start_date"   INTEGER NOT NULL,
  "end_month"    INTEGER NOT NULL,
  "end_date"     INTEGER NOT NULL
);
`;

export const calendarCreateCommand = `
`;