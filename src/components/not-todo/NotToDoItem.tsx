'use client';

import { useState } from 'react';
import { NotToDoItem as NotToDoItemType, PRIORITY_COLORS } from '@/types/not-todo';
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

interface NotToDoItemProps {
  item: NotToDoItemType;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<NotToDoItemType>) => void;
  onMarkAvoided: (id: string) => void;
}

export function NotToDoItem({ item, onDelete, onUpdate, onMarkAvoided }: NotToDoItemProps) {
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
        priority: editPriority
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
      year: 'numeric'
    });
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${item.avoidedToday ? 'bg-green-50 border-green-200' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Priority Badge */}
          <Badge className={`${PRIORITY_COLORS[item.priority]} shrink-0 mt-1`}>
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
                  className="w-full"
                  autoFocus
                />
                <PrioritySelector
                  value={editPriority}
                  onChange={setEditPriority}
                />
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSaveEdit} disabled={!editText.trim()}>
                    <Check className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className={`text-sm leading-relaxed ${item.avoidedToday ? 'line-through text-muted-foreground' : ''}`}>
                  {item.text}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Added {formatDate(item.createdAt)}</span>
                  {item.avoidedToday && (
                    <span className="text-green-600 font-medium">
                      ✅ Avoided today!
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
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <CheckCircle className="h-3 w-3" />
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={handleEdit}
              >
                <Edit2 className="h-3 w-3" />
              </Button>
              <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Not-To-Do Item</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete &quot;{item.text}&quot;? This action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={handleDelete}>
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