export function validateComplaint(data: {
  title: string;
  description: string;
  category: string;
  location: any;
  imageAsset: any;
}): string[] {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push('Title is required');
  } else if (data.title.length < 5) {
    errors.push('Title must be at least 5 characters');
  }

  if (!data.description?.trim()) {
    errors.push('Description is required');
  } else if (data.description.length < 20) {
    errors.push('Description must be at least 20 characters');
  }

  if (!data.category) {
    errors.push('Category is required');
  }

  if (!data.location) {
    errors.push('Location is required');
  }

  if (!data.imageAsset) {
    errors.push('Image is required');
  }

  return errors;
}