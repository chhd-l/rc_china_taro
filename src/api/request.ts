import { Customer, CustomerPagedQueryResponse } from "./types/customer";
import { getAllCustomersQuery } from "./queries/get-all-customers-query";
import { Config } from "./types/api/fetcher";
import fetchGraphqlApi from "./fetchGraphqlApi";
import { getAllPetsQuery } from "./queries/get-all-pets-query";
import { petDeleteMutation } from "./mutations/pet-delete";
import { petCreateMutation } from "./mutations/pet-create";
import { Pet, PetInput } from "./types/pet";
import { petUpdateMutation } from "./mutations/pet-update";

const config: Config = {
  fetch: fetchGraphqlApi,
};

export class ClientBuilder {
  public apiRoot: any = {
    customers: this.customers,
  };

  async customers(): Promise<CustomerPagedQueryResponse | any> {
    const { data } = await config.fetch(getAllCustomersQuery, {
      variables: {
        offset: 20,
      },
    });
    return {
      customers: data?.customers,
    };
  }

  pets() {
    return {
      getPets: this.getPets,
      createPet: this.createPet,
      deletePet: this.deletePet,
      updatePet: this.updatePet,
    };
  }

  private async getPets({
    customerId,
  }: {
    customerId: string;
  }): Promise<Pet[]> {
    const { data } = await config.fetch(getAllPetsQuery, {
      variables: {
        customerId,
      },
    });
    console.log(data);
    return data.pets;
  }
  private async deletePet({
    customerId,
    operator,
  }: {
    customerId: string;
    operator?: string;
  }): Promise<any> {
    const { data } = await config.fetch(
      `
    mutation createCustomeraaa($input: createCustomerDto!){
      createCustomer(
        input: $input
      )
    }
    `,
      {
        variables: {
          input: {
            id: "xxx",
            name: "xxx",
            gender: "xxx",
          },
        },
      }
    );
  }

  private async createPet({ body }: { body: PetInput }): Promise<any> {
    const { data } = await config.fetch(petCreateMutation, {
      variables: {
        body,
      },
    });
  }

  private async updatePet({ body }: { body: PetInput }) {
    const res = await config.fetch(petUpdateMutation, {
      variables: {
        input: { ...body },
      },
    });
    return;
  }
}
