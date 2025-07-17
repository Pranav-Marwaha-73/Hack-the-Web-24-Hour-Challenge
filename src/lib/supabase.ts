import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          role: 'student' | 'instructor' | 'admin'
          avatar_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          role: 'student' | 'instructor' | 'admin'
          avatar_url?: string
        }
        Update: {
          full_name?: string
          avatar_url?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          instructor_id: string
          price: number
          duration: string
          level: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          description: string
          instructor_id: string
          price: number
          duration: string
          level: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url?: string
        }
        Update: {
          title?: string
          description?: string
          price?: number
          duration?: string
          level?: 'beginner' | 'intermediate' | 'advanced'
          thumbnail_url?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          progress: number
          enrolled_at: string
          completed_at?: string
        }
        Insert: {
          student_id: string
          course_id: string
          progress?: number
        }
        Update: {
          progress?: number
          completed_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string
          location: string
          max_participants: number
          current_participants: number
          image_url?: string
          created_at: string
        }
        Insert: {
          title: string
          description: string
          event_date: string
          location: string
          max_participants: number
          image_url?: string
        }
        Update: {
          title?: string
          description?: string
          event_date?: string
          location?: string
          max_participants?: number
          current_participants?: number
          image_url?: string
        }
      }
    }
  }
}