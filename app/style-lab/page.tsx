import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export default function StyleLabPage() {
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}

        <header className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            PROJECT ECHO
          </p>

          <h1 className="font-mono text-2xl uppercase tracking-[0.12em] text-primary">
            Design System
          </h1>

          <p className="max-w-2xl text-sm text-muted-foreground">
            Internal visual component laboratory.
          </p>
        </header>

        <Separator />

        {/* Buttons */}

        <section className="space-y-4">
          <SectionTitle title="Buttons" />

          <div className="flex flex-wrap gap-3">
            <Button>
              Access System
            </Button>

            <Button variant="secondary">
              Open File
            </Button>

            <Button variant="outline">
              View Logs
            </Button>

            <Button variant="ghost">
              Cancel
            </Button>

            <Button variant="destructive">
              Shut Down
            </Button>
          </div>
        </section>

        {/* Inputs */}

        <section className="space-y-4">
          <SectionTitle title="Inputs" />

          <div className="max-w-md space-y-2">
            <label
              htmlFor="password"
              className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground"
            >
              System Password
            </label>

            <Input
              id="password"
              placeholder="ENTER PASSWORD..."
              className="font-mono"
            />
          </div>
        </section>

        {/* Status */}

        <section className="space-y-4">
          <SectionTitle title="Status" />

          <div className="flex flex-wrap gap-3">
            <Badge>ONLINE</Badge>

            <Badge variant="secondary">
              PROCESSING
            </Badge>

            <Badge variant="outline">
              WARNING
            </Badge>

            <Badge variant="destructive">
              ERROR
            </Badge>
          </div>
        </section>

        {/* Panels */}

        <section className="space-y-4">
          <SectionTitle title="Panel" />

          <div className="max-w-xl rounded-lg border bg-card p-5">
            <div className="space-y-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  System Status
                </p>

                <p className="mt-2 font-mono text-sm text-primary">
                  SYSTEM ONLINE
                </p>
              </div>

              <Separator />

              <div className="space-y-2 font-mono text-xs text-muted-foreground">
                <p>
                  CORE ............... <span className="text-primary">ACTIVE</span>
                </p>

                <p>
                  MEMORY ............. <span className="text-primary">68%</span>
                </p>

                <p>
                  SECURITY ........... <span className="text-destructive">WARNING</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Terminal */}

        <section className="space-y-4">
          <SectionTitle title="Terminal" />

          <div className="max-w-3xl border bg-card font-mono text-xs">
            <div className="flex items-center justify-between border-b px-3 py-2">
              <span className="text-muted-foreground">
                ECHO TERMINAL
              </span>

              <span className="text-primary">
                ● ONLINE
              </span>
            </div>

            <div className="space-y-2 p-5">
              <p className="text-muted-foreground">
                CONNECTION ESTABLISHED...
              </p>

              <p className="text-primary">
                ECHO CORE READY
              </p>

              <p className="text-muted-foreground">
                &gt;_
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
      // {title}
    </h2>
  )
}