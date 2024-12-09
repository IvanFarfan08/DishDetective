"use client";
import React, { Component } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ItemForm {
    name: string;
    price: number;
}

interface AdminState {
    formData: ItemForm;
}

export default class Admin extends Component<{}, AdminState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            formData: {
                name: '',
                price: 0,
            },
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state.formData),
            });

            if (!response.ok) {
                throw new Error('Failed to create item');
            }

            // Reset form after successful submission
            this.setState({ formData: { name: '', price: 0 } });
            alert('Item created successfully!');
        } catch (error) {
            console.error('Error creating item:', error);
            alert('Failed to create item');
        }
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        this.setState(prevState => ({
            formData: {
                ...prevState.formData,
                [name]: name === 'price' ? parseFloat(value) : value,
            },
        }));
    }

    render() {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
                    <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                        Add New Item
                    </h2>
                    <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                        Add a new item to your inventory
                    </p>

                    <form onSubmit={this.handleSubmit} className="my-8">
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={this.state.formData.name}
                                onChange={this.handleChange}
                                placeholder="Item name"
                                type="text"
                                required
                            />
                        </LabelInputContainer>
                        <LabelInputContainer className="mb-8">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                name="price"
                                value={this.state.formData.price}
                                onChange={this.handleChange}
                                placeholder="0.00"
                                type="number"
                                step="0.01"
                                min="0"
                                required
                            />
                        </LabelInputContainer>

                        <button
                            type="submit"
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        >
                            Add Item &rarr;
                            <BottomGradient />
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
