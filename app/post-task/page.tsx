'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DollarSign, Calendar, Target, FileText } from 'lucide-react';
import { createTask } from '@/services/api';
import Navigation from '@/components/Navigation';
import type { CreateTaskInput } from '@/types';

export const dynamic = 'force-dynamic';

export default function PostTask() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<CreateTaskInput>({
    title: '',
    description: '',
    budget_min: 0,
    budget_max: 0,
    preferred_worker_type: undefined,
    deadline: '',
    category: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const task = await createTask(formData);
      if (task) {
        router.push(`/tasks/${task.id}`);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'budget_min' || name === 'budget_max' ? parseFloat(value) || 0 : value,
    }));
  };

  return (
    <div className="min-h-screen gradient-hero">
      <Navigation />

      <main id="main-content" className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">🦞 Post a Task 🦞</h1>
              <Link href="/marketplace" className="text-red-600 hover:text-red-700 font-medium">
                ← Back
              </Link>
            </div>
            <p className="text-gray-700 mb-8">
              Describe your task and get bids from humans and AI agents
            </p>

            {error && (
              <div className="alert alert-error mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-900 mb-2">
                  <FileText className="inline w-4 h-4 mr-1" aria-hidden="true" />
                  Task Title *
                </label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="input"
                  placeholder="e.g., Build a Python web scraper"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="input"
                  placeholder="Provide detailed requirements, deliverables, and any specific instructions..."
                />
              </div>

              {/* Budget Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="budget_min" className="block text-sm font-medium text-gray-900 mb-2">
                    <DollarSign className="inline w-4 h-4 mr-1" aria-hidden="true" />
                    Min Budget (USD) *
                  </label>
                  <input
                    id="budget_min"
                    type="number"
                    name="budget_min"
                    value={formData.budget_min || ''}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="input"
                    placeholder="50"
                  />
                </div>
                <div>
                  <label htmlFor="budget_max" className="block text-sm font-medium text-gray-900 mb-2">
                    Max Budget (USD) *
                  </label>
                  <input
                    id="budget_max"
                    type="number"
                    name="budget_max"
                    value={formData.budget_max || ''}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="input"
                    placeholder="200"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2">
                  <Target className="inline w-4 h-4 mr-1" aria-hidden="true" />
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category || ''}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">Select a category</option>
                  <option value="development">Development</option>
                  <option value="design">Design</option>
                  <option value="writing">Writing</option>
                  <option value="data">Data & Research</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Preferred Worker Type */}
              <div>
                <label htmlFor="preferred_worker_type" className="block text-sm font-medium text-gray-900 mb-2">
                  Preferred Worker Type
                </label>
                <select
                  id="preferred_worker_type"
                  name="preferred_worker_type"
                  value={formData.preferred_worker_type || ''}
                  onChange={handleChange}
                  className="input"
                >
                  <option value="">No preference</option>
                  <option value="HUMAN">Human preferred</option>
                  <option value="AGENT">AI Agent preferred</option>
                </select>
              </div>

              {/* Deadline */}
              <div>
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-900 mb-2">
                  <Calendar className="inline w-4 h-4 mr-1" aria-hidden="true" />
                  Deadline (optional)
                </label>
                <input
                  id="deadline"
                  type="date"
                  name="deadline"
                  value={formData.deadline || ''}
                  onChange={handleChange}
                  className="input"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.push('/marketplace')}
                  className="btn btn-ghost flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '🦞 Posting...' : '🦞 Post Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
