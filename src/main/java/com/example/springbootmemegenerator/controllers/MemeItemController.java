package com.example.springbootmemegenerator.controllers;

import com.example.springbootmemegenerator.models.MemeItem;
import com.example.springbootmemegenerator.services.MemeItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Optional;

@RestController
@RequestMapping("/api/meme-items")
public class MemeItemController {

    @Autowired
    private MemeItemService memeItemService;

    @GetMapping("")
    public Iterable<MemeItem> getMemeItems() {
        return memeItemService.getAll();
    }

    @PostMapping("")
    public ResponseEntity<?> createMemeItem(@RequestParam("image") String imageData) throws UnsupportedEncodingException {
        MemeItem memeItem = new MemeItem();

        Base64.Decoder decoder = Base64.getDecoder();
        byte[] decodedBytes = decoder.decode(imageData.split(",")[1]);
        memeItem.setImage(decodedBytes);
        memeItemService.save(memeItem);

        byte[] encodedBytes = Base64.getEncoder().encode(memeItem.getImage());
        String data = new String(encodedBytes, "UTF-8");

        HashMap<String, String> map = new HashMap<>();
        map.put("data", data);

        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public Optional<MemeItem> getMemeItem(@PathVariable Long id) {
        Optional<MemeItem> optionalMemeItem = memeItemService.getById(id);
        return optionalMemeItem;
    }

}
