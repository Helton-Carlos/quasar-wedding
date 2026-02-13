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

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function getSupplier(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const stmt = db.prepare("SELECT * FROM supplier WHERE id = ?");
    const supplier = stmt.get(id as string);

    if (!supplier) {
      res.status(404).json({ erro: "Fornecedor não encontrado" });
      return;
    }

    res.status(200).json({
      message: "Fornecedor encontrado com sucesso!",
      data: supplier,
    });
  } catch (error: any) {
    console.error("Erro ao buscar fornecedor:", error);

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

export async function deleteSupplier(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const stmt = db.prepare("DELETE FROM supplier WHERE id = ?");
    const result = stmt.run(id as string);

    if (result.changes === 0) {
      res.status(404).json({ erro: "Fornecedor não encontrado" });
      return;
    }

    res.status(200).json({
      message: "Fornecedor deletado com sucesso!",
    });
  } catch (error: any) {
    console.error("Erro ao deletar fornecedor:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}

export async function updateSupplier(req: Request<Supplier>, res: Response) {
  const { id } = req.params;
  const { name, categories, phone, price } = req.body;

  try {
    const stmt = db.prepare(
      "UPDATE supplier SET name = ?, categories = ?, phone = ?, price = ? WHERE id = ?",
    );

    const result = stmt.run(name, categories, phone, price, id);

    if (result.changes === 0) {
      res.status(404).json({ erro: "Fornecedor não encontrado" });
      return;
    }

    res.status(200).json({
      message: "Fornecedor atualizado com sucesso!",
      result,
    });
  } catch (error: any) {
    console.error("Erro ao atualizar fornecedor:", error);

    res.status(500).json({ erro: "Erro no servidor" });
  }
}
