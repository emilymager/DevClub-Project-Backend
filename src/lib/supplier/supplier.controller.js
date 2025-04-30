
import Supplier from './supplier.model';


async function createSupplier(req, res) {
    try {
        const { supplierType, rank, description } = req.body;

        const supplier = new Supplier({
            supplierType,
            rank,
            description
        });

        await supplier.save();

        res.status(201).json({ message: 'Supplier created successfully', supplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create supplier' });
    }
}

async function getAllSuppliers(req, res) {
    try {
        const suppliers = await Supplier.find();
        res.status(200).json(suppliers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch suppliers' });
    }
}
async function getSupplierById(req, res) {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json(supplier);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch supplier' });
    }
}

async function updateSupplier(req, res) {
    try {
        const { id } = req.params;
        const { supplierType, rank, description } = req.body;


        const supplier = await Supplier.findById(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }


        supplier.supplierType = supplierType || supplier.supplierType;
        supplier.rank = rank || supplier.rank;
        supplier.description = description || supplier.description;


        await supplier.save();

        res.status(200).json({ message: 'Supplier updated successfully', supplier });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update supplier' });
    }
}

async function deleteSupplier(req, res) {
    try {
        const { id } = req.params;

        const supplier = await Supplier.findByIdAndDelete(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete supplier' });
    }
}

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};