import { Request, Response } from 'express';
import { z } from 'zod';

import { AppError } from '../utils/app-error';

export class ProductsController {
  index(request: Request, response: Response) {
    const { page, limit } = request.query;

    return response.send(`Página ${page} de ${limit}`);
  }

  create(request: Request, response: Response) {
    const bodySchema = z.object({
      name: z
        .string({
          required_error: 'Nome do produto é obrigatório'
        })
        .trim()
        .min(6, {
          message: 'Nome do produto deve ter no mínimo 6 caracteres'
        }),
      price: z
        .number({
          required_error: 'Preço do produto é obrigatório'
        })
        .positive({
          message: 'Preço do produto não pode ser negativo ou ser igual a zero'
        })
    });

    const { name, price } = bodySchema.parse(request.body);

    /* if (!name) {
      throw new AppError('Nome do produto é obrigatório');
    }

    if (name.trim().length < 6) {
      throw new AppError('Nome do produto deve ter no mínimo 6 caracteres');
    }

    if (!price) {
      throw new AppError('Preço do produto é obrigatório');
    }

    if (price < 0) {
      throw new AppError(
        'Preço do produto não pode ser negativo ou ser igual a zero'
      );
    } */

    // throw new Error('Erro de exemplo!');
    // throw new AppError('Erro ao tentar criar um produto ');

    return response.status(201).json({ name, price, user_id: request.user_id });
  }
}
