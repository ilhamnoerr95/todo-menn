import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Sum from '@/components/sum'
import React from 'react';

describe('Test komponent sum', ()=> {

    // test('adds 1 + 2 to equal 3', () => {
    //     render(<Sum/>)   // arrange
    
    //     // expect();
    // });

    it("have a disabled param", ()=> {
        render(<Sum/>)   // arrange
        
        const test = screen.getByTestId('sum-button')
        
        expect(test).toBeDisabled()

    })

    it("Harus ada button", ()=> {
        render(<Sum/>)   // arrange

       const buttonElement = screen.getByRole('button', {name: /sum/i})

       React.act(()=> {
            // Simulasi klik pada tombol
            userEvent.click(buttonElement);
       })
      
       // Assert apakah tombol ditemukan dan/atau perubahan yang diharapkan terjadi
        expect(buttonElement).toBeInTheDocument();
    })
})
