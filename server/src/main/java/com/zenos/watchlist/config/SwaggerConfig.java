package com.zenos.watchlist.config;


import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;


@Configuration
@EnableSwagger2
public class SwaggerConfig {

    private ApiInfo metaData() {
        return new ApiInfo(
                "Watchlist REST API",
                null,
                "1.0",
                null,
                new Contact("João Luiz", null, "joaozenos@zenos.com"),
                null,
                null,
                Collections.emptyList());
    }

    @Bean
    public Docket productApi() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.zenos.watchlist.controllers"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(metaData());
    }
}
