import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

describe('recipe collection', () => {
  let recipeHeader;
  let button;

  beforeEach(() => {
    render(<App />);
    recipeHeader = screen.getByText(/my recipes/i);
    button = screen.getByRole('button', {name: 'Add Recipe'});
  })

  it('should render App and read "My Recipes"', () => {
    expect(recipeHeader).toBeInTheDocument();
  });

  it('should display "There are no recipes to list" beneath the heading', () => {
    let recipeList = screen.getByText(/there are no recipes to list/i);
    expect(recipeList).toBeInTheDocument();
    expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4);
  })

  it('should contain an "Add Recipe" button underneath header', () => {
    expect(button).toBeInTheDocument();
    expect(recipeHeader.compareDocumentPosition(button)).toBe(4);
  })

  it('should open a form when "Add Recipe" button is clicked', async () => {
    userEvent.click(button);

    let form = await screen.findByRole('form', undefined, {timeout:3000});

    expect(form).toBeInTheDocument();

    expect(screen.getByRole('textbox', {name: /Recipe name/i})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /instructions/i})).toBeInTheDocument();

    button = screen.queryByRole('button', {name: 'Add Recipe'});
    expect(button).toBeNull();
  })

  it('should list submitted recipes under "My Recipes"', async () => {
    userEvent.click(button);

    let form = await screen.findByRole('form', undefined, {timeout:3000});
    expect(form).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /Recipe name/i})).toBeInTheDocument();
    expect(screen.getByRole('textbox', {name: /instructions/i})).toBeInTheDocument();

    let recipeNameBox = screen.getByRole('textbox', {name: /Recipe name/i});

    userEvent.type(recipeNameBox, 'Tofu Scramble Tacos');

    let submit = screen.getByRole('button', {name: 'Submit'});
    userEvent.click(submit);

    let recipe = await screen.findByText(/taco/i);
    expect(recipe).toBeInTheDocument();
  })
})
