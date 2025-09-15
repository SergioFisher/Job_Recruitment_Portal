package za.ac.cput.factory;

import za.ac.cput.domain.Administrator;


public class AdministratorFactory {

    public static Administrator createAdministrator(
            String email,
            String password,
            String userName,
            boolean deleteJobs
    ) {

        if (email == null || email.isBlank())
            throw new IllegalArgumentException("Email is required.");
        if (password == null || password.isBlank())
            throw new IllegalArgumentException("Password is required.");
        if (userName == null || userName.isBlank())
            throw new IllegalArgumentException("Name is required.");




        return new Administrator.Builder()
                .setEmail(email)
                .setPassword(password)
                .setName(userName)
                .setDeleteJobs(true)
                .build();
    }
}
