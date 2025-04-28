import { Request, Response } from 'express'
import { db } from '../database/models'

/**
 * Question Controller class
 */
export default class QuestionController {
  /**
   * Create a new question
   */
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, body, userId, topicIds } = req.body

      const question = await db.Question.create({ title, body, userId })

      if (topicIds && topicIds.length > 0) {
        await question.setTopics(topicIds) // Sequelize magic method
      }

      return res.status(201).json({ message: 'Question created successfully', question })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Get a specific question
   */
  static async getOne(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const question = await db.Question.findByPk(id, {
        include: [{ model: db.Topic, through: { attributes: [] } }, db.Answer],
      })

      if (!question) {
        return res.status(404).json({ message: 'Question not found' })
      }

      return res.status(200).json(question)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Get all questions
   */
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const questions = await db.Question.findAll({
        include: [{ model: db.Topic, through: { attributes: [] } }],
      })
      return res.status(200).json(questions)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Update a question
   */
  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { title, body, topicIds } = req.body

      const question = await db.Question.findByPk(id)
      if (!question) {
        return res.status(404).json({ message: 'Question not found' })
      }

      await question.update({ title, body })

      if (topicIds) {
        await question.setTopics(topicIds)
      }

      return res.status(200).json({ message: 'Question updated successfully', question })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Delete a question
   */
  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const question = await db.Question.findByPk(id)
      if (!question) {
        return res.status(404).json({ message: 'Question not found' })
      }

      await question.destroy()

      return res.status(200).json({ message: 'Question deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }
}
