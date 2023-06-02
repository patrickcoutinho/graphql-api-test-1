import { CreateAppointmentInput } from "../dto/input/create-appointment";
import { Appointment } from "../dto/model/appointment";
import { Customer } from "../dto/model/customer";
import { randomUUID } from "node:crypto";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

const appointments: Appointment[] = [];

@Resolver(() => Appointment)
export class AppointmentResolver {
  @Query(() => [Appointment])
  async appointments() {
    return appointments;
  }

  @Mutation(() => Appointment)
  async createAppointment(@Arg("data") data: CreateAppointmentInput) {
    const appointment = {
      startsAt: data.startsAt,
      endsAt: data.endsAt,
    };

    appointments.push(appointment);

    return appointment;
  }

  @FieldResolver(() => Customer)
  async customer(@Root() appointment: Appointment) {
    console.log(appointment);

    return {
      id: randomUUID(),
      name: "Test Name",
    };
  }
}
