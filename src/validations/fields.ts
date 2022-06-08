import { validationResult } from 'express-validator';
import { check } from 'express-validator';

export const filterByAuthorFieldsValidation=[
  check('author').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario especificar un autor').isString().isLength({min:1}).withMessage('Autor invalido, debe tener por lo menos 1 caracteres')
];

export const filterByTitleFieldsValidation=[
  check('title').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario especificar un titulo').isString().isLength({min:3}).withMessage('titulo invalido, debe tener por lo menos 3 caracteres'),
];

export const filterByDateFieldsValidation=[
  check('date').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario especificar una fecha').isString().withMessage('Debe ser una fecha'),
];

export const filterByTagFieldsValidation=[
  check('tag').notEmpty({ ignore_whitespace: true }).withMessage('Es necesario especificar un tag').isString().isLength({min:3}).withMessage('tag invalido, debe tener por lo menos 3 caracteres'),
];

export const filterCommentsFiledsValidation=[
  check('author').optional().notEmpty({ ignore_whitespace: true }).withMessage('Es necesario especificar un autor').isString().isLength({min:1}).withMessage('Autor invalido, debe tener por lo menos 1 caracteres'),
  check('tags').optional().notEmpty({ ignore_whitespace: true }).withMessage('Es necesario especificar un tag').isArray().withMessage('tag invalido, debe tener por lo menos 3 caracteres'),
];

export const filterStorysFiledsValidation=[
  check('author').optional().notEmpty({ ignore_whitespace: true }).withMessage('Es necesario especificar un autor').isString().isLength({min:1}).withMessage('Autor invalido, debe tener por lo menos 1 caracteres'),
  check('title').optional().notEmpty({ ignore_whitespace: true }).withMessage('Es necesario especificar un titulo').isString().isLength({min:3}).withMessage('titulo invalido, debe tener por lo menos 3 caracteres'),
];

export const checkResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      status: 400,
      message: 'Error en datos enviados',
      error: errors.array()[0],
    });
  } else {
    next();
  }
};
