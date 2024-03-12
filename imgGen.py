import pandas as pd
from rdkit import Chem
from rdkit.Chem import Draw

# Function to generate molecular structure image and save it to disk
def generate_mol_image(smiles):

    images_paths = []
    for i, smile in enumerate(smiles):
        mol = Chem.MolFromSmiles(smile)
        if mol is not None:
            image_path = f"imgs/molecule_{i}.png"
            Draw.MolToFile(mol, image_path)
            images_paths.append(image_path)
        else:
            images_paths.append(None)
    return images_paths

# Read CSV file
csv_file_path = 'odorMolecules.csv'
data = pd.read_csv(csv_file_path)

# Add a new column for image paths
data['Image_Path'] = generate_mol_image(data['smiles'])

# Save the updated CSV file
updated_csv_file_path = 'updated2_odorMolecules.csv'
data.to_csv(updated_csv_file_path, index=False)
