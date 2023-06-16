import { render, screen } from '@testing-library/react';
import App from './App';

describe('recipe collection', () => {
  let recipeHeader;
  let recipeList;

  beforeEach(() => {
    render(<App />);
    recipeHeader = screen.getByText(/my recipes/i);
    recipeList = screen.getByText(/there are no recipes to list/i);
  })

  it('should render App and read "My Recipes"', () => {
    expect(recipeHeader).toBeInTheDocument();
  });

  it('should display "There are no recipes to list" beneath the heading', () => {
    expect(recipeList).toBeInTheDocument();
  })

  it('should have recipe-list underneath header', () => {
    expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4);
  })
})
