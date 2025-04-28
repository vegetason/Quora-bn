import { Request, Response } from 'express'
import { db } from '../database/models'

/**
 * Topic Controller class
 */
export default class TopicController {
  /**
   * Create a new topic
   */
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, description } = req.body

      const topic = await db.Topic.create({ name, description })

      return res.status(201).json({ message: 'Topic created successfully', topic })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Get all topics
   */
  static async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const topics = await db.Topic.findAll()
      return res.status(200).json(topics)
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Update a topic
   */
  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const { name } = req.body

      const topic = await db.Topic.findByPk(id)
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' })
      }

      await topic.update({ name })

      return res.status(200).json({ message: 'Topic updated successfully', topic })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }

  /**
   * Delete a topic
   */
  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      const topic = await db.Topic.findByPk(id)
      if (!topic) {
        return res.status(404).json({ message: 'Topic not found' })
      }

      await topic.destroy()

      return res.status(200).json({ message: 'Topic deleted successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error', error })
    }
  }
}
