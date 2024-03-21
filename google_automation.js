function importCSVFromGoogleDrive() {
  var fileName = 'YOUR_CSV_FILE_NAME.csv'; // Replace with your actual CSV file name
  var destinationSpreadsheetId = 'YOUR_DESTINATION_SPREADSHEET_ID'; // Replace with your destination spreadsheet ID
  var destinationSheetName = 'DESTINATION_SHEET_NAME'; // Replace with your destination sheet name

  // Find the CSV file by name
  var files = DriveApp.getFilesByName(fileName);
  if (!files.hasNext()) {
    Logger.log('No files found.');
    return;
  }

  var file = files.next();
  var csvData = Utilities.parseCsv(file.getBlob().getDataAsString());

  // Open the destination spreadsheet and sheet
  var destinationSpreadsheet = SpreadsheetApp.openById(destinationSpreadsheetId);
  var sheet = destinationSpreadsheet.getSheetByName(destinationSheetName);

  // Clear the existing data in the destination sheet
  sheet.clear();

  // Set the new data from the CSV file
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}
