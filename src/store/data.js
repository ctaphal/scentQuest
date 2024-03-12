// Function to read and process CSV data
import Papa from 'papaparse';

// Function to read and process CSV data
export async function processCsvData() {
  try {
    // Read CSV file (example using fetch for client-side)
    const response = await fetch('/scentQuest/odorMolecules.csv');
    if (!response.ok) {
      throw new Error('Failed to fetch CSV data');
    }
    const csvString = await response.text();
    
    // Parse CSV string into array of objects using PapaParse
    const { data: csvData } = Papa.parse(csvString, { header: true });

    return csvData;
  } catch (error) {
    console.error('Error processing CSV data:', error);
    return null;
  }
}
