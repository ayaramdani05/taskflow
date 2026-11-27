import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { Task } from './task.model';

@Component({
  selector: 'app-root',
  imports: [FormsModule, UpperCasePipe, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = signal('TaskFlow');
  tasks = signal<Task[]>([]);
  count = computed(() => this.tasks().length);

  newTask = '';
  newDate = '';
  nextId = 1;

  rename() {
    this.title.set('Mes tâches');
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      const task: Task = {
        id: this.nextId++,
        title: this.newTask.trim(),
        completed: false,
        priority: 'medium',
        dueDate: this.newDate || undefined
      };
      this.tasks.update(items => [...items, task]);
      this.newTask = '';
      this.newDate = '';
    }
  }

  deleteTask(id: number) {
    this.tasks.update(items => items.filter(task => task.id !== id));
  }

  clearTasks() {
    this.tasks.set([]);
  }
}