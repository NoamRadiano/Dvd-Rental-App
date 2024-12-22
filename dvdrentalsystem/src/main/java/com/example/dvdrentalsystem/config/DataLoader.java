package com.example.dvdrentalsystem.config;

import com.example.dvdrentalsystem.entity.UserInfo;
import com.example.dvdrentalsystem.entity.Category;
import com.example.dvdrentalsystem.entity.Movie;
import com.example.dvdrentalsystem.repository.UserInfoRepository;
import com.example.dvdrentalsystem.repository.CategoryRepository;
import com.example.dvdrentalsystem.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

import java.io.InputStream;

// initial data inset to database.
@Component
public class DataLoader implements CommandLineRunner {


    private final UserInfoRepository userRepository;
    @Autowired
    private PasswordEncoder encoder;
    @Autowired
    private ResourceLoader resourceLoader;

    @Autowired
    private final CategoryRepository categoryRepository;
    @Autowired
    private final MovieRepository movieRepository;

    public DataLoader(CategoryRepository categoryRepository, UserInfoRepository userInfoRepository, MovieRepository movieRepository) {
        this.categoryRepository = categoryRepository;
        this.userRepository = userInfoRepository;
        this.movieRepository = movieRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        // Load initial data into the database
/*        if(!userRepository.findByName("admin").isPresent())
            userRepository.save(new UserInfo("admin", "admin@example.com", encoder.encode("admin"), "ROLE_ADMIN", true, 0));
*/
        if(categoryRepository.count() == 0) {
            userRepository.save(new UserInfo("admin", "admin@example.com", encoder.encode("admin"), "ROLE_ADMIN", true));
            // userRepository.save(new UserInfo("admin1", "admin@example.com", encoder.encode("admin"), "ROLE_ADMIN", true));

            // add category
            Category cAction = categoryRepository.save(new Category("Action"));
            categoryRepository.save(new Category("Drama"));
            categoryRepository.save(new Category("Comedy"));
            categoryRepository.save(new Category("Horror"));
            categoryRepository.save(new Category("Documentraries"));
            // add moview
            Resource resource = resourceLoader.getResource("classpath:static/movie1.jpg");
            // Handle the loaded resource (e.g., read as InputStream, byte[], etc.)
            // Example of reading image file data as bytes
                InputStream inputStream = resource.getInputStream();
                byte[] imageData = FileCopyUtils.copyToByteArray(inputStream);

            movieRepository.save(new Movie("Inception", "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.","Christopher Nolan","Christopher Nolan",50, imageData, (float) 4.4, true, 19.99, "2010-07-16", 148, 1, cAction));
            imageData = FileCopyUtils.copyToByteArray(resourceLoader.getResource("classpath:static/movie2.jpg").getInputStream());
            movieRepository.save(new Movie("The Shawshank Redemption", "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", "Frank Darabont", "Stephen King", 30, imageData, (float)4.6, true, 14.99, "1994-09-23", 142, 1, cAction));
            imageData = FileCopyUtils.copyToByteArray(resourceLoader.getResource("classpath:static/movie3.jpg").getInputStream());
            movieRepository.save(new Movie("The Godfather", "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", "Francis Ford Coppola", "Mario Puzo, Francis Ford Coppola", 40, imageData, (float)4.6, true, 17.99, "1972-03-24", 175, 1, cAction));
            imageData = FileCopyUtils.copyToByteArray(resourceLoader.getResource("classpath:static/movie4.jpg").getInputStream());
            movieRepository.save(new Movie("The Dark Knight", "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.", "Christopher Nolan", "Jonathan Nolan, Christopher Nolan", 50, imageData, (float)4.5, true, 19.99, "2008-07-18", 152, 1, cAction));
            imageData = FileCopyUtils.copyToByteArray(resourceLoader.getResource("classpath:static/movie5.jpg").getInputStream());
            movieRepository.save(new Movie("Pulp Fiction", "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", "Quentin Tarantino", "Quentin Tarantino, Roger Avary", 25, imageData, (float) 4.45, true, 13.99, "1994-10-14", 154, 1,cAction));
            imageData = FileCopyUtils.copyToByteArray(resourceLoader.getResource("classpath:static/movie6.jpg").getInputStream());
            movieRepository.save(new Movie("Forrest Gump", "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.", "Robert Zemeckis", "Eric Roth", 35, imageData, (float) 4.4, true, 15.99, "1994-07-06", 142, 1,cAction));
            imageData = FileCopyUtils.copyToByteArray(resourceLoader.getResource("classpath:static/movie7.jpg").getInputStream());
            movieRepository.save(new Movie("The Matrix", "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.", "Lana Wachowski, Lilly Wachowski", "Lilly Wachowski, Lana Wachowski", 40, imageData, (float)4.4, true, 16.99, "1999-03-31", 136, 1,cAction));
            imageData = FileCopyUtils.copyToByteArray(resourceLoader.getResource("classpath:static/movie8.jpg").getInputStream());
            movieRepository.save(new Movie("Fight Club", "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into much more.", "David Fincher", "Chuck Palahniuk, Jim Uhls", 20, imageData, (float) 4.4, true, 14.99, "1999-10-15", 139, 1,cAction));
            imageData = FileCopyUtils.copyToByteArray(resourceLoader.getResource("classpath:static/movie9.jpg").getInputStream());
            movieRepository.save(new Movie("Goodfellas", "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.", "Martin Scorsese", "Nicholas Pileggi, Martin Scorsese", 30, imageData, (float) 4.4, true, 16.99, "1990-09-21", 146, 1, cAction));
        }
    }
}
