export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ChatMessage: {
        Row: {
          content: string
          createdAt: string
          id: string
          role: string
          sessionId: string
        }
        Insert: {
          content: string
          createdAt?: string
          id: string
          role: string
          sessionId: string
        }
        Update: {
          content?: string
          createdAt?: string
          id?: string
          role?: string
          sessionId?: string
        }
        Relationships: [
          {
            foreignKeyName: "ChatMessage_sessionId_fkey"
            columns: ["sessionId"]
            isOneToOne: false
            referencedRelation: "ChatSession"
            referencedColumns: ["id"]
          },
        ]
      }
      ChatSession: {
        Row: {
          createdAt: string
          id: string
          title: string
        }
        Insert: {
          createdAt?: string
          id: string
          title: string
        }
        Update: {
          createdAt?: string
          id?: string
          title?: string
        }
        Relationships: []
      }
      DrugCalculation: {
        Row: {
          createdAt: string
          dosage: number
          drugName: string
          id: string
          notes: string | null
          patientWeight: number
          unit: string
        }
        Insert: {
          createdAt?: string
          dosage: number
          drugName: string
          id: string
          notes?: string | null
          patientWeight: number
          unit: string
        }
        Update: {
          createdAt?: string
          dosage?: number
          drugName?: string
          id?: string
          notes?: string | null
          patientWeight?: number
          unit?: string
        }
        Relationships: []
      }
      GrowthRecord: {
        Row: {
          age: number
          bmi: number | null
          date: string
          height: number | null
          id: string
          notes: string | null
          weight: number | null
        }
        Insert: {
          age: number
          bmi?: number | null
          date?: string
          height?: number | null
          id: string
          notes?: string | null
          weight?: number | null
        }
        Update: {
          age?: number
          bmi?: number | null
          date?: string
          height?: number | null
          id?: string
          notes?: string | null
          weight?: number | null
        }
        Relationships: []
      }
      NelsonContent: {
        Row: {
          chapter: string
          chunk_id: string
          content: string
        }
        Insert: {
          chapter: string
          chunk_id: string
          content: string
        }
        Update: {
          chapter?: string
          chunk_id?: string
          content?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
