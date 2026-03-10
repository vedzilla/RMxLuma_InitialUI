"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, X } from "lucide-react";

export interface ScheduleEntry {
  date: string;
  startTime: string;
  endTime: string;
  locationName: string;
  locationId?: string;
}

interface ScheduleBuilderProps {
  value: ScheduleEntry[];
  onChange: (entries: ScheduleEntry[]) => void;
}

const emptyEntry: ScheduleEntry = {
  date: "",
  startTime: "",
  endTime: "",
  locationName: "",
};

export function ScheduleBuilder({ value, onChange }: ScheduleBuilderProps) {
  function updateEntry(index: number, field: keyof ScheduleEntry, fieldValue: string) {
    const updated = value.map((entry, i) =>
      i === index ? { ...entry, [field]: fieldValue } : entry
    );
    onChange(updated);
  }

  function addEntry() {
    onChange([...value, { ...emptyEntry }]);
  }

  function removeEntry(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {value.map((entry, index) => (
        <Card key={index}>
          <CardContent>
            <div className="flex items-start gap-3">
              <div className="grid flex-1 grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="space-y-1.5">
                  <Label htmlFor={`schedule-date-${index}`}>Date</Label>
                  <Input
                    id={`schedule-date-${index}`}
                    type="date"
                    value={entry.date}
                    onChange={(e) => updateEntry(index, "date", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`schedule-start-${index}`}>Start time</Label>
                  <Input
                    id={`schedule-start-${index}`}
                    type="time"
                    value={entry.startTime}
                    onChange={(e) => updateEntry(index, "startTime", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`schedule-end-${index}`}>End time</Label>
                  <Input
                    id={`schedule-end-${index}`}
                    type="time"
                    value={entry.endTime}
                    onChange={(e) => updateEntry(index, "endTime", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`schedule-location-${index}`}>Location</Label>
                  <Input
                    id={`schedule-location-${index}`}
                    type="text"
                    placeholder="e.g. Student Union"
                    value={entry.locationName}
                    onChange={(e) => updateEntry(index, "locationName", e.target.value)}
                  />
                </div>
              </div>
              {value.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-6 shrink-0"
                  onClick={() => removeEntry(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      <Button type="button" variant="outline" size="sm" onClick={addEntry}>
        <Plus className="h-4 w-4" />
        Add another date
      </Button>
    </div>
  );
}
