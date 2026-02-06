import { db } from "../db/database.js";
import type { Request, Response } from "express";
import type { Supplier } from "../types/suppliers.js";

export async function registerSupplier(req: Request<Supplier>, res: Response) {
  const { name, categories, phone, price } = req.body;

  try {
    const stmt = db.prepare(
      "INSERT INTO supplier (name, categories, phone, price) VALUES (?, ?, ?, ?)",
    );

    const result = stmt.run(name, categories, phone, price);

    res.status(201).json({
      message: "Fornecedor criado com sucesso!",
      result,
    });
  } catch (error: any) {
    console.error("Erro ao criar fornecedor:", error);

    if (error.message.includes("UNIQUE")) {
      res.status(409).json({ erro: "Email já cadastrado" });
      return;
    }

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function getAllSuppliers(_req: Request<Supplier>, res: Response) {
  try {
    const result = db.prepare("SELECT * FROM supplier").all();

    res.status(200).send({
      message: "Busca de fornecedores com sucesso!",
      data: result,
    });
  } catch (error: any) {
    console.error("Erro ao buscar fornecedores:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}
