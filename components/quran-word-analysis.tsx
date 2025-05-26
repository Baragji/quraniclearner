import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

interface QuranWordAnalysisProps {
  arabic: string
  transliteration: string
  translation: string
  type: string
  root: string
}

export function QuranWordAnalysis({ arabic, transliteration, translation, type, root }: QuranWordAnalysisProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-arabic">{arabic}</p>
            <p className="text-xs text-muted-foreground italic">{transliteration}</p>
          </div>
          <Badge variant="outline">{type}</Badge>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Oversættelse:</span>
            <span className="text-sm">{translation}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Rod:</span>
            <span className="text-sm font-arabic">{root}</span>
          </div>
        </div>

        <div className="flex justify-between pt-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-book-open mr-1"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                Morfologi
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Morfologisk Analyse</h4>
                <p className="text-sm text-muted-foreground">Detaljeret analyse af ordets struktur og form.</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Form:</div>
                  <div>Substantiv / Singularis</div>
                  <div className="font-medium">Kasus:</div>
                  <div>Genitiv</div>
                  <div className="font-medium">Definit:</div>
                  <div>Ja (med Al-)</div>
                  <div className="font-medium">Køn:</div>
                  <div>Maskulinum</div>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-list-tree mr-1"
                >
                  <path d="M8 9h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8" />
                  <path d="M5 8v8" />
                  <path d="M8 17h12a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H8" />
                  <circle cx="5" cy="6" r="1" />
                  <circle cx="5" cy="16" r="1" />
                </svg>
                Syntaks
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium">Syntaktisk Rolle</h4>
                <p className="text-sm text-muted-foreground">Ordets grammatiske funktion i sætningen.</p>
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-medium">Rolle:</span> Subjekt / Objekt / Prædikat
                  </p>
                  <p>
                    <span className="font-medium">Relation:</span> Del af en genitiv konstruktion
                  </p>
                  <p>
                    <span className="font-medium">Position:</span> Begyndelsen af verset
                  </p>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
}
