// Function to read and process CSV data
export async function processCsvData() {
  try {
    // Read CSV file (example using fetch for client-side)
    const response = await fetch('/odorMolecules.csv');
    if (!response.ok) {
      throw new Error('Failed to fetch CSV data');
    }
    const csvString = await response.text();
    
    // Process CSV string into array of objects
    const csvData = csvString.split('\n').map(line => {
      const [smiles, principal_name, primary_descriptor, second_descriptor, third_descriptor, cas, odor_x, odor_y, structure_x, structure_y] = line.split(',');
      return { smiles, principal_name, primary_descriptor, second_descriptor, third_descriptor, cas, odor_x, odor_y, structure_x, structure_y };
    });

    return csvData;
  } catch (error) {
    console.error('Error processing CSV data:', error);
    return null;
  }
}
