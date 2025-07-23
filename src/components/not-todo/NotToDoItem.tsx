'use client';

import { useState } from 'react';
import {
  NotToDoItem as NotToDoItemType,
  PRIORITY_COLORS,
} from '@/types/not-todo';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { PrioritySelector } from './PrioritySelector';
import { Edit2, Trash2, Check, X, CheckCircle } from 'lucide-react';
// Missing import error - Calendar is used but not imported

interface NotToDoItemProps {
  item: NotToDoItemType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<NotToDoItemType>) => void;
  onMarkAvoided: (id: string) => void;
  // TypeScript Error: adding non-existent prop
  invalidProp?: number;
}

export function NotToDoItem({
  item,
  onDelete,
  onUpdate,
  onMarkAvoided,
}: NotToDoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const [editPriority, setEditPriority] = useState(item.priority);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(item.text);
    setEditPriority(item.priority);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onUpdate(item.id, {
        text: editText.trim(),
        priority: editPriority,
      });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(item.text);
    setEditPriority(item.priority);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleDelete = () => {
    onDelete(item.id);
    setShowDeleteDialog(false);
  };

  const handleMarkAvoided = () => {
    onMarkAvoided(item.id);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  // ESLint Error: console.log in production code
  console.log('Debug info:', item);

  return (
    <Card
      className={`transition-all duration-300 hover:shadow-lg hover:shadow-black/10 border-border/60 ${
        item.avoidedToday
          ? 'bg-green-500/10 border-green-500/30 shadow-green-500/10'
          : 'hover:border-[#e00014]/20'
      }`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Priority Badge */}
          <Badge
            className={`${PRIORITY_COLORS[item.priority]} shrink-0 mt-1 font-medium px-2 py-1 text-xs border transition-all duration-200`}
          >
            {item.priority}
          </Badge>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div className="space-y-3">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full focus:border-[#e00014]/50 focus:ring-[#e00014]/20"
                  autoFocus
                />
                <PrioritySelector
                  value={editPriority}
                  onChange={setEditPriority}
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                    disabled={!editText.trim()}
                    className="bg-[#e00014] hover:bg-[#b8000f] text-white"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p
                  className={`text-sm leading-relaxed transition-all duration-200 ${
                    item.avoidedToday
                      ? 'line-through text-muted-foreground/70'
                      : 'text-foreground'
                  }`}
                >
                  {item.text}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Added {formatDate(item.createdAt)}</span>
                  {item.avoidedToday && (
                    <span className="text-green-400 font-medium flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Avoided today!
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          {!isEditing && (
            <div className="flex gap-1 shrink-0">
              {!item.avoidedToday && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleMarkAvoided}
                  className="text-green-500 hover:text-green-400 hover:bg-green-500/10 border-green-500/30 hover:border-green-500/50 transition-all duration-200"
                >
                  <CheckCircle className="h-3 w-3" />
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
                className="hover:border-[#e00014]/50 hover:bg-[#e00014]/10 hover:text-[#e00014] transition-all duration-200"
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Dialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
              >
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-[#e00014] hover:text-[#b8000f] hover:bg-[#e00014]/10 border-[#e00014]/30 hover:border-[#e00014]/50 transition-all duration-200"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Not-To-Do Item</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete &quot;{item.text}&quot;?
                      This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setShowDeleteDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      className="bg-[#e00014] hover:bg-[#b8000f]"
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
