"use client";

import SelectAddress from "./select-address";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { getTeams } from "@/app/db/queries";

type TeamOption = {
  value: number;
  label: string;
};

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

const formSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().min(2).max(50),
  number: z.string().regex(phoneRegex, "Invalid Number!"),
  serviceLocation: z.string().min(3).max(300),
  serviceDate: z.date({ required_error: "A service date must be selected" }),
  serviceTime: z.string(),
  assignedTeam: z.string(),
});

const BookingForm = () => {
  const [teams, setTeams] = useState<TeamOption[]>([]);

  useEffect(() => {
    async function fetchTeams() {
      const fetchedTeams = await getTeams();
      setTeams(
        fetchedTeams.map((team) => ({
          value: team.id,
          label: team.team_name,
        }))
      );
    }
    fetchTeams();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleAddressChange = (newAddress: string) => {
    form.setValue("serviceLocation", newAddress);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="flex w-full items-center gap-5 flex-col md:flex-row">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" className="w-full" {...field} />
                </FormControl>
                <FormDescription>Clients first and last name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@email.com"
                    className="w-full"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormDescription>
                  Clients preferred email address
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="855-147-4019" type="tel" {...field} />
              </FormControl>
              <FormDescription>Clients primary phone number</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignedTeam"
          render={({ field }) => (
            <FormItem className="w-[240px] flex flex-col">
              <FormLabel>Team</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a team" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {teams.map((team) => (
                    <SelectItem
                      value={team.label}
                      key={team.value}
                      onSelect={() => {
                        form.setValue("assignedTeam", team.value.toString());
                      }}
                      className="flex flex-row items-center"
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          team.value.toString() === field.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {team.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormDescription>Choose a team for the cleaning</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service Location</FormLabel>
              <FormControl>
                <SelectAddress onAddressChange={handleAddressChange} />
              </FormControl>
              <FormDescription>
                Enter the address of the client.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="serviceDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Day of service</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Enter the date scheduled for the service
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="frequencyOfService"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Frequency</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Enter the date scheduled for the service
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="serviceTime"
          render={({ field }) => (
            <FormItem className="w-[240px]">
              <FormLabel>Time for service</FormLabel>
              <FormControl>
                <Input {...field} type="time" />
              </FormControl>
              <FormDescription>Specified time for cleaning,</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
export default BookingForm;
