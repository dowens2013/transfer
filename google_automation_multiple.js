// Define a list of files and their destinations
var filesAndDestinations = [
  {
    csvFileName: 'first-file-name.csv',
    destinationSpreadsheetId: 'first-destination-spreadsheet-ID',
    destinationSheetName: 'first-destination-sheet-name'
  },
  {
    csvFileName: 'second-file-name.csv',
    destinationSpreadsheetId: 'second-destination-spreadsheet-ID',
    destinationSheetName: 'second-destination-sheet-name'
  }
  // ... Add more file and destination pairs as needed
];

// Function to process and import a single CSV file to a specified sheet
function processCSVFile(csvFileName, destinationSpreadsheetId, destinationSheetName) {
  var files = DriveApp.getFilesByName(csvFileName);
  if (!files.hasNext()) {
    Logger.log('No files found with the name: ' + csvFileName);
    return;
  }

  var file = files.next();
  var blob = file.getBlob();
  var contentType = blob.getContentType();

  // Check if the file is a CSV
  if (contentType !== 'text/csv' && contentType !== 'application/vnd.ms-excel') {
    Logger.log('File is not a CSV: ' + contentType);
    return;
  }

  // Parse the CSV data
  var csvData = Utilities.parseCsv(blob.getDataAsString());

  // Open the destination spreadsheet and sheet
  var destinationSpreadsheet = SpreadsheetApp.openById(destinationSpreadsheetId);
  var sheet = destinationSpreadsheet.getSheetByName(destinationSheetName);

  // Clear the existing data in the destination sheet
  sheet.clear();

  // Set the new data from the CSV file
  sheet.getRange(1, 1, csvData.length, csvData[0].length).setValues(csvData);
}

// Main function to loop over all files and process them
function importMultipleCSVs() {
  filesAndDestinations.forEach(function(fileDest) {
    processCSVFile(fileDest.csvFileName, fileDest.destinationSpreadsheetId, fileDest.destinationSheetName);
  });
}

// You can now call importMultipleCSVs to run the operation for all the files
importMultipleCSVs(); // This is the entry point to process all CSVs
