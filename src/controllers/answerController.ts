import { Request, Response } from 'express'
import { db } from '../database/models'

/**
 * Answer Controller class
 */
export default class AnswerController {
  /**
   * Create a new answer
   */
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { body, userId, questionId } = req.body

      const answer = await db.Answer.create({ body, userId, questionId })

      return res.status(201).json({ message: 'Answer created successfully', answer })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Get a specific answer
   */
  static async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const answer = await db.Answer.findByPk(id)

      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' })
      }

      return res.status(200).json(answer)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Update an answer
   */
  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { body } = req.body

      const answer = await db.Answer.findByPk(id)
      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' })
      }

      await answer.update({ body })

      return res.status(200).json({ message: 'Answer updated successfully', answer })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Delete an answer
   */
  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const answer = await db.Answer.findByPk(id)
      if (!answer) {
        return res.status(404).json({ message: 'Answer not found' })
      }

      await answer.destroy()

      return res.status(200).json({ message: 'Answer deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }
}
