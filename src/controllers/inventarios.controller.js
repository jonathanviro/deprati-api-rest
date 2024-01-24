import { pool } from '../db.js';

export const getInventarios = async (req, res) => {
    const sql = `SELECT * FROM inventarios`;

    try {
        const {rows} = await pool.query(sql);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: `Ha ocurrido un error -> ${error}`,
        });
    }
};

export const getInventario = async (req, res) => {
    const sql = `SELECT * FROM inventarios WHERE codigo_producto = ?`;

    try {
        const { id } = req.params;
        
        const {rows} = await pool.query(sql, [id]);

        if (rows.length <= 0) {
            return res.json({
                message: `Inventario no encontrada`,
            });
        }

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message: `Ha ocurrido un error -> ${error}`,
        });
    }
};

export const getInventariosByLocal = async (req, res) => {
    const { codigoLocal } = req.query;

    try {
        const query = {
            text: 'SELECT * FROM inventarios WHERE codigo_local = $1',
            values: [codigoLocal],
          }

        const {rows} = await pool.query(query);
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: `Ha ocurrido un error -> ${error}`,
        });
    }
};

export const createInventario = async (req, res) => {
    const sqlValidarEmpresa = `SELECT * FROM empresas WHERE nombre = ?`;
    const sqlInsertar = 'INSERT INTO inventarios (nombre, personaEncargada, telefono, correo) VALUES (?, ?, ?, ?)';

    try {
        const { nombre, personaEncargada, telefono, correo } = req.body;

        const {rows} = await pool.query(sqlValidarEmpresa, [nombre]);

        if (rows.length > 0) {
            return res.json({
                message: `La empresa ${nombre} ya se encuentra creada o se encuentra inactiva`,
            });
        }

        const [result] = await pool.query(sqlInsertar, [nombre, personaEncargada, telefono, correo]);

        res.json({
            idEmpresa: result.insertId,
            nombre,
            personaEncargada,
            telefono,
            correo,
        });
    } catch (error) {
        res.status(500).json({
            message: `Ha ocurrido un error -> ${error}`,
        });
    }
};

export const updateInventario = async (req, res) => {
    const sqlObtenerDatosEmpresa = `SELECT * FROM empresas WHERE idEmpresa = ? AND estado = "S"`;
    const sqlUpdate = `UPDATE inventarios SET personaEncargada = IFNULL(?, personaEncargada) ,  telefono = IFNULL(?, telefono), correo = IFNULL(?, correo) WHERE idEmpresa = ? AND estado = "S"`;

    try {
        const { id } = req.params;
        const { personaEncargada, telefono, correo } = req.body;

        const [result] = await pool.query(sqlUpdate, [personaEncargada, telefono, correo, id]);

        if (result.affectedRows <= 0) {
            return res.json({
                message: 'Empresa no encontrada',
            });
        }

        const {rows} = await pool.query(sqlObtenerDatosEmpresa, [id]);

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message: `Ha ocurrido un error -> ${error}`,
        });
    }
};

export const deleteInventario = async (req, res) => {
    const sql = 'DELETE FROM inventarios WHERE idEmpresa = ?';

    try {
        const { id } = req.params;
        const [result] = await pool.query(sql, [id]);

        if (result.affectedRows <= 0) {
            return res.json({
                message: 'Empresa no encontrada',
            });
        }

        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({
            message: `Ha ocurrido un error -> ${error}`,
        });
    }
};

export const inactivarInventario = async (req, res) => {
    const sqlObtenerDatosEmpresa = `SELECT * FROM empresas WHERE idEmpresa = ?`;
    const sqlUpdate = `UPDATE inventarios SET estado = "N" WHERE idEmpresa = ?`;

    try {
        const { id } = req.params;

        const [result] = await pool.query(sqlUpdate, [id]);

        if (result.affectedRows <= 0) {
            return res.json({
                message: 'Empresa no encontrada',
            });
        }

        const {rows} = await pool.query(sqlObtenerDatosEmpresa, [id]);

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            message: `Ha ocurrido un error -> ${error}`,
        });
    }
};
